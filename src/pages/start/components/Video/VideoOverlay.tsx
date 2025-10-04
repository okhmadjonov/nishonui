import { useEffect, useRef, useState } from "react";
import styles from "./VideoOverlay.module.scss";
import { useTargetStream } from "../../hooks/useTargetStream";
import OrigImage from "../../../../assets/img/origlast.png";

interface VideoOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  overlayRef: React.RefObject<HTMLCanvasElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isVideoVisible: boolean;
  hasPermission?: boolean;
  referenceSrc?: string;
}

export default function VideoOverlay({
 
  overlayRef,
  canvasRef,
  isVideoVisible,
  // hasPermission = false,
  referenceSrc = OrigImage,
}: VideoOverlayProps) {
  const {
    currentResult,
    isConnected,
    selectedCamera,
    setSelectedCamera,
    cameras,
    activeCameras,
    error,
    startCamera,
    stopCamera,
  } = useTargetStream();

  const overlayContext = useRef<CanvasRenderingContext2D | null>(null);
  const refVector = useRef<Float32Array | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detected, setDetected] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const SIMILARITY_THRESHOLD = 0.9;
  const DOWNSCALE = 32;

  useEffect(() => {
    if (!overlayRef.current) return;
    overlayContext.current = overlayRef.current.getContext("2d");
    if (currentResult) drawTargetDetection();
  }, [overlayRef, currentResult]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = referenceSrc;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = (e) => reject(e);
        });
        if (!canvasRef.current) return;
        const vec = imageToVector(img, DOWNSCALE, canvasRef.current);
        if (!cancelled) refVector.current = vec;
      } catch (e) {
        console.error("Failed to load reference image:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [referenceSrc, canvasRef]);

  useEffect(() => {
    if (!currentResult?.image || !refVector.current || !canvasRef.current) return;

    const img = new Image();
    img.src = `data:image/jpeg;base64,${currentResult.image}`;
    img.onload = () => {
      const liveVec = imageToVector(img, DOWNSCALE, canvasRef.current!);
      const sim = cosineSimilarity(refVector.current!, liveVec);
      setDetected(sim >= SIMILARITY_THRESHOLD);

      if (sim >= SIMILARITY_THRESHOLD) {
        const cropCanvas = document.createElement("canvas");
        const ctx = cropCanvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const w = img.width;
        const h = img.height;
        cropCanvas.width = w;
        cropCanvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        let minX = w, minY = h, maxX = 0, maxY = 0;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2];

            const isGreen = g > 100 && g > r + 30 && g > b + 30;

            if (isGreen) {
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }
        }

        const cropW = maxX - minX;
        const cropH = maxY - minY;

        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = 512;
        finalCanvas.height = 512;
        const finalCtx = finalCanvas.getContext("2d");

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = cropW;
        tempCanvas.height = cropH;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx?.drawImage(cropCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

        finalCtx?.drawImage(tempCanvas, (512 - cropW) / 2, (512 - cropH) / 2, cropW, cropH);
        setCroppedImage(finalCanvas.toDataURL("image/png"));
      } else {
        setCroppedImage(null);
      }
    };
  }, [currentResult]);

  const drawTargetDetection = () => {
    if (!overlayRef.current || !overlayContext.current || !currentResult?.points) return;
    const ctx = overlayContext.current;
    ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
    currentResult.points.forEach((point: any) => {
      const { x, y, ring, score } = point;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.strokeStyle = ring >= 8 ? "#00ff00" : ring >= 6 ? "#ffff00" : "#ff0000";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = "16px Arial";
      ctx.fillText(`${score}`, x - 8, y + 5);
    });
  };

  const handleCameraToggle = async () => {
    setIsLoading(true);
    try {
      if (activeCameras.includes(selectedCamera)) {
        await stopCamera(selectedCamera);
      } else {
        await startCamera(selectedCamera);
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(e.target.value);
  };

  function imageToVector(img: HTMLImageElement, size: number, c: HTMLCanvasElement): Float32Array {
    const g = c.getContext("2d", { willReadFrequently: true });
    if (!g) return new Float32Array();
    c.width = size;
    c.height = size;
    g.clearRect(0, 0, size, size);
    g.drawImage(img, 0, 0, size, size);
    const { data } = g.getImageData(0, 0, size, size);
    return rgbaToUnitGrayVector(data);
  }

  function rgbaToUnitGrayVector(rgba: Uint8ClampedArray): Float32Array {
    const len = rgba.length / 4;
    const v = new Float32Array(len);
    for (let i = 0, j = 0; i < rgba.length; i += 4, j++) {
      v[j] = 0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2];
    }
    let norm = 0;
    for (let k = 0; k < v.length; k++) norm += v[k] * v[k];
    norm = Math.sqrt(norm) || 1;
    for (let k = 0; k < v.length; k++) v[k] /= norm;
    return v;
  }

  function cosineSimilarity(a: Float32Array, b: Float32Array): number {
    if (a.length !== b.length || a.length === 0) return 0;
    let dot = 0;
    for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
    return Math.max(-1, Math.min(1, dot));
  }

  return (
    <div className={styles.videoContainer}>
      <div className={styles.cameraControls}>
        <select
          value={selectedCamera}
          onChange={handleCameraChange}
          disabled={isLoading || cameras.length === 0}
          className={styles.cameraSelect}
        >
          {cameras.length === 0 ? (
            <option value="">No cameras available</option>
          ) : (
            cameras.map((cam) => (
              <option key={cam} value={cam}>
                {cam}
              </option>
            ))
          )}
        </select>
        <button
          onClick={handleCameraToggle}
          disabled={isLoading || cameras.length === 0 || !isConnected}
          className={`${styles.cameraButton} ${activeCameras.includes(selectedCamera) ? styles.stopButton : styles.startButton
            }`}
        >
          {isLoading ? "..." : activeCameras.includes(selectedCamera) ? "Stop" : "Start"}
        </button>
      </div>

      <div className={styles.statusPanel}>
        <div
          className={`${styles.connectionStatus} ${isConnected ? styles.connected : styles.disconnected
            }`}
        >
          {isConnected ? "✅ Connected to backend" : "❌ Disconnected from backend"}
        </div>
        {currentResult && (
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreLabel}>Score:</span>
            <span className={styles.scoreValue}>{currentResult.score}</span>
            <span className={styles.detections}>({currentResult.points.length} hits)</span>
          </div>
        )}
      </div>

      {currentResult?.image && isVideoVisible && (
        <div className={styles.processedImageContainer}>
          <h4>Processed Target</h4>
          <img
            src={`data:image/jpeg;base64,${currentResult.image}`}
            alt="Processed target"
            className={styles.processedImage}
          />
        </div>
      )}

      {detected && croppedImage && (
        <div className={styles.croppedContainer}>
          <h4>Cropped Match</h4>
          <img src={croppedImage} alt="Cropped target" className={styles.croppedImage} />
        </div>
      )}
    </div>
  );
}
