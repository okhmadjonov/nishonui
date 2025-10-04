import styles from "./Header.module.scss";
import { PiPhoneCallLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { dispatch } from "@/rudex";
import localStorageHelper from "@/utils";


function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch.auth.logoutAsync?.();
    localStorageHelper.removeItem("auth");
    localStorageHelper.removeItem("userData");
    localStorageHelper.removeItem("language");
    localStorageHelper.removeItem("isRefresh");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}> Harbiy Tuzulmalar Faoliyatini Ta'minlash Boshqarmasi</div>
      <div className={styles.rightSection}>
        <div className={styles.callCenter}>
          (71) 000 - 00 - 00
        </div>
        <div className={styles.language}>O'z</div>
        <div className={styles.logout} onClick={handleLogout}>
          Chiqish
        </div>
      </div>
    </header>
  );
}

export default Header;
