import styles from "./Footer.module.scss";

const Footer = () => {
  const uzbekDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tashkent",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <footer className={styles.footer}>
      <span>© {uzbekDate}. IIV HTFTB</span>
    </footer>
  );
};

export default Footer;
