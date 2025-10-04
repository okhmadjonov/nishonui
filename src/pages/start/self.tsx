// import styles from "./Start.module.scss";
// import { useState, useEffect } from "react";
// import { Button, Space, Typography } from "antd";
// import Faceid from "@/components/FaceID/Faceid";
// import UserLayout from "./components/UserLayout/UserLayout";
// import ResultsTable from "./components/Results/ResultsTable";
// import StartStop from "./components/StartStop/StartStop";

// type Weapon = "pm" | "automat";

// const { Title } = Typography;

// type DataType = {
//   [region: string]: {
//     branches: {
//       [branch: string]: string[];
//     };
//   };
// };

// const data: DataType = {
//   Tashkent: {
//     branches: {
//       "O'rtasaroy": ["Rubej 1", "Rubej 2", "Rubej 3", "Rubej 4"],
//       "Vazirlik": ["Rubej 1", "Rubej 2", "Rubej 3"],
//       "Chirchiq": ["Rubej 1", "Rubej 2", "Rubej 3", "Rubej 4", "Rubej 5"],
//       "Yangiyo'l": ["Rubej 1", "Rubej 2"],
//       "Angren": ["Rubej 1", "Rubej 2", "Rubej 3"],
//     },
//   },
//   Samarkand: {
//     branches: {
//       "Branch A": ["Rubej 1", "Rubej 2", "Rubej 3"],
//       "Branch B": ["Rubej 1", "Rubej 2", "Rubej 3", "Rubej 4"],
//     },
//   },
//   Andijan: {
//     branches: {
//       "Branch X": ["Rubej 1", "Rubej 2", "Rubej 3"],
//       "Branch Y": ["Rubej 1", "Rubej 2"],
//     },
//   },
// };

// function Start() {
//   const [authenticatedUsers, setAuthenticatedUsers] = useState<any[]>([]);
//   const [allResults, setAllResults] = useState<any[]>([]);
//   const [hydrated, setHydrated] = useState(false);

//   const [globalStarted, setGlobalStarted] = useState(false);
//   const [startSignal, setStartSignal] = useState(0);
//   const [restartSignal, setRestartSignal] = useState(0);
//   const [finishSignal, setFinishSignal] = useState(0);
//   const [globalMaxShots, setGlobalMaxShots] = useState(0);
//   const [simulateSignal, setSimulateSignal] = useState(0);
//   const [continueSignal, setContinueSignal] = useState(0);
//   const [globalWeapon, setGlobalWeapon] = useState<Weapon | null>(null);

//   const [pendingSave, setPendingSave] = useState(false);

//   const [selectedRegion, setSelectedRegion] = useState<keyof DataType | null>(null);
//   const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
//   const [selectedRubej, setSelectedRubej] = useState<string | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("gameResults");
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         if (Array.isArray(parsed)) setAllResults(parsed);
//       } catch { }
//     }
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (!hydrated || !pendingSave) return;
//     localStorage.setItem("gameResults", JSON.stringify(allResults));
//     setPendingSave(false);
//   }, [allResults, hydrated, pendingSave]);

//   const handleGlobalStart = () => {
//     if (globalMaxShots <= 0 || !globalWeapon) return;
//     setGlobalStarted(true);
//     setStartSignal((n) => n + 1);
//     setSimulateSignal((n) => n + 1);
//   };

//   const handleGlobalRestart = () => {
//     setGlobalStarted(false);
//     setRestartSignal((n) => n + 1);
//   };

//   const handleGlobalFinish = () => {
//     setGlobalStarted(false);
//     setFinishSignal((n) => n + 1);
//     setGlobalMaxShots(0);
//     setGlobalWeapon(null);
//   };

//   const handleContinue = () => setContinueSignal((n) => n + 1);

//   const handleWeaponChoose = (weapon: Weapon, count: number) => {
//     setGlobalWeapon(weapon);
//     setGlobalMaxShots(count);
//   };

//   const handleUserAuthenticated = (user: any) => {
//     const id = user?.id ?? crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
//     setAuthenticatedUsers((prev) => [...prev, { ...user, id }]);
//   };

//   const handleRemoveLayout = (id: string) => {
//     setAuthenticatedUsers((prev) => prev.filter((u) => u.id !== id));
//   };

//   const handleResultsUpdate = (newResults: any[]) => {
//     setAllResults((prev) => {
//       const noDupes = prev.filter((r) => !newResults.some((nr) => nr.id === r.id));
//       return [...noDupes, ...newResults];
//     });
//     setPendingSave(true);
//   };

//   return (
//     <div className={styles.appContainer}>
//       {!selectedRegion ? (
//         <div className={styles.selector}>
//           <Title level={4}>Viloyatni tanlang</Title>
//           <Space wrap>
//             {Object.keys(data).map((region) => (
//               <Button
//                 key={region}
//                 type={selectedRegion === region ? "primary" : "dashed"}
//                 onClick={() => {
//                   setSelectedRegion(region as keyof DataType);
//                   setSelectedBranch(null);
//                   setSelectedRubej(null);
//                 }}
//               >
//                 {region}
//               </Button>
//             ))}
//           </Space>
//         </div>
//       ) : !selectedBranch ? (
//         <div className={styles.selector}>
//           <Space style={{ marginBottom: 16 }}>
//             <Button type="dashed" onClick={() => setSelectedRegion(null)}>
//               Orqaga
//             </Button>
//           </Space>
//           <Title level={4}>{selectedRegion} uchun filialni tanlang</Title>
//           <Space wrap>
//             {Object.keys(data[selectedRegion].branches).map((branch) => (
//               <Button
//                 key={branch}
//                 type={selectedBranch === branch ? "primary" : "dashed"}
//                 onClick={() => {
//                   setSelectedBranch(branch);
//                   setSelectedRubej(null);
//                 }}
//               >
//                 {branch}
//               </Button>
//             ))}
//           </Space>
//         </div>
//       ) : !selectedRubej ? (
//         <div className={styles.selector}>
//           <Space style={{ marginBottom: 16 }}>
//             <Button type="dashed" onClick={() => setSelectedBranch(null)}>
//               Orqaga
//             </Button>
//           </Space>
//           <Title level={4}>{selectedBranch} uchun rubejni tanlang</Title>
//           <Space wrap>
//             {data[selectedRegion].branches[selectedBranch].map((rubej: string) => (
//               <Button
//                 key={rubej}
//                 type={selectedRubej === rubej ? "primary" : "dashed"}
//                 onClick={() => setSelectedRubej(rubej)}
//               >
//                 {rubej}
//               </Button>
//             ))}
//           </Space>
//         </div>
//       ) : (
//         <>
//           <div className={styles.selector}>
//             <Space style={{ marginBottom: 16 }}>
//               <Button type="dashed" onClick={() => setSelectedRubej(null)}>
//                 Orqaga
//               </Button>
//             </Space>
//           </div>

//           <div className={styles.faceid_block}>
//             <Faceid onAuthenticated={handleUserAuthenticated} />
//             <StartStop
//               started={globalStarted}
//               handleStart={handleGlobalStart}
//               handleRestart={handleGlobalRestart}
//               handleFinish={handleGlobalFinish}
//               handleContinue={handleContinue}
//               onWeaponChoose={handleWeaponChoose}
//             />
//           </div>

//           {authenticatedUsers.map((user, idx) => (
//             <UserLayout
//               key={user.id}
//               user={user}
//               onRemove={() => handleRemoveLayout(user.id)}
//               onResultsUpdate={handleResultsUpdate}
//               startSignal={startSignal}
//               restartSignal={restartSignal}
//               finishSignal={finishSignal}
//               globalMaxShots={globalMaxShots}
//               simulateSignal={simulateSignal}
//               continueSignal={continueSignal}
//               weapon={globalWeapon}
//               order={idx + 1}
//             />
//           ))}

//           <div className={styles.results}>
//             {allResults.length > 0 && (
//               <ResultsTable results={allResults} setResults={setAllResults} />
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Start;
