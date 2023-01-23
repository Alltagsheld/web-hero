import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuests } from "src/actions/questActions";
import { QuestCard } from "src/components/QuestCard/QuestCard";
import { useAuth } from "src/hooks/useAuth";
import { Quest } from "src/models/User";

export const QuestSelection: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    getAllQuests().then((response) => {
      setQuests(response);
    });
  }, []);

  function openChallengeBoard(quest: Quest) {
    if (auth?.user) {
      navigate(`/${auth?.user.id}/${quest.title}/${quest.id}/questBoard`);
    }
  }

  const customTitle = <h2>The world needs you. what are you fighting for today?</h2>;
  const challengeCards =
    quests &&
    quests.map((quest, key) => {
      return (
        <QuestCard
          key={key}
          data={quest}
          onClick={() => openChallengeBoard(quest)}
          finished={quest.finishedAt !== null}
        />
      );
    });
  return (
    <div>
      {customTitle}
      {challengeCards}
    </div>
  );
};
