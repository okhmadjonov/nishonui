// import { useRef, useState, useEffect } from "react";
// import styles from "./TargetCircle.module.scss";
// import TargetImage from "../../../../assets/img/tardot.png";

// import tegmadi from "../../../../assets/audio/0.mp3"
// import besh from "../../../../assets/audio/5.wav";
// import olti from "../../../../assets/audio/6.wav";
// import yetti from "../../../../assets/audio/7.wav";
// import sakkiz from "../../../../assets/audio/8.wav";
// import toqqiz from "../../../../assets/audio/9.wav";
// import on from "../../../../assets/audio/10.wav";

// interface TargetCircleProps {
//   disabled?: boolean;
//   onShoot?: (score: number, x: number, y: number) => void;
//   shots?: { x: number; y: number; score: number }[];
//   setShots?: React.Dispatch<React.SetStateAction<{ x: number; y: number; score: number }[]>>;
// }

// const rings = [
//   { color: "green", score: 5, size: 220 },
//   { color: "green", score: 6, size: 100 },
//   { color: "green", score: 7, size: 80 },
//   { color: "green", score: 8, size: 60 },
//   { color: "green", score: 9, size: 40 },
//   { color: "green", score: 10, size: 20 },
// ];

// const TargetCircle: React.FC<TargetCircleProps> = ({ disabled, onShoot }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [shots, setShots] = useState<{ x: number; y: number; score: number }[]>([]);
//   const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
//   const audioRefs = useRef<HTMLAudioElement[]>([]);

//   const audioFiles: { [key: number]: string } = {
//     0: tegmadi,
//     5: besh,
//     6: olti,
//     7: yetti,
//     8: sakkiz,
//     9: toqqiz,
//     10: on
//   };

//   useEffect(() => {
//     audioRefs.current = Object.keys(audioFiles).map(score => {
//       const audio = new Audio(audioFiles[parseInt(score)]);
//       return audio;
//     });

//     return () => {
//       audioRefs.current.forEach(audio => {
//         audio.pause();
//         audio.src = '';
//       });
//     };
//   }, []);



// const getScoreFromClick = (x: number, y: number): number => {
//   const dx = x - 50;
//   const dy = y - 50;
//   const distance = Math.sqrt(dx * dx + dy * dy);

//   for (let i = rings.length - 1; i >= 0; i--) {
//     const ring = rings[i];
//     if (ring.score === 5) continue; 
//     if (distance <= ring.size / 2) {
//       return ring.score;
//     }
//   }

//   const outerRing = rings.find(r => r.score === 5);
//   if (outerRing && distance <= outerRing.size / 2) {
//     if (y > 50) {
//       return 5; 
//     } else {
//       return 0; 
//     }
//   }

//   return 0;
// };


//   const handleTargetClick = (e: React.MouseEvent) => {
//     if (disabled || !containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     const score = getScoreFromClick(x, y);


//     playUzbekAudio(score);

//     if (setShots) {
//       setShots((prev) => [...prev, { x, y, score }]);
//     }
//     if (onShoot) onShoot(score, x, y);
//   };



//   const playUzbekAudio = (score: number) => {
//   if (!audioFiles[score]) return; // если для такого score нет файла
//   const audio = new Audio(audioFiles[score]);
//   audio.play().catch(err => console.error("Ovoz error:", err));
// };


//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setCursorPos({ x, y });
//   };

//   const generateNumberPositions = (ringSize: number) => {
//     const center = 50;
//     const distance = (ringSize / 2) * 0.9;
//     return [
//       { x: center, y: center - distance },
//       { x: center, y: center + distance },
//       { x: center - distance, y: center },
//       { x: center + distance, y: center },
//     ];
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={styles.targetContainer}
//       onClick={handleTargetClick}
//       onMouseMove={handleMouseMove}
//     >
//       <div className={styles.targetBackground}>
//         {rings.map((ring) => {
//           const offset = (100 - ring.size) / 2;
//           return (
//             <div
//               key={ring.score}
//               className={`${styles.ring} ${styles[ring.color]}`}
//               style={{
//                 width: `${ring.size}%`,
//                 height: `${ring.size}%`,
//                 top: `${offset}%`,
//                 left: `${offset}%`,
//                 zIndex: ring.score,
//               }}
//             >
//               {ring.score === 10 && (
//                 <span className={styles.centerScore}>{ring.score}</span>
//               )}
//             </div>
//           );
//         })}
//         {rings.flatMap((ring) => {
//           const positions = generateNumberPositions(ring.size);
//           return positions.map((pos, idx) => (
//             <span
//               key={`${ring.score}-${idx}`}
//               className={styles.ringLabel}
//               style={{
//                 top: `${pos.y}%`,
//                 left: `${pos.x}%`,
//                 color: "white",
//                 transform: "translate(-50%, -50%)",
//                 zIndex: ring.score + 1,
//               }}
//             >
//               {ring.score}
//             </span>
//           ));
//         })}
//       </div>

//       <div className={styles.shotsContainer}>
//         {shots?.map((shot, idx) => (
//           <div
//             key={idx}
//             className={styles.shotMarker}
//             style={{
//               top: `${shot.y}%`,
//               left: `${shot.x}%`,
//               transform: "translate(-50%, -50%)",
//               zIndex: 1000 + idx,
//               position: "absolute",
//             }}
//             data-score={shot.score}
//           >
//             <img src={TargetImage} alt="Shot" className={styles.shotImage} />
//           </div>
//         ))}
//       </div>

//       {cursorPos && (
//         <div
//           className={styles.cursorDot}
//           style={{
//             top: `${cursorPos.y}%`,
//             left: `${cursorPos.x}%`,
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default TargetCircle;