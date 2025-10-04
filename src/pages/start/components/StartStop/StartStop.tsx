import React, { useState } from "react";
import styles from "./StartStop.module.scss";
import { GiAk47, GiPistolGun } from "react-icons/gi";

type Weapon = "pm" | "automat";

interface StartStopProps {
  started: boolean;
  handleStart: () => void;
  handleRestart: () => void;
  handleFinish: () => void;
  handleContinue: () => void;
  onWeaponChoose: (weapon: Weapon, count: number) => void;
}

const StartStop: React.FC<StartStopProps> = ({
  started,
  handleStart,
  handleRestart,
  handleFinish,
  handleContinue,
  onWeaponChoose,
}) => {
  const [openWeapon, setOpenWeapon] = useState<Weapon | null>(null);
  const [pmShots, setPmShots] = useState<number | null>(null);
  const [automatShots, setAutomatShots] = useState<number | null>(null);

  const handleToggle = (weapon: Weapon) => {
    setOpenWeapon((prev) => (prev === weapon ? null : weapon));
  };

  const handleBulletSelect = (weapon: Weapon, count: number) => {
    if (weapon === "pm") {
      setPmShots(count);
      setAutomatShots(null);
    } else {
      setAutomatShots(count);
      setPmShots(null);
    }
    onWeaponChoose(weapon, count);
    setOpenWeapon(null);
  };

  const handleReset = () => {
    setPmShots(null);
    setAutomatShots(null);
    setOpenWeapon(null);
    handleRestart();
  };

  const handleFinishClick = () => {
    setPmShots(null);
    setAutomatShots(null);
    setOpenWeapon(null);
    handleFinish();
  };

  const bulletOptions = {
    pm: Array.from({ length: 8 }, (_, i) => i + 1),
    automat: Array.from({ length: 30 }, (_, i) => i + 1),
  };

  return (
    <div className={styles.controlPanel}>
      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <div className={styles.optionGroup}>
            <div
              className={`${styles.optionItem} ${openWeapon === "pm" ? styles.active : ""}`}
              onClick={() => handleToggle("pm")}
            >
              <div className={styles.optionLabel}>
                <GiPistolGun size={22} />
                <span>{pmShots ? `${pmShots} ta` : "PM"}</span>
              </div>
              {openWeapon === "pm" && (
                <div className={styles.bulletCloud}>
                  {bulletOptions.pm.map((count) => (
                    <span
                      key={count}
                      className={`${styles.bulletItem} ${pmShots === count ? styles.active : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBulletSelect("pm", count);
                      }}
                    >
                      {count}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`${styles.optionItem} ${openWeapon === "automat" ? styles.active : ""}`}
              onClick={() => handleToggle("automat")}
            >
              <div className={styles.optionLabel}>
                <GiAk47 size={22} />
                <span>{automatShots ? `${automatShots} ta` : "Automat"}</span>
              </div>
              {openWeapon === "automat" && (
                <div className={styles.bulletCloud}>
                  {bulletOptions.automat.map((count) => (
                    <span
                      key={count}
                      className={`${styles.bulletItem} ${automatShots === count ? styles.active : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBulletSelect("automat", count);
                      }}
                    >
                      {count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.controlbuttons}>
          <button
            className={`${styles.button} ${styles.startButton}`}
            onClick={handleStart}
            disabled={started}
          >
            {started ? "Otilmoqda..." : "Boshlash"}
          </button>
          <button className={`${styles.button} ${styles.resetButton}`} onClick={handleReset}>
            Yangilash
          </button>
          <button
            className={`${styles.button} ${styles.finishButton}`}
            onClick={handleFinishClick}
          >
            Yakunlash
          </button>
          <button
            className={`${styles.button} ${styles.continueButton}`}
            onClick={handleContinue}
          >
            Davom etish
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartStop;
