import styles from "src/layouts/Layout.module.scss";
import { ReactElement, useEffect } from "react";
import Superhero from "src/assets/superhero-silhouette.png";
import { useAuth } from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "src/components/CustomButton/CustomButton";
import { LevelProgress } from "src/components/LevelProgress/LevelProgress";
//icons
import Inventory from "src/assets/inventory.png";
import Skills from "src/assets/skills.png";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

export interface CustomButtonProps {
  icon?: string;
  label: string;
  action: () => void;
}

export interface StandardLayoutInterface {
  mainContent: ReactElement;
  customTitle?: string;
  customSubTitle?: string;
  showInventory?: boolean;
  showSkills?: boolean;
  withBackButton?: boolean;
  backButtonAction?: () => void;
  successBackground?: boolean;
  secondaryContent?: ReactElement;
  withContinueButton?: boolean;
  continueButtonAction?: () => void;
}

export const Layout: React.FC<StandardLayoutInterface> = ({
  mainContent,
  showInventory,
  showSkills,
  withBackButton,
  customTitle,
  customSubTitle,
  backButtonAction,
  successBackground,
  secondaryContent,
  withContinueButton,
  continueButtonAction,
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
    <CustomButton
      className={styles.skillButton}
      icon={Skills}
      action={() => navigate(`/${auth?.user?.id}/character`)}
    />
  );

  const backButton = withBackButton && backButtonAction && (
    <CustomButton className={styles.backButton} action={backButtonAction}>
      <ArrowLeft size={35} style={{ padding: "0" }} />
    </CustomButton>
  );

  const continueButton = withContinueButton && continueButtonAction && (
    <CustomButton className={styles.continueButton} action={continueButtonAction}>
      Continue with the story
      <ArrowRight size={30} style={{ padding: "0", marginLeft: "0.5em" }} />
    </CustomButton>
  );

  const className = successBackground ? styles.successContainer : styles.dayContainer;
  const level = auth?.user && <LevelProgress />;

  return (
    <div className={className}>
      <h1 className={styles.header}>{customTitle}</h1>
      <h3 className={styles.subHeader}>{customSubTitle}</h3>
      {level}
      <img className={styles.hero} src={Superhero} alt={"hero"} />
      {mainContent}
      <div className={styles.buttonContainer}>
        {inventoryButton}
        {skillButton}
      </div>
      {backButton}
      {continueButton}
    </div>
  );
};
