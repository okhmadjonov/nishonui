// hooks/useGameScore.ts
import { useState, useEffect, useRef } from "react";

type UserMeta = {
  id?: string | number;
  name?: string;
  photoUrl?: string;
  lavozim?: string;
  unvon?: string;
};

export const useGameScore = (
  user?: UserMeta,
  onResultsUpdate?: (results: any[]) => void
) => {
  const [score, setScore] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [shots, setShots] = useState(0);
  const [maxShots, setMaxShots] = useState(10);
  const [resetKey, setResetKey] = useState(0);
  const [userName, setUserName] = useState(user?.name || "");
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [firstPauseDone, setFirstPauseDone] = useState(false);

  const scoreRef = useRef<number[]>([]);
  scoreRef.current = score;

  const savedOnceRef = useRef(false);

  useEffect(() => {
    if (user?.name) setUserName(user.name);
  }, [user?.name]);

  const handleStart = () => {
    setStarted(true);
    setPaused(false);
    setFirstPauseDone(false);
    setScore([]);
    scoreRef.current = [];
    setShots(0);
    setResetKey((p) => p + 1);
    setDisplayText([""]);
    savedOnceRef.current = false;
  };

  const continueGame = () => {
    setPaused(false);
  };

  const saveNow = () => {
    if (savedOnceRef.current) return;

    const arr = [...scoreRef.current];
    if (arr.length === 0) return;

    const total = arr.reduce((sum, n, i) => (i < 3 ? sum : sum + Number(n)), 0);
    const uniqueId = `${user?.id ?? "anon"}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const newResult = {
      id: uniqueId,
      name: (userName && userName.trim()) || user?.name || "Unknown",
      photoUrl: user?.photoUrl,
      lavozim: user?.lavozim,
      unvon: user?.unvon,
      shots: arr,
      score: total,
    };

    onResultsUpdate?.([newResult]);
    savedOnceRef.current = true;
  };

  const handleFinish = () => {
    setStarted(false);
    setPaused(false);
    saveNow(); // <-- Save only on Yakunlash
  };

  const handleRestart = () => {
    setStarted(false);
    setPaused(false);
    setFirstPauseDone(false);
    setScore([]);
    scoreRef.current = [];
    setShots(0);
    setResetKey((p) => p + 1);
    setDisplayText([""]);
    savedOnceRef.current = false;
  };

  const handleShoot = (shotScore: number) => {
    if (!started || paused || shots >= maxShots) return;

    const nextShots = shots + 1;

    setScore((prev) => {
      const newScore = [...prev, shotScore];
      scoreRef.current = newScore;
      return newScore;
    });

    setShots(nextShots);
    setDisplayText((prev) => [...prev, ` ${shotScore} `]);

    if (!firstPauseDone && nextShots === 3) {
      setPaused(true);
      setFirstPauseDone(true);
      return;
    }

    if (nextShots >= maxShots) {
      // Stop, but DO NOT save here (no autosave).
      setStarted(false);
    }
  };

  return {
    score,
    started,
    paused,
    shots,
    maxShots,
    resetKey,
    userName,
    displayText,
    handleStart,
    continueGame,
    handleFinish,  // <-- Yakunlash calls this
    handleRestart,
    handleShoot,
    setMaxShots,
    setUserName,
  };
};
