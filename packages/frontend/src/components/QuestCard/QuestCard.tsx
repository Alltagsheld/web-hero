import styles from "src/components/QuestCard/QuestCard.module.scss";
import { Quest } from "src/models/User";

export interface QuestCardCardInterface {
  data: Quest;
  onClick: () => void;
  disabled?: boolean;
  finished: boolean;
}

export const QuestCard: React.FC<QuestCardCardInterface> = ({
  data,
  onClick,
  disabled,
  finished,
}) => {
  const className = disabled
    ? styles.disabled
    : finished
    ? styles.finished
    : styles.challengeCardContainer;

  const buttonClick = disabled ? () => {} : finished ? () => {} : onClick;
  return (
    <div className={className} onClick={buttonClick}>
      <h2>{data.title}</h2>
      <h3>{data.description}</h3>
    </div>
  );
};
