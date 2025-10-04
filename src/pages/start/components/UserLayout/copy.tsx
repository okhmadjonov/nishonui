// // components/UserLayout/UserLayout.tsx
// import { useState, useEffect } from "react";
// import { IoClose } from "react-icons/io5";
// import styles from "../../Start.module.scss";
// import useExternalCamera from "../../hooks/useExternalCamera";
// import { useGameScore } from "../../hooks/useGameScore";
// import TargetCircle from "../Target/TargetCircle";
// import EndGameModal from "../EndGame/EndGameModal";
// import StartStop from "../StartStop/StartStop";
// import defaultUser from "../../../../assets/img/user.jpg";

// type Props = {
//     user: {
//         id: string;
//         name: string;
//         photoUrl?: string | undefined;
//         lavozim?: string;
//         unvon?: string;
//     };
//     onRemove: () => void;
//     onResultsUpdate: (results: any[]) => void;
// };

// export default function UserLayout({ user, onRemove, onResultsUpdate }: Props) {
//     useExternalCamera();

//     const {
//         score,
//         started,
//         shots,
//         maxShots,
//         resetKey,
//         showModal,
//         userName,
//         displayText,
//         handleStart,
//         handleFinish,
//         handleRestart,
//         handleShoot,
//         handleModalClose,
//         setMaxShots,
//         setUserName,
//     } = useGameScore(user, onResultsUpdate);

//     const [shotsState, setShotsState] = useState<{ x: number; y: number; score: number }[]>([]);

//     useEffect(() => {
//         if (user?.name) setUserName(user.name);
//     }, [user, setUserName]);

//     const safePhoto = user.photoUrl && user.photoUrl.trim() !== "" ? user.photoUrl : defaultUser;

//     return (
//         <div className={styles.layoutContainer}>
//             <button className={styles.closeButton} onClick={onRemove}>
//                 <IoClose size={25} />
//             </button>

//             <div className={styles.userPanel}>
//                 <StartStop
//                     started={started}
//                     shots={shots}
//                     maxShots={maxShots}
//                     score={score}
//                     displayText={displayText}
//                     setMaxShots={setMaxShots}
//                     handleStart={handleStart}
//                     handleRestart={handleRestart}
//                     handleFinish={handleFinish}
//                 />

//                 <div className={styles.faceandtarget}>
//                     <div className={styles.userInfo}>
//                         <img src={safePhoto} alt={user.name} className={styles.userImage} />
//                         <p className={styles.userName}>{user.name}</p>
//                         {user.lavozim && <p className={styles.userBadge}>{user.lavozim}</p>}
//                         {user.unvon && <p className={styles.userBadgeAlt}>{user.unvon}</p>}
//                     </div>

//                     <TargetCircle
//                         key={resetKey}
//                         onShoot={handleShoot}
//                         shots={shotsState}
//                         setShots={setShotsState}
//                     />
//                 </div>

//                 {showModal && (
//                     <EndGameModal
//                         finalScore={score.reduce((a: any, b: any) => a + b, 0)}
//                         userName={userName}
//                         onNameChange={setUserName}
//                         onClose={handleModalClose}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }
