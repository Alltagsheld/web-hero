import styles from "src/pages/LandingPage/LandingPage.module.scss";
import { Button } from "react-bootstrap";
import Superhero from "src/assets/superhero-silhouette.png";
import { Logo } from "src/components/Logo/Logo";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  function navigateTo() {
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <img className={styles.hero} src={Superhero} alt={"hero"} />
      <div className={styles.filter}>
        <Logo />
        <div className={styles.subContainer}>
          <h1 className={styles.react}>Your road to super.</h1>
          <CustomButton label={"Begin your journey"} action={navigateTo} />
        </div>
      </div>
    </div>
  );
};
