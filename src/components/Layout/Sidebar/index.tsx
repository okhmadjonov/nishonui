import styles from "./Sidebar.module.scss";
import target from "../../../assets/img/ng.png";
import { useState } from "react";
import { LuChevronRight, LuChevronDown } from "react-icons/lu";
import { menuItems } from "@/constants/menu";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMenu = (name: string, hasChildren: boolean, path?: string) => {
    if (path) navigate(path);
    if (hasChildren) {
      setOpenMenu((prev) => (prev === name ? null : name));
    } else {
      setOpenMenu(null);
    }
  };

  const handleSubClick = (path: string) => {
    navigate(path);
    setOpenMenu(null);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.menuWrapper}>
          <div className={styles.sidebarHeader}>
            <div
              className={styles.sidebarLogoWrapper}
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.logoWrapper}>
                <img src={target} alt="target" />
              </div>
            </div>
          </div>

          <div className={styles.menuContainer}>
            {menuItems.map((item) => {
              const hasChildren =
                Array.isArray(item.children) && item.children.length > 0;
              const isOpen = openMenu === item.name;

              return (
                <div key={item.name} className={styles.menuItem}>
                  <div
                    className={styles.menuTitle}
                    onClick={() =>
                      toggleMenu(item.name, hasChildren, item.path)
                    }
                  >
                    <span className={styles.icon}>
                      {item.icon}
                      <span>{item.name}</span>
                    </span>

                    <span className={styles.chevron}>
                      {hasChildren ? (
                        isOpen ? (
                          <LuChevronDown />
                        ) : (
                          <LuChevronRight />
                        )
                      ) : (
                        <LuChevronRight />
                      )}
                    </span>
                  </div>

                  {hasChildren && (
                    <div
                      className={`${styles.subMenu} ${isOpen ? styles.open : ""
                        }`}
                    >
                      {item.children!.map((sub) => (
                        <div
                          key={sub.name}
                          className={styles.subMenuItem}
                          onClick={() => handleSubClick(sub.path)}
                          style={{ cursor: "pointer" }}
                        >
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
