// // import { useState, useEffect, useRef, useCallback } from "react";

// // type UserMeta = {
// //   id?: string | number;
// //   name?: string;
// //   photoUrl?: string;
// //   lavozim?: string;
// //   unvon?: string;
// // };

// // export const useGameScore = (
// //   user?: UserMeta,
// //   onResultsUpdate?: (results: any[]) => void
// // ) => {
// //   const [score, setScore] = useState<number[]>([]);
// //   const [started, setStarted] = useState(false);
// //   const [paused, setPaused] = useState(false);
// //   const [shots, setShots] = useState(0);
// //   const [maxShots, setMaxShots] = useState(10);
// //   const [resetKey, setResetKey] = useState(0);
// //   const [userName, setUserName] = useState(user?.name || "");
// //   const [displayText, setDisplayText] = useState<string[]>([]);
// //   const [firstPauseDone, setFirstPauseDone] = useState(false);

// //   // keep latest score
// //   const scoreRef = useRef<number[]>([]);
// //   scoreRef.current = score;

// //   // guard to avoid duplicate finalize within one run
// //   const finalizedRef = useRef(false);

// //   useEffect(() => {
// //     if (user?.name) setUserName(user.name);
// //   }, [user?.name]);

// //   const handleStart = () => {
// //     setStarted(true);
// //     setPaused(false);
// //     setFirstPauseDone(false);
// //     setScore([]);
// //     scoreRef.current = [];
// //     setShots(0);
// //     setResetKey((p) => p + 1);
// //     setDisplayText([""]);
// //     finalizedRef.current = false; // reset guard
// //   };

// //   const continueGame = () => setPaused(false);

// //   const finalizeNow = useCallback(() => {
// //     if (finalizedRef.current) return; // already finalized this run
// //     finalizedRef.current = true;

// //     const arr = [...scoreRef.current];
// //     if (arr.length === 0) return;

// //     const total = arr.reduce((sum, n, i) => (i < 3 ? sum : sum + Number(n)), 0);
// //     const uniqueId = `${user?.id ?? "anon"}-${Date.now()}-${Math.random()
// //       .toString(36)
// //       .slice(2, 8)}`;

// //     const newResult = {
// //       id: uniqueId,
// //       name: (userName && userName.trim()) || user?.name || "Unknown",
// //       photoUrl: user?.photoUrl,
// //       lavozim: user?.lavozim,
// //       unvon: user?.unvon,
// //       shots: arr,
// //       score: total,
// //     };

// //     onResultsUpdate?.([newResult]);
// //   }, [onResultsUpdate, user?.id, user?.name, user?.photoUrl, user?.lavozim, user?.unvon, userName]);

// //   const handleFinish = () => {
// //     setStarted(false);
// //     setPaused(false);
// //     finalizeNow(); // single place where finalize happens
// //   };

// //   const handleRestart = () => {
// //     setStarted(false);
// //     setPaused(false);
// //     setFirstPauseDone(false);
// //     setScore([]);
// //     scoreRef.current = [];
// //     setShots(0);
// //     setResetKey((p) => p + 1);
// //     setDisplayText([""]);
// //     finalizedRef.current = false; // reset guard
// //   };

// //   const handleShoot = (shotScore: number) => {
// //     if (!started || paused || shots >= maxShots) return;

// //     const nextShots = shots + 1;

// //     setScore((prev) => {
// //       const newScore = [...prev, shotScore];
// //       scoreRef.current = newScore;
// //       return newScore;
// //     });

// //     setShots(nextShots);
// //     setDisplayText((prev) => [...prev, ` ${shotScore} `]);

// //     if (nextShots >= maxShots) {
// //       setStarted(false);
// //       finalizeNow(); // finalize once at cap
// //       return;
// //     }

// //     if (!firstPauseDone && nextShots === 3) {
// //       setPaused(true);
// //       setFirstPauseDone(true);
// //     }
// //   };

// //   return {
// //     score,
// //     started,
// //     paused,
// //     shots,
// //     maxShots,
// //     resetKey,
// //     userName,
// //     displayText,
// //     handleStart,
// //     continueGame,
// //     handleFinish,
// //     handleRestart,
// //     handleShoot,
// //     finalizeNow,
// //     setMaxShots,
// //     setUserName,
// //   };
// // };


// // hooks/useGameScore.ts
// import { useState, useEffect, useRef } from "react";

// type UserMeta = {
//   id?: string | number;
//   name?: string;
//   photoUrl?: string;
//   lavozim?: string;
//   unvon?: string;
// };

// export const useGameScore = (
//   user?: UserMeta,
//   onResultsUpdate?: (results: any[]) => void
// ) => {
//   const [score, setScore] = useState<number[]>([]);
//   const [started, setStarted] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [shots, setShots] = useState(0);
//   const [maxShots, setMaxShots] = useState(10);
//   const [resetKey, setResetKey] = useState(0);
//   const [userName, setUserName] = useState(user?.name || "");
//   const [displayText, setDisplayText] = useState<string[]>([]);
//   const [firstPauseDone, setFirstPauseDone] = useState(false);

//   const scoreRef = useRef<number[]>([]);
//   scoreRef.current = score;

//   useEffect(() => {
//     if (user?.name) setUserName(user.name);
//   }, [user?.name]);

//   const handleStart = () => {
//     setStarted(true);
//     setPaused(false);
//     setFirstPauseDone(false);
//     setScore([]);
//     scoreRef.current = [];
//     setShots(0);
//     setResetKey((p) => p + 1);
//     setDisplayText([""]);
//   };

//   const continueGame = () => {
//     setPaused(false);
//   };

//   const finalizeAndSave = () => {
//     const arr = [...scoreRef.current];
//     if (arr.length === 0) return;

//     const total = arr.reduce((sum, n, i) => (i < 3 ? sum : sum + Number(n)), 0);
//     const uniqueId = `${user?.id ?? "anon"}-${Date.now()}-${Math.random()
//       .toString(36)
//       .slice(2, 8)}`;

//     const newResult = {
//       id: uniqueId,
//       name: (userName && userName.trim()) || user?.name || "Unknown",
//       photoUrl: user?.photoUrl,
//       lavozim: user?.lavozim,
//       unvon: user?.unvon,
//       shots: arr,
//       score: total,
//     };

//     onResultsUpdate?.([newResult]);
//   };

//   const handleFinish = () => {
//     setStarted(false);
//     setPaused(false);
//     finalizeAndSave();
//   };

//   const handleRestart = () => {
//     setStarted(false);
//     setPaused(false);
//     setFirstPauseDone(false);
//     setScore([]);
//     scoreRef.current = [];
//     setShots(0);
//     setResetKey((p) => p + 1);
//     setDisplayText([""]);
//   };

//   const handleShoot = (shotScore: number) => {
//     if (!started || paused || shots >= maxShots) return;

//     const nextShots = shots + 1;

//     setScore((prev) => {
//       const newScore = [...prev, shotScore];
//       scoreRef.current = newScore;
//       return newScore;
//     });

//     setShots(nextShots);
//     setDisplayText((prev) => [...prev, ` ${shotScore} `]);

//     if (!firstPauseDone && nextShots === 3) {
//       setPaused(true);
//       setFirstPauseDone(true);
//       return;
//     }

//     if (nextShots >= maxShots) {
//       setStarted(false);
//       setTimeout(() => finalizeAndSave(), 0);
//     }
//   };

//   return {
//     score,
//     started,
//     paused,
//     shots,
//     maxShots,
//     resetKey,
//     userName,
//     displayText,
//     handleStart,
//     continueGame,
//     handleFinish,
//     handleRestart,
//     handleShoot,
//     setMaxShots,
//     setUserName,
//   };
// };
