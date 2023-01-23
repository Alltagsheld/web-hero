import styles from "src/components/Logo/Logo.module.scss";
import ReactLogo from "src/assets/ReactLogo.png";
import { Container } from "react-bootstrap";

export const Logo: React.FC = () => {
  return (
    <Container className={styles.container}>
      <img src={ReactLogo} alt="reactLogo" />
      <div className={styles.textContainer}>
        <header>WEB HERO</header>
        <h1 className={styles.subHeader}>
          <span className={styles.highlight}>React</span> Testflight
        </h1>
      </div>
    </Container>
  );
};
