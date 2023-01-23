import { Board } from "src/components/Board/Board";
import { ChallengeLayout } from "src/layouts/ChallengeLayout";
import styles from "src/pages/TaskOverview/TaskOverview.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export const TaskOverview: React.FC = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  function navigateToHeroBase() {
    if (auth?.user) {
      navigate(`/${auth.user.id}/ark-board`);
    }
  }

  return (
    <ChallengeLayout
      mainContent={<Board />}
      customTitle={title}
      withBackButton
      backButtonAction={navigateToHeroBase}
      customSubTitle={"- Mission Board -"}
    />
  );
};
