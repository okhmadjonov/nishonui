// // components/FaceID/Faceid.tsx
// import { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";
// import styles from "./Faceid.module.scss";

// type Step = "idle" | "live" | "captured";

// interface FaceidProps {
//     onAuthenticated?: (user: {
//         id?: string;
//         name: string;      
//         lavozim?: string;  
//         unvon?: string;    
//         photoUrl?: string; 
//     }) => void;
// }

// const Faceid: React.FC<FaceidProps> = ({ onAuthenticated }) => {
//     const [step, setStep] = useState<Step>("idle");
//     const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
//     const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

//     const webcamRef = useRef<Webcam>(null);

//     const [photo, setPhoto] = useState<string | null>(null);
//     const [fullName, setFullName] = useState("");
//     const [lavozim, setLavozim] = useState("");
//     const [unvon, setUnvon] = useState("");

//     useEffect(() => {
//         navigator.mediaDevices.enumerateDevices().then((allDevices) => {
//             const videoDevices = allDevices.filter((d) => d.kind === "videoinput");
//             setDevices(videoDevices);
//             const external = videoDevices.find((d) => !d.label.toLowerCase().includes("integrated"));
//             setSelectedDeviceId(external ? external.deviceId : videoDevices[0]?.deviceId || null);
//         });
//     }, []);

//     const handleOpenCamera = () => {
//         if (!selectedDeviceId) {
//             alert("Kamera topilmadi.");
//             return;
//         }
//         setPhoto(null);
//         setFullName("");
//         setLavozim("");
//         setUnvon("");
//         setStep("live");
//     };

//     const handleCapture = () => {
//         const shot = webcamRef.current?.getScreenshot();
//         if (!shot) {
//             alert("Rasmni olishda xatolik.");
//             return;
//         }
//         setPhoto(shot);
//         setStep("captured");
//     };

//     const handleRetake = () => {
//         setPhoto(null);
//         setStep("live");
//     };

//     const handleSave = () => {
//         if (!photo) {
//             alert("Rasm yo'q.");
//             return;
//         }
//         if (!fullName.trim()) {
//             alert("F.I.O kiriting.");
//             return;
//         }

//         onAuthenticated?.({
//             name: fullName.trim(),
//             lavozim: lavozim.trim() || undefined,
//             unvon: unvon.trim() || undefined,
//             photoUrl: photo,
//         });

//         setPhoto(null);
//         setFullName("");
//         setLavozim("");
//         setUnvon("");
//         setStep("idle");
//     };

//     const handleCameraError = () => {
//         alert("Kameraga ruxsat berilmadi yoki xatolik yuz berdi.");
//         setStep("idle");
//     };

//     return (
//         <div className={styles.faceid}>
//             <div className={styles.faceid_container}>
//                 <div className={styles.camera_container}>
//                     <div className={styles.camera_content}>
//                         {step === "live" && (
//                             <>
//                                 <Webcam
//                                     ref={webcamRef}
//                                     audio={false}
//                                     screenshotFormat="image/jpeg"
//                                     mirrored={true}
//                                     videoConstraints={{
//                                         deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
//                                     }}
//                                     className={styles.camera_video}
//                                     onUserMediaError={handleCameraError}
//                                 />
//                                 <div className={styles.camera_face_overlay}>
//                                     <div className={styles.camera_face_message}>Yuzingizni kameraga qarating.</div>
//                                 </div>
//                             </>
//                         )}

//                         {step === "captured" && photo && (
//                             <div className={styles.captured_wrapper}>
//                                 <img src={photo} alt="Captured" className={styles.captured_image} />
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div className={styles.result_container}>
//                     {step === "captured" && (
//                         <div className={styles.form_wrapper}>
//                             <div className={styles.form_title}>Maʼlumotlarni kiriting</div>

//                             <div className={styles.form_row}>
//                                 <label>F.I.O</label>
//                                 <input
//                                     type="text"
//                                     value={fullName}
//                                     onChange={(e) => setFullName(e.target.value)}
//                                     placeholder="To'liq ism"
//                                 />
//                             </div>

//                             <div className={styles.form_row}>
//                                 <label>Lavozim</label>
//                                 <input
//                                     type="text"
//                                     value={lavozim}
//                                     onChange={(e) => setLavozim(e.target.value)}
//                                     placeholder="Lavozim"
//                                 />
//                             </div>

//                             <div className={styles.form_row}>
//                                 <label>Unvon</label>
//                                 <input
//                                     type="text"
//                                     value={unvon}
//                                     onChange={(e) => setUnvon(e.target.value)}
//                                     placeholder="Unvon"
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </div>

//             </div>

//             <div className={styles.control}>
//                 {step === "idle" && (
//                     <button
//                         className={styles.opencamera}
//                         onClick={handleOpenCamera}
//                         disabled={!selectedDeviceId}
//                     >
//                         Boshlash
//                     </button>
//                 )}

//                 {step === "live" && (
//                     <>
//                         <button className={styles.try_again} onClick={handleCapture}>
//                             Suratga olish
//                         </button>
//                         <button className={styles.refresh} onClick={() => setStep("idle")}>
//                             Qaytish
//                         </button>
//                     </>
//                 )}

//                 {step === "captured" && (
//                     <>
//                         <button className={styles.try_again} onClick={handleRetake}>
//                             Qayta olish
//                         </button>
//                         <button className={styles.opencamera} onClick={handleSave}>
//                             Saqlash
//                         </button>
//                     </>
//                 )}

//                 {devices.length > 1 && (
//                     <select
//                         value={selectedDeviceId || ""}
//                         onChange={(e) => setSelectedDeviceId(e.target.value)}
//                     >
//                         {devices.map((d, i) => (
//                             <option key={i} value={d.deviceId}>
//                                 {d.label || `Camera ${i + 1}`}
//                             </option>
//                         ))}
//                     </select>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Faceid;
