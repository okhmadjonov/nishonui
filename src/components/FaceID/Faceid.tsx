import { useState, useEffect, useRef, useMemo } from "react";
import Webcam from "react-webcam";
import styles from "./Faceid.module.scss";

type PersonApi = {
    Pnfl: string;
    FirstName: string;
    LastName: string;
    Patronymic: string;
    PhotoBase64?: string | null;
};
type Person = {
    pnfl: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    photoBase64?: string | null;
};

type Step = "idle" | "live" | "captured";
interface FaceidProps {
    onAuthenticated?: (user: {
        id?: string;
        name: string;
        lavozim?: string;
        unvon?: string;
        photoUrl?: string;
    }) => void;
}

const API_BASE = "http://127.0.0.1:8000";

const normalize = (p: PersonApi): Person => ({
    pnfl: (p.Pnfl ?? "").trim(),
    firstName: (p.FirstName ?? "").trim(),
    lastName: (p.LastName ?? "").trim(),
    patronymic: (p.Patronymic ?? "").trim(),
    photoBase64: p.PhotoBase64 ?? null,
});

const extractArray = (raw: any): PersonApi[] => {
    if (Array.isArray(raw)) return raw;
    if (raw?.results && Array.isArray(raw.results)) return raw.results;
    if (raw?.data && Array.isArray(raw.data)) return raw.data;
    if (raw?.items && Array.isArray(raw.items)) return raw.items;
    return [];
};

const isLikelyPnfl = (q: string) => /^\d{14}$/.test(q.trim());
const buildFullName = (p: { lastName: string; firstName: string; patronymic: string }) =>
    [p.lastName, p.firstName, p.patronymic].filter(Boolean).join(" ").trim();
const dataUrlFromBase64 = (b64?: string | null) =>
    b64 && b64.trim() ? (b64.startsWith("data:") ? b64 : `data:image/jpeg;base64,${b64.trim()}`) : undefined;

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, ms = 12000) {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), ms);
    try {
        return await fetch(input, { ...init, signal: ctrl.signal });
    } finally {
        clearTimeout(id);
    }
}

const parseFullName = (raw: string) => {
    const parts = raw.trim().replace(/\s+/g, " ").split(" ");
    const [p0, p1, p2] = parts;
    return {
        lastName: (p0 || "").toUpperCase(),
        firstName: (p1 || "").toUpperCase(),
        patronymic: (p2 || "").toUpperCase(),
    };
};

const isNonEmptyNotFound = (q: string, filteredLen: number, loaded: boolean) =>
    q.trim().length >= 2 && loaded && filteredLen === 0;

const Faceid: React.FC<FaceidProps> = ({ onAuthenticated }) => {
    const [step, setStep] = useState<Step>("idle");
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    const [pnfl, setPnfl] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [lavozim, setLavozim] = useState("");
    const [unvon, setUnvon] = useState("");

    const [people, setPeople] = useState<Person[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (status === "loading" || status === "succeeded") return;
            setStatus("loading");
            setError(null);
            const url = `${API_BASE}/api/persons/?limit=3500&offset=0`;
            try {
                const res = await fetchWithTimeout(url, { headers: { Accept: "application/json" } }, 15000);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const raw = await res.json();
                const arr = extractArray(raw);
                setPeople(arr.map(normalize));
                setStatus("succeeded");
            } catch (e: any) {
                setError(e?.name === "AbortError" ? "So‘rov vaqti tugadi (timeout)." : e?.message || "Yuklashda xatolik");
                setStatus("failed");
            }
        })();
    }, [status]);

    const refreshDevices = async () => {
        try {
            const allDevices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = allDevices.filter((d) => d.kind === "videoinput");
            setDevices(videoDevices);
            const external = videoDevices.find(
                (d) => (d.label || "").toLowerCase().includes("usb") || !(d.label || "").toLowerCase().includes("integrated")
            );
            const first = videoDevices[0];
            const pick = external?.deviceId || first?.deviceId || null;
            setSelectedDeviceId((prev) => prev ?? pick);
        } catch { }
    };

    const ensureCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setHasCameraPermission(true);
            const track = stream.getVideoTracks()[0];
            const devId = (track?.getSettings()?.deviceId as string | undefined) || null;
            if (devId && !selectedDeviceId) setSelectedDeviceId(devId);
            stream.getTracks().forEach((t) => t.stop());
            await refreshDevices();
            return true;
        } catch {
            alert("Kamera ruxsati berilmadi. Iltimos, brauzer sozlamalaridan ruxsat bering.");
            return false;
        }
    };

    useEffect(() => {
        refreshDevices();
    }, []);

    const [search, setSearch] = useState("");
    const [openList, setOpenList] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);

    const filtered: Person[] = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return [];
        if (isLikelyPnfl(q)) {
            const hit = people.find((p) => p.pnfl === q);
            return hit ? [hit] : [];
        }
        const parts = q.split(/\s+/).filter(Boolean);
        if (parts.length === 0) return [];
        return people.filter((p) => {
            const ln = p.lastName.toLowerCase();
            const fn = p.firstName.toLowerCase();
            const pt = p.patronymic.toLowerCase();
            const hay = `${ln} ${fn} ${pt}`.trim();
            return parts.every((part) => hay.includes(part));
        });
    }, [search, people]);

    const handleOpenCamera = async () => {
        const loaded = status === "succeeded";
        if (isNonEmptyNotFound(search, filtered.length, loaded)) {
            if (isLikelyPnfl(search)) {
                setPnfl(search.trim());
            } else {
                const { lastName: ln, firstName: fn, patronymic: pt } = parseFullName(search);
                if (ln) setLastName(ln);
                if (fn) setFirstName(fn);
                if (pt) setPatronymic(pt);
            }
        }
        const ok = hasCameraPermission || (await ensureCameraPermission());
        if (!ok) return;
        setStep("live");
    };

    const handleCapture = () => {
        const shot = webcamRef.current?.getScreenshot();
        if (!shot) {
            alert("Rasmni olishda xatolik. Iltimos, qayta urinib ko‘ring.");
            return;
        }
        setPhoto(shot);
        setStep("captured");
    };

    const handleRetake = () => {
        setPhoto(null);
        setStep("live");
    };

    const handleSave = () => {
        if (!photo) {
            alert("Rasm mavjud emas. Qidiruvdan topilgan suratni tanlang yoki kamera orqali oling.");
            return;
        }
        const nameCombined = buildFullName({ lastName, firstName, patronymic });
        if (!nameCombined) {
            alert("F.I.O (Familiya, Ism, Sharif) kiriting yoki ro‘yxatdan tanlang.");
            return;
        }
        onAuthenticated?.({
            id: pnfl || undefined,
            name: nameCombined,
            lavozim: lavozim.trim() || undefined,
            unvon: unvon.trim() || undefined,
            photoUrl: photo,
        });
        setStep("idle");
        setSearch("");
        setOpenList(false);
        setHighlightIndex(0);
        setPhoto(null);
    };

    const fillFromPerson = (p: Person) => {
        setPnfl(p.pnfl || "");
        setFirstName(p.firstName || "");
        setLastName(p.lastName || "");
        setPatronymic(p.patronymic || "");
    };

    const selectPerson = async (p: Person) => {
        fillFromPerson(p);
        setOpenList(false);
        const url = `${API_BASE}/api/persons/pnfl?pnfl=${encodeURIComponent(p.pnfl)}`;
        try {
            const res = await fetchWithTimeout(url, { method: "POST", headers: { Accept: "application/json" } }, 12000);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const raw = (await res.json()) as PersonApi;
            const detailed = normalize(raw);
            setPeople((prev) => {
                const i = prev.findIndex((x) => x.pnfl === detailed.pnfl);
                if (i === -1) return [...prev, detailed];
                const next = [...prev];
                next[i] = { ...prev[i], ...detailed };
                return next;
            });
            const apiPhoto = dataUrlFromBase64(detailed.photoBase64 ?? p.photoBase64);
            if (apiPhoto) {
                setPhoto(apiPhoto);
                setStep("captured");
            } else {
                setPhoto(null);
                const ok = hasCameraPermission || (await ensureCameraPermission());
                if (ok) setStep("live");
                else setStep("idle");
            }
        } catch {
            setPhoto(null);
            const ok = hasCameraPermission || (await ensureCameraPermission());
            if (ok) setStep("live");
            else setStep("idle");
        }
    };

    useEffect(() => {
        const q = pnfl.trim();
        if (q.length !== 14) return;
        (async () => {
            const url = `${API_BASE}/api/persons/pnfl?pnfl=${encodeURIComponent(q)}`;
            try {
                const res = await fetchWithTimeout(url, { method: "POST", headers: { Accept: "application/json" } }, 12000);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const raw = (await res.json()) as PersonApi;
                const detailed = normalize(raw);
                fillFromPerson(detailed);
                const apiPhoto = dataUrlFromBase64(detailed.photoBase64);
                if (apiPhoto) {
                    setPhoto(apiPhoto);
                    setStep("captured");
                }
            } catch { }
        })();
    }, [pnfl]);

    const onSearchKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "ArrowDown" && openList && filtered.length > 0) {
            e.preventDefault();
            setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp" && openList && filtered.length > 0) {
            e.preventDefault();
            setHighlightIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (openList && filtered.length > 0) {
                const pick = filtered[highlightIndex];
                if (pick) selectPerson(pick);
            } else if (isNonEmptyNotFound(search, filtered.length, status === "succeeded")) {
                handleOpenCamera();
            }
        } else if (e.key === "Escape") {
            setOpenList(false);
        }
    };

    const showSearch = step === "idle" || step === "live" || step === "captured";
    const showForm = step === "idle" || step === "live" || step === "captured";

    return (
        <div className={styles.faceid}>
            <div className={styles.faceid_container}>
                <div className={styles.camera_container}>
                    <div className={styles.camera_card}>
                        <div className={styles.camera_content}>
                            {step === "live" && (
                                <>
                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        screenshotQuality={0.95}
                                        mirrored={true}
                                        videoConstraints={
                                            selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : { facingMode: "user" }
                                        }
                                        className={styles.camera_video}
                                    />
                                    <div className={styles.camera_face_overlay}>
                                        <div className={styles.camera_face_message}>Yuzingizni kameraga qarating.</div>
                                    </div>
                                </>
                            )}
                            {step === "captured" && photo && (
                                <div className={styles.captured_wrapper}>
                                    <img src={photo} alt="Captured" className={styles.captured_image} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.result_container}>
                    {showSearch && (
                        <div className={styles.form_wrapper}>
                            <div className={styles.form_title}>Qidirish</div>
                            <div className={styles.form_row}>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setOpenList(true);
                                    }}
                                    onKeyDown={onSearchKeyDown}
                                    placeholder=' F.I.O'
                                />
                            </div>

                            {status === "loading" && <div className={styles.hint}>Yuklanmoqda...</div>}
                            {status === "failed" && error && (
                                <div className={styles.error}>
                                    {error}{" "}
                                    <button
                                        onClick={() => {
                                            setStatus("idle");
                                        }}
                                        style={{ marginLeft: 8 }}
                                    >
                                        Qayta yuklash
                                    </button>
                                </div>
                            )}

                            {openList && filtered.length > 0 && (
                                <div className={styles.dropdown}>
                                    {filtered.map((p, idx) => {
                                        const name = buildFullName(p);
                                        const isActive = idx === highlightIndex;
                                        return (
                                            <div
                                                key={`${p.pnfl}-${idx}`}
                                                className={`${styles.dropdown_item} ${isActive ? styles.active : ""}`}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    selectPerson(p);
                                                }}
                                            >
                                                <div className={styles.dropdown_primary}>{name}</div>
                                                <div className={styles.dropdown_meta}>PNFL: {p.pnfl}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {openList && status === "succeeded" && filtered.length === 0 && search.trim().length >= 2 && (
                                <div className={styles.hint}>
                                    Hech narsa topilmadi — qo‘lda to‘ldiring yoki kamerani oching.
                                    <button
                                        style={{
                                            marginLeft: 8,
                                            padding: "8px",
                                            marginTop: "5px",
                                            border: "none",
                                            backgroundColor: "#ff9800",
                                            color: "#fff",
                                            borderRadius: "8px",
                                            cursor: "pointer"

                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleOpenCamera();
                                        }}
                                    >
                                        Kamerani ochish
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {showForm && (
                        <div className={styles.form_wrapper}>
                            <div className={styles.form_title}>Maʼlumotlar</div>



                            <div className={styles.form_row}>
                                <label>Familiya</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Familiya"
                                />
                            </div>

                            <div className={styles.form_row}>
                                <label>Ism</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Ism"
                                />
                            </div>

                            <div className={styles.form_row}>
                                <label>Sharif</label>
                                <input
                                    type="text"
                                    value={patronymic}
                                    onChange={(e) => setPatronymic(e.target.value)}
                                    placeholder="Otasi ismi"
                                />
                            </div>

                            <div className={styles.form_row}>
                                <label>PNFL qo'lda kiriting (Topilmaganlar uchun)</label>
                                <input
                                    type="text"
                                    value={lavozim}
                                    onChange={(e) => setLavozim(e.target.value)}
                                    placeholder="PNFL qo'lda kiriting"
                                />
                            </div>

                            {/* <div className={styles.form_row}>
                                <label>Unvon</label>
                                <input
                                    type="text"
                                    value={unvon}
                                    onChange={(e) => setUnvon(e.target.value)}
                                    placeholder="Unvon"
                                />
                            </div> */}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.control}>
                {step === "idle" && (
                    <button className={styles.opencamera} onClick={handleOpenCamera}>
                        Boshlash
                    </button>
                )}
                {step === "live" && (
                    <>
                        <button className={styles.try_again} onClick={handleCapture}>
                            Suratga olish
                        </button>
                        <button className={styles.refresh} onClick={() => setStep("idle")}>
                            Qaytish
                        </button>
                    </>
                )}
                {step === "captured" && (
                    <>
                        <button className={styles.try_again} onClick={handleRetake}>
                            Qayta olish
                        </button>
                        <button className={styles.opencamera} onClick={handleSave}>
                            Saqlash
                        </button>
                    </>
                )}

                {devices.length > 1 && (
                    <select
                        value={selectedDeviceId || ""}
                        onChange={(e) => setSelectedDeviceId(e.target.value)}
                        title="Kamera tanlash"
                    >
                        {devices.map((d, i) => (
                            <option key={i} value={d.deviceId}>
                                {d.label || `Camera ${i + 1}`}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default Faceid;
