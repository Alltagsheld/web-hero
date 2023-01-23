import styles from "src/layouts/Layout.module.scss";
import { useEffect } from "react";
import Superhero from "src/assets/superhero-silhouette.png";
import { useAuth } from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import { LevelProgress } from "src/components/LevelProgress/LevelProgress";
//icons
import Inventory from "src/assets/inventory.png";
import Skills from "src/assets/skills.png";
import { ArrowLeft } from "react-bootstrap-icons";
import { StandardLayoutInterface } from "./Layout";

export interface User {
  ep: number;
  name: string;
  id: string;
}

const mockUser: User = {
  ep: 6000,
  name: "",
  id: "",
};

export const ChallengeLayout: React.FC<StandardLayoutInterface> = ({
  mainContent,
  showInventory,
  showSkills,
  withBackButton,
  customTitle,
  backButtonAction,
  customSubTitle,
}) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isSignUpError || !auth?.isLoggedIn) {
      navigate("/");
    }
  }, [auth, navigate]);

  const inventoryButton = showInventory && (
    <CustomButton icon={Inventory} action={() => console.log("inventory")} />
  );

  const skillButton = showSkills && (
    <CustomButton icon={Skills} action={() => console.log("skills")} />
  );

  const backButton = withBackButton && backButtonAction && (
    <CustomButton className={styles.backButton} action={backButtonAction}>
      <ArrowLeft size={35} style={{ padding: "0" }} />
    </CustomButton>
  );

  const level = auth?.user && <LevelProgress />;

  return (
    <div className={styles.nightContainer}>
      <h1 className={styles.header}>{customTitle}</h1>
      <h3 className={styles.subHeader}>{customSubTitle}</h3>
      {level}
      <div className={styles.challengeBoard}>{mainContent}</div>
      <div className={styles.buttonContainer}>
        {inventoryButton}
        {skillButton}
      </div>
      {backButton}
    </div>
  );
};
