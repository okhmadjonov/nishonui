import { useState, useRef, useCallback, useEffect } from "react";

const useExternalCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Start video stream when component mounts
  useEffect(() => {
    const startVideo = async () => {
      try {
        // Check if browser supports mediaDevices
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("getUserMedia is not supported in this browser");
          return;
        }

        // Get available cameras first
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        console.log("Available cameras:", videoDevices);

        if (videoDevices.length === 0) {
          console.error("No cameras found");
          return;
        }

        // Try to get user media with preferred constraints
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment" // Prefer rear camera if available
          },
          audio: false
        });

        setStream(mediaStream);
        setHasPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;

          // Wait for the video to load and then play it
          videoRef.current.onloadedmetadata = () => {
            videoRef.current!.play().catch(error => {
              console.error("Error playing video:", error);
            });
          };
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasPermission(false);
      }
    };

    startVideo();

    // Clean up when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleVideoVisibility = useCallback(() => {
    setIsVideoVisible((prev) => !prev);
  }, []);

  return {
    videoRef,
    canvasRef,
    overlayRef,
    isVideoVisible,
    offsetX,
    offsetY,
    hasPermission,
    toggleVideoVisibility,
    setOffsetX,
    setOffsetY,
  };
};

export default useExternalCamera;