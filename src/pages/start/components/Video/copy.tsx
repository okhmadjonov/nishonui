// // components/Video/VideoOverlay.tsx (updated)
// import { useEffect, useRef, useState } from "react";
// import styles from "./VideoOverlay.module.scss";
// import { useTargetStream } from "../../hooks/useTargetStream";

// interface VideoOverlayProps {
//   videoRef: React.RefObject<HTMLVideoElement | null>;
//   overlayRef: React.RefObject<HTMLCanvasElement | null>;
//   canvasRef: React.RefObject<HTMLCanvasElement | null>;
//   isVideoVisible: boolean;
//   hasPermission?: boolean;
// }

// export default function VideoOverlay({
//   videoRef,
//   overlayRef,
//   canvasRef,
//   isVideoVisible,
//   hasPermission = false,
// }: VideoOverlayProps) {
//   const { 
//     currentResult, 
//     isConnected, 
//     selectedCamera, 
//     setSelectedCamera,
//     cameras, 
//     activeCameras, 
//     error,
//     startCamera, 
//     stopCamera 
//   } = useTargetStream();
  
//   const overlayContext = useRef<CanvasRenderingContext2D | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!overlayRef.current) return;
//     overlayContext.current = overlayRef.current.getContext("2d");
//     drawTargetDetection();
//   }, [overlayRef, currentResult]);

//   const drawTargetDetection = () => {
//     if (!overlayRef.current || !overlayContext.current) return;
//     const ctx = overlayContext.current;

//     // Clear canvas
//     ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);

//     // Draw target circles (if no result yet)
//     if (!currentResult) {
//       drawDefaultTarget();
//       return;
//     }

//     // Draw detected points from backend
//     const { points } = currentResult;
//     points.forEach((point: any) => {
//       const { x, y, ring, score } = point;
      
//       // Draw circle around detection
//       ctx.beginPath();
//       ctx.arc(x, y, 15, 0, Math.PI * 2);
//       ctx.strokeStyle = ring >= 8 ? "#00ff00" : ring >= 6 ? "#ffff00" : "#ff0000";
//       ctx.lineWidth = 3;
//       ctx.stroke();
      
//       // Draw score text
//       ctx.fillStyle = "#ffffff";
//       ctx.font = "16px Arial";
//       ctx.fillText(`${score}`, x - 8, y + 5);
//     });
//   };

//   const drawDefaultTarget = () => {
//     if (!overlayRef.current || !overlayContext.current) return;
//     const ctx = overlayContext.current;
//     const centerX = overlayRef.current.width / 2;
//     const centerY = overlayRef.current.height / 2;

//     // Draw default target circles
//     ctx.save();
//     ctx.translate(centerX, centerY);

//     const rings = 6;
//     for (let i = rings; i >= 0; i--) {
//       ctx.beginPath();
//       ctx.arc(0, 0, 100 * ((i + 1) / (rings + 1)), 0, Math.PI * 2);
//       ctx.strokeStyle = "white";
//       ctx.lineWidth = 2;
//       ctx.stroke();

//       // Numbers
//       ctx.fillStyle = "white";
//       ctx.font = "16px Arial";
//       ctx.fillText(`${10 - i}`, -10, -(100 * ((i + 1) / (rings + 1))) + 20);
//     }

//     ctx.restore();
//   };

//   const handleCameraToggle = async () => {
//     setIsLoading(true);
//     try {
//       if (activeCameras.includes(selectedCamera)) {
//         await stopCamera(selectedCamera);
//       } else {
//         await startCamera(selectedCamera);
//       }
//     } catch (error) {
//       console.error('Error toggling camera:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCamera(e.target.value);
//   };

//   return (
//     <div className={styles.videoContainer}>
//       <div className={styles.videoWrapper}>
//         {hasPermission ? (
//           <>
//             <video
//               ref={videoRef}
//               className={styles.videoElement}
//               style={{ display: isVideoVisible ? "block" : "none" }}
//               muted
//               playsInline
//               autoPlay
//             />
//             <canvas
//               ref={overlayRef}
//               className={styles.videoOverlay}
//               style={{ display: isVideoVisible ? "block" : "none" }}
//               width={640}
//               height={480}
//             />
//           </>
//         ) : (
//           <div className={styles.cameraError}>
//             <p>Camera access denied or not available</p>
//             <p>Please check your camera permissions</p>
//           </div>
//         )}
//         <canvas ref={canvasRef} className={styles.hiddenCanvas} />
//       </div>

//       {/* Error message */}
//       {error && (
//         <div className={styles.errorMessage}>
//           <span className={styles.errorIcon}>⚠️</span>
//           {error}
//         </div>
//       )}

//       {/* Camera Controls */}
//       <div className={styles.cameraControls}>
//         <select 
//           value={selectedCamera} 
//           onChange={handleCameraChange}
//           disabled={isLoading || cameras.length === 0}
//           className={styles.cameraSelect}
//         >
//           {cameras.length === 0 ? (
//             <option value="">No cameras available</option>
//           ) : (
//             cameras.map(cam => (
//               <option key={cam} value={cam}>{cam}</option>
//             ))
//           )}
//         </select>
        
//         <button 
//           onClick={handleCameraToggle}
//           disabled={isLoading || cameras.length === 0 || !isConnected}
//           className={`${styles.cameraButton} ${
//             activeCameras.includes(selectedCamera) ? styles.stopButton : styles.startButton
//           }`}
//         >
//           {isLoading ? '...' : activeCameras.includes(selectedCamera) ? 'Stop' : 'Start'}
//         </button>
//       </div>

//       {/* Connection status and score */}
//       <div className={styles.statusPanel}>
//         <div className={`${styles.connectionStatus} ${
//           isConnected ? styles.connected : styles.disconnected
//         }`}>
//           {isConnected ? "✅ Connected to backend" : "❌ Disconnected from backend"}
//         </div>
        
//         {currentResult && (
//           <div className={styles.scoreDisplay}>
//             <span className={styles.scoreLabel}>Score:</span>
//             <span className={styles.scoreValue}>{currentResult.score}</span>
//             <span className={styles.detections}>
//               ({currentResult.points.length} hits)
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Display the processed image from backend when available */}
//       {currentResult?.image && isVideoVisible && (
//         <div className={styles.processedImageContainer}>
//           <h4>Processed Target</h4>
//           <img 
//             src={`data:image/jpeg;base64,${currentResult.image}`} 
//             alt="Processed target"
//             className={styles.processedImage}
//           />
//         </div>
//       )}

//       {/* Debug information */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className={styles.debugInfo}>
//           <h4>Debug Info:</h4>
//           <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
//           <p>Cameras: {cameras.join(', ') || 'None'}</p>
//           <p>Active: {activeCameras.join(', ') || 'None'}</p>
//           <p>Selected: {selectedCamera}</p>
//           <p>Backend: http://127.0.0.1:8000</p>
//         </div>
//       )}
//     </div>
//   );
// }