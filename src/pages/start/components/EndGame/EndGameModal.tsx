import { Input } from "antd";
import styles from "./EndGameModal.module.scss";

export default function EndGameModal({
  finalScore,
  userName,
  onNameChange,
  onClose,
}: {
  finalScore: number;
  userName: string;
  onNameChange: (name: string) => void;
  onClose: () => void;
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h4>O‘q otish tugadi!</h4>

        <div className={styles.modalContent}>
          {/* <div className={styles.field}>
            <label>Ism, Familya</label>
            <Input
              value={userName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Ismni kiriting"
            />
          </div> */}

          <p className={styles.resultText}>
            Umumiy natija : <strong>{finalScore}</strong>
          </p>

          <div className={styles.modalActions}>
            <button
              onClick={onClose}
              className={`${styles.button} ${styles.modalButton}`}
            >
              Saqlash & Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
