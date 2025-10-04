// pages/start/components/Target/TargetCircle.tsx
import { useRef, useState } from "react";
import styles from "./TargetCircle.module.scss";
import TargetImage from "../../../../assets/img/tardot.png";
import tegmadi from "../../../../assets/audio/0.mp3";
import besh from "../../../../assets/audio/5.wav";
import olti from "../../../../assets/audio/6.wav";
import yetti from "../../../../assets/audio/7.wav";
import sakkiz from "../../../../assets/audio/8.wav";
import toqqiz from "../../../../assets/audio/9.wav";
import on from "../../../../assets/audio/10.wav";

interface TargetCircleProps {
  disabled?: boolean;
  onShoot?: (score: number, x: number, y: number) => void;
  shots?: { x: number; y: number; score: number }[];
  setShots?: React.Dispatch<React.SetStateAction<{ x: number; y: number; score: number }[]>>;
}

const rings = [
  { color: "green", score: 5, size: 140 },
  { color: "green", score: 6, size: 100 },
  { color: "green", score: 7, size: 80 },
  { color: "green", score: 8, size: 60 },
  { color: "green", score: 9, size: 40 },
  { color: "green", score: 10, size: 20 },
];

const audioFiles: { [key: number]: string } = {
  0: tegmadi,
  5: besh,
  6: olti,
  7: yetti,
  8: sakkiz,
  9: toqqiz,
  10: on,
};

const TargetCircle: React.FC<TargetCircleProps> = ({ disabled, onShoot, shots = [], setShots }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  const r = (score: number) =>
    score === 10 ? 10 : score === 9 ? 20 : score === 8 ? 30 : score === 7 ? 40 : score === 6 ? 50 : 110;

  const getScoreFromClick = (x: number, y: number): number => {
    const dx = x - 50;
    const dy = y - 50;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= r(10)) return 10;
    if (distance <= r(9)) return 9;
    if (distance <= r(8)) return 8;
    if (distance <= r(7)) return 7;
    if (distance <= r(6)) return 6;
    if (distance <= r(5)) return y < 50 ? 0 : 5;
    return 0;
  };

  const playAudio = (score: number) => {
    const src = audioFiles[score];
    if (!src) return;
    const a = new Audio(src);
    a.play().catch(() => {});
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const score = getScoreFromClick(x, y);
    playAudio(score);
    if (setShots) setShots((prev) => [...prev, { x, y, score }]);
    if (onShoot) onShoot(score, x, y);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={styles.targetContainer}
      onClick={handleTargetClick}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.targetBackground}>
        {rings.map((ring) => {
          const offset = (100 - ring.size) / 2;
          return (
            <div
              key={ring.score}
              className={`${styles.ring} ${styles[ring.color]}`}
              style={{
                width: `${ring.size}%`,
                height: `${ring.size}%`,
                top: `${offset}%`,
                left: `${offset}%`,
                zIndex: ring.score,
              }}
            >
              {ring.score === 10 && <span className={styles.centerScore}>{ring.score}</span>}
            </div>
          );
        })}
        {rings.flatMap((ring) => {
          const center = 50;
          const distance = (ring.size / 2) * 0.9;
          const positions = [
            { x: center, y: center - distance },
            { x: center, y: center + distance },
            { x: center - distance, y: center },
            { x: center + distance, y: center },
          ];
          return positions.map((pos, idx) => (
            <span
              key={`${ring.score}-${idx}`}
              className={styles.ringLabel}
              style={{
                top: `${pos.y}%`,
                left: `${pos.x}%`,
                color: "white",
                transform: "translate(-50%, -50%)",
                zIndex: ring.score + 1,
              }}
            >
              {ring.score}
            </span>
          ));
        })}
      </div>

      <div className={styles.shotsContainer}>
        {shots.map((shot, idx) => (
          <div
            key={idx}
            className={styles.shotMarker}
            style={{
              top: `${shot.y}%`,
              left: `${shot.x}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 1000 + idx,
              position: "absolute",
            }}
            data-score={shot.score}
          >
            <img src={TargetImage} alt="Shot" className={styles.shotImage} />
          </div>
        ))}
      </div>

      {cursorPos && (
        <div
          className={styles.cursorDot}
          style={{
            top: `${cursorPos.y}%`,
            left: `${cursorPos.x}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

export default TargetCircle;
