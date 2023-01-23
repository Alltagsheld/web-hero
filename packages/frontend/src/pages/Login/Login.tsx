import { LoginCard } from "src/components/LoginCard/LoginCard";
import styles from "src/pages/Login/Login.module.scss";

export const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filter} />
      <h2 className={styles.header}>Time to be a hero.</h2>
      <LoginCard />
    </div>
  );
};
