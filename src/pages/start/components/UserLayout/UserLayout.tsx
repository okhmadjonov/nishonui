import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./UserLayout.module.scss";
import useExternalCamera from "../../hooks/useExternalCamera";
import { useGameScore } from "../../hooks/useGameScore";
import TargetCircle from "../Target/TargetCircle";
import defaultUser from "../../../../assets/img/user.jpg";

type Weapon = "pm" | "automat";

type Props = {
  user: {
    id: string;
    name: string;
    photoUrl?: string | undefined;
    lavozim?: string;
    unvon?: string;
  };
  onRemove: () => void;
  onResultsUpdate: (results: any[]) => void;
  startSignal: number;
  restartSignal: number;
  finishSignal: number;
  globalMaxShots: number;
  simulateSignal: number;
  continueSignal: number;
  weapon: Weapon | null;
  order: number;
};

export default function UserLayout({
  user,
  onRemove,
  onResultsUpdate,
  startSignal,
  restartSignal,
  finishSignal,
  globalMaxShots,
  simulateSignal,
  continueSignal,
  weapon,
  order
}: Props) {
  useExternalCamera();

  const {
    started,
    paused,
    shots,
    maxShots,
    resetKey,
    userName,
    displayText,
    handleStart,
    handleFinish,
    handleRestart,
    handleShoot,
    setMaxShots,
    setUserName,
    continueGame,
  } = useGameScore(user, onResultsUpdate);

  const [shotsState, setShotsState] = useState<{ x: number; y: number; score: number }[]>([]);
  const timerIdRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const pausedRef = useRef(false);
  const firedRef = useRef(0);
  const maxShotsRef = useRef(0);
  const shootRef = useRef<(s: number) => void>(() => { });
  const continueRef = useRef(() => { });
  const finishRef = useRef(() => { });
  const restartRef = useRef(() => { });
  const startRef = useRef(() => { });

  useEffect(() => { startedRef.current = started; }, [started]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { maxShotsRef.current = maxShots; }, [maxShots]);
  useEffect(() => { shootRef.current = handleShoot; }, [handleShoot]);
  useEffect(() => { continueRef.current = continueGame; }, [continueGame]);
  useEffect(() => { finishRef.current = handleFinish; }, [handleFinish]);
  useEffect(() => { restartRef.current = handleRestart; }, [handleRestart]);
  useEffect(() => { startRef.current = handleStart; }, [handleStart]);

  useEffect(() => { setUserName(user.name || ""); }, [user.id, user.name, setUserName]);

  useEffect(() => {
    if (startSignal > 0) {
      setShotsState([]);
      firedRef.current = 0;
      startRef.current();
    }
  }, [startSignal]);

  useEffect(() => {
    if (restartSignal > 0) {
      if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }
      setShotsState([]);
      firedRef.current = 0;
      restartRef.current();
    }
  }, [restartSignal]);

  useEffect(() => {
    if (finishSignal > 0) {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
      finishRef.current();
    }
  }, [finishSignal]);

  useEffect(() => {
    if (globalMaxShots > 0) setMaxShots(globalMaxShots);
  }, [globalMaxShots, setMaxShots]);

  const ringSizeByScore = (s: number) =>
    s === 10 ? 20 : s === 9 ? 40 : s === 8 ? 60 : s === 7 ? 80 : s === 6 ? 100 : 220;

  const randomInAnnulus = (rInner: number, rOuter: number, half: "upper" | "lower" | "any") => {
    const theta =
      half === "upper"
        ? Math.random() * Math.PI
        : half === "lower"
          ? Math.PI + Math.random() * Math.PI
          : Math.random() * Math.PI * 2;
    const rInnerSq = rInner * rInner;
    const rOuterSq = rOuter * rOuter;
    const r = Math.sqrt(rInnerSq + Math.random() * (rOuterSq - rInnerSq));
    const x = 50 + r * Math.cos(theta);
    const y = 50 + r * Math.sin(theta);
    return { x, y };
  };

  const pointForScore = (s: number) => {
    if (s === 0) {
      const rOuter = ringSizeByScore(5) / 2;
      const rInner = ringSizeByScore(6) / 2;
      return randomInAnnulus(rInner, rOuter, "upper");
    }
    if (s === 5) {
      const rOuter = ringSizeByScore(5) / 2;
      const rInner = ringSizeByScore(6) / 2;
      return randomInAnnulus(rInner, rOuter, "lower");
    }
    const rOuter = ringSizeByScore(s) / 2;
    const rInner = s === 10 ? 0 : ringSizeByScore(s + 1) / 2;
    return randomInAnnulus(rInner, rOuter, "any");
  };

  const weightedScore = () => {
    const roll = Math.random();
    if (roll < 0.005) return 10;
    if (roll < 0.03) return 9;
    if (roll < 0.15) return 8;
    if (roll < 0.40) return 7;
    return 6;
  };

  const tick = (weaponNow: Weapon | null) => {
    if (!startedRef.current || pausedRef.current) return;
    if (!weaponNow || maxShotsRef.current <= 0) return;

    if (firedRef.current >= maxShotsRef.current) {
      if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }
      return;
    }

    const missRate = weaponNow === "pm" ? 0.35 : 0.45;
    const isMiss = Math.random() < missRate;
    const s = isMiss ? 0 : weightedScore();
    const p = pointForScore(s);

    setShotsState((prev) => [...prev, { x: p.x, y: p.y, score: s }]);
    shootRef.current(s);
    firedRef.current += 1;

    if (firedRef.current >= maxShotsRef.current) {
      if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }
    }
  };

  useEffect(() => {
    if (!(started && weapon && maxShots > 0)) return;

    if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }
    firedRef.current = 0;

    const id = window.setInterval(() => tick(weapon), 800);
    timerIdRef.current = id as unknown as number;

    return () => {
      if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }
    };
  }, [simulateSignal, started, weapon, maxShots]);

  useEffect(() => {
    if (continueSignal > 0) continueRef.current();
  }, [continueSignal]);

  const lastTotal: number = shotsState.reduce(
    (sum: number, shot: { x: number; y: number; score: number }, index: number) =>
      (index < 3 ? sum : sum + shot.score),
    0
  );

  const safePhoto = user.photoUrl && user.photoUrl.trim() !== "" ? user.photoUrl : (defaultUser as string);

  return (
    <div className={styles.layoutContainer}>
      <button className={styles.closeButton} onClick={onRemove}>
        <IoClose size={25} />
      </button>

      <div className={styles.userPanel}>
        <div className={styles.mainRow}>
          <div className={styles.userInfo}>
            <div className={styles.userOrder}>{order}</div>
            <img src={safePhoto} alt={user.name} className={styles.userImage} />
            <p className={styles.userName}>{user.name}</p>
            {user.lavozim && <p className={styles.userBadge}>{user.lavozim}</p>}
            {user.unvon && <p className={styles.userBadgeAlt}>{user.unvon}</p>}
          </div>

          <div className={styles.targetWrapper}>
            <TargetCircle key={resetKey} shots={shotsState} setShots={setShotsState} />
          </div>
          <div className={styles.screenShooter}>
            <div className={styles.scoreSummary}>
              <p>Umumiy natija:</p>
              <span>{lastTotal}</span>
            </div>
            <div className={styles.screenshooterWrapper}>
              {displayText.map((text, index) => (
                <span key={index} className={styles.scoreItem}>{text}</span>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
