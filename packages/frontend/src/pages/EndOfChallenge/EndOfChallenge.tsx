import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTaskStatusById } from "src/actions/taskActions";
import { CustomProgressBar } from "src/components/CustomProgressBar/CustomProgressBar";
import { spawnCustomToast } from "src/components/CustomToast/CustomToast";
import { Layout } from "src/layouts/Layout";
import { Badge, TaskResponse } from "src/models/User";
import styles from "src/pages/EndOfChallenge/EndOfChallenge.module.scss";
import { getBadgeImage } from "src/utils/getBadge";
import { useAuth } from "src/hooks/useAuth";

export const EndOfChallenge: React.FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [task, setTask] = useState<TaskResponse>();

  useEffect(() => {
    taskId &&
      !task &&
      updateTaskStatusById(taskId, "Done")
        .then((response) => {
          auth?.refetchUser();
          if (response.earnedBadges.length > 0) {
            response.earnedBadges.forEach((badge: Badge) => {
              spawnCustomToast({
                mode: "success",
                message: badge.description,
                showForMs: 5000,
                withImage: getBadgeImage(badge.name),
              });
            });
          }
        })
        .then(() =>
          getTaskById(taskId).then((response) => {
            setTask(response);
            console.log(response);
          })
        );
  }, [taskId]);

  const Bar = task?.labels.map((label, key) => {
    return (
      <CustomProgressBar
        amountOfLabels={task.labels.length}
        gainedEp={task.gainedEP}
        label={label}
        key={key}
      />
    );
  });

  const Bars = task?.labels && (
    <div className={styles.container}>
      <div className={styles.barContainer}>{Bar}</div>
    </div>
  );

  function redirect() {
    if (task && task.quest.finishedAt === null && auth?.user) {
      navigate(`/${auth?.user.id}/${task.quest.title}/${task.quest.id}/questBoard`);
    } else if (auth?.user) {
      navigate(`/${auth?.user.id}/ark-board`);
    }
  }

  return (
    <Layout
      customTitle={task?.title}
      customSubTitle={"- Mission Success -"}
      mainContent={<>{Bars}</>}
      successBackground
      withContinueButton
      continueButtonAction={redirect}
    />
  );
};
