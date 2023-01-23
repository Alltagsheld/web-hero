import {
  ColumnDirective,
  ColumnsDirective,
  KanbanComponent,
} from "@syncfusion/ej2-react-kanban";
import { ReactElement, useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { getTasksByQuestId } from "src/actions/taskActions";
import styles from "src/components/Board/Board.module.scss";
import { Label, Task, TaskResponse } from "src/models/User";
import "./Kanban.scss";

export const Board = () => {
  let currentTask: Task | null;
  const [openTasks, setOpenTasks] = useState<Task[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const { challengeId } = useParams();

  useEffect(() => {
    challengeId &&
      getTasksByQuestId(challengeId).then((response) => {
        const doneTasks: Task[] = [];
        const notFinishedTasks: Task[] = [];
        response.forEach((task: TaskResponse) => {
          if (task.status === "Done") {
            doneTasks.push({
              ...task,
              labels: reduceToStringArray(task.labels),
            });
          } else {
            notFinishedTasks.push({
              ...task,
              labels: reduceToStringArray(task.labels),
            });
          }
        });
        setOpenTasks(notFinishedTasks);
        setFinishedTasks(doneTasks);
      });
  }, []);

  function reduceToStringArray(labels: Label[]): string[] {
    const reduced: string[] = [];
    labels.forEach((label) => {
      reduced.push(label.value);
    });
    return reduced;
  }

  const CardToolTip = (data: any): ReactElement => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <b>Status</b>
              </td>
              <td>{data.status}</td>
            </tr>
            <tr>
              <td>
                <b>Storypoints</b>
              </td>
              <td>{data.estimation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  async function onActionBegin(data: any) {
    currentTask = await JSON.parse(JSON.stringify(data.changedRecords[0]));
  }

  function onActionComplete(data: any) {
    if (currentTask?.status === data.changedRecords[0].status) {
      currentTask = null;
    } else if (data.changedRecords[0].status === "In Progress") {
      //open up the webIDE
      navigate(`/challenge-environment/${data.changedRecords[0]?.id}`);
    }
  }

  function dialogOpen(args: any) {
    args.cancel = true;
  }

  return (
    <div className={styles.container}>
      <KanbanComponent
        dataSource={openTasks}
        keyField={"status"}
        cardSettings={{
          contentField: "shortDescription",
          headerField: "title",
          tagsField: "labels",
        }}
        enableTooltip
        tooltipTemplate={CardToolTip}
        className={styles.firstKanban}
        actionComplete={onActionComplete}
        actionBegin={onActionBegin}
        dialogOpen={dialogOpen}
      >
        <ColumnsDirective>
          <ColumnDirective headerText={"To Do"} keyField={"To Do"}></ColumnDirective>
          <ColumnDirective
            headerText={"In Progress"}
            keyField={"In Progress"}
          ></ColumnDirective>
        </ColumnsDirective>
      </KanbanComponent>
      <KanbanComponent
        dataSource={finishedTasks}
        keyField={"status"}
        cardSettings={{
          contentField: "shortDescription",
          headerField: "title",
          tagsField: "labels",
        }}
        enableTooltip
        tooltipTemplate={CardToolTip}
        className={styles.secondKanban}
        actionComplete={onActionComplete}
        dialogOpen={dialogOpen}
        allowDragAndDrop={false}
      >
        <ColumnsDirective>
          <ColumnDirective headerText={"Done"} keyField={"Done"}></ColumnDirective>
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};
