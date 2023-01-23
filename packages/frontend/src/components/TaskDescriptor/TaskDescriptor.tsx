import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import styles from "src/components/TaskDescriptor/TaskDescriptor.module.scss";
import { Task } from "src/models/User";
import { useNavigate } from "react-router-dom";
import { updateTaskStatusById } from "src/actions/taskActions";
import { X } from "react-bootstrap-icons";
import { useState } from "react";

export interface DescriptorInterface {
  task: Task;
  triggerEndscreen: boolean;
  root?: ReactDOM.Root;
  redirect?: (root: ReactDOM.Root) => void;
  closeDescription?: () => void;
}

export const TaskDescriptor: React.FC<DescriptorInterface> = ({
  task,
  triggerEndscreen,
}) => {
  const navigate = useNavigate();
  const descriptorRef = useRef<any>();

  useEffect(() => {
    setup();
  }, [triggerEndscreen]);

  function setup() {
    appendToButtonGroup().then(() => {
      spawnChallengeDescription();
    });
  }

  async function redirect(root: ReactDOM.Root) {
    //closeDescription();
    root.unmount();
    console.log("should navigate");
    navigate(`/challenge-environment/${task.id}/success`);
  }

  async function appendToButtonGroup() {
    if (descriptorRef.current) {
      const elements = document.getElementsByClassName("sp-preview-actions");
      const buttonContainer = elements[0];
      buttonContainer.appendChild(descriptorRef.current);
    }
  }

  function spawnChallengeDescription() {
    const containerId = "descriptor";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", containerId);
      document.body.appendChild(container);
    }
    const root = ReactDOM.createRoot(container);
    root.render(
      <ChallengeDescription
        task={task}
        triggerEndscreen={triggerEndscreen}
        root={root}
        redirect={redirect}
      />
    );
  }

  return (
    <div
      className={styles.container}
      ref={descriptorRef}
      onClick={spawnChallengeDescription}
    >
      Challenge Description
    </div>
  );
};

const ChallengeDescription: React.FC<DescriptorInterface> = ({
  task,
  triggerEndscreen,
  root,
  redirect,
}) => {
  function closeDescription() {
    root && root.unmount();
  }

  const buttonClick =
    triggerEndscreen && redirect && root ? () => redirect(root) : closeDescription;

  const buttonText = triggerEndscreen ? "End the Challenge" : "close description";

  const bodyText = triggerEndscreen
    ? "Reacto successfully mastered this task."
    : task.description;

  const customClose = triggerEndscreen && (
    <X className={styles.customClose} color="red" size={45} onClick={closeDescription} />
  );

  return (
    <div className={styles.filterContainer}>
      <div className={styles.descriptionContainer}>
        {customClose}
        <Button className={styles.button} onClick={buttonClick}>
          {buttonText}
        </Button>
        <div className={styles.overlay}>
          <div className={styles.textContainer}>
            <h1>{task.title}</h1>
            <p>{bodyText}</p>
            <p><b>You can always open this description again.</b></p>
            <p><b>It is strongly advised to have a look at the given files to avoid any confusion.</b></p>
            <p><b>Given Test files cannot be edited and determine the success of this challenge.</b></p>
            <p>The entrypoint of this application is 'index.tsx'</p>
          </div>
        </div>
      </div>
    </div>
  );
};
