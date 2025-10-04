import "@xyflow/react/dist/style.css";
import styles from "./Home.module.scss";

const steps = [
  {
    id: 1, text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.` },
  {
    id: 2, text: `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.` },
  {
    id: 3, text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.` },
  {
    id: 4, text: `Duis aute irure dolor in reprehenderit in voluptate. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Velit esse cillum dolore.` },
  {
    id: 5, text: `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.` },
];

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Qo'llanma:</h1>
      <div className={styles.steps}>
        {steps.map((step) => (
          <div key={step.id} className={styles.step}>
            <div className={styles.circle}>{step.id}</div>
            <div className={styles.text}>{step.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
