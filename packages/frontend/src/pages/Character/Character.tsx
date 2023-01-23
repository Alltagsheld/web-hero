import { SkillBar } from "src/components/SkillBar/SkillBar";
import { Layout } from "src/layouts/Layout";
import { useAuth } from "../../hooks/useAuth";
import styles from "src/pages/Character/Character.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "src/models/User";
import { getBadgeImage } from "src/utils/getBadge";

export const Character: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const ProgressBars = (
    <>
      <SkillBar skill="typescript" />
      <SkillBar skill="css" />
      <SkillBar skill="html" />
      <SkillBar skill="test" />
      <SkillBar skill="git" />
    </>
  );

  function backToBase() {
    navigate(`/${auth?.user?.id}/ark-board`);
  }

  const Title = auth?.user?.name;

  const UserBadges = auth?.user?.badges.map((badge) => {
    return <UserBadge badge={badge} src={getBadgeImage(badge.name)} alt="badge" />;
  });

  return (
    <Layout
      customTitle={Title}
      mainContent={
        <div className={styles.container}>
          <div className={styles.badgesContainer}>{UserBadges}</div>
          <table className={styles.barContainer}>{ProgressBars}</table>
        </div>
      }
      withBackButton
      backButtonAction={backToBase}
    />
  );
};

interface BadgeProps {
  src: string;
  alt: string;
  badge: Badge;
}
const UserBadge: React.FC<BadgeProps> = ({ src, alt, badge }) => {
  console.log(badge.description);
  const [displayTooltip, setDisplayToolTip] = useState<boolean>(false);

  function onMouseOver() {
    setDisplayToolTip(true);
  }
  function onMouseOut() {
    setDisplayToolTip(false);
  }

  const ToolTip = displayTooltip && (
    <div className={styles.tooltip}>
      <h3>{badge.name}</h3>
      <p>{badge.description}</p>
    </div>
  );
  return (
    <div>
      <img
        className={styles.badge}
        src={src}
        alt={alt}
        height="60px"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />
      <div>{ToolTip}</div>
    </div>
  );
};
