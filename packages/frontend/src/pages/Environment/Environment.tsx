import {
  SandpackConsole,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackTests,
} from "@codesandbox/sandpack-react";
import { Engine } from "src/components/WebIDE/Engine/Engine";
import { Spec } from "@codesandbox/sandpack-react/dist/types/components/Tests/Specs";
import { useParams, useNavigate } from "react-router-dom";
import styles from "src/pages/Environment/Environment.module.scss";
import { useState, useEffect } from "react";
import { Folder } from "react-bootstrap-icons";
import { getTaskFiles, updateTaskStatusById } from "src/actions/taskActions";
import { Repo, Test } from "src/models/User";
import { format, formatTest } from "./prettier";
import { ReactIDE } from "src/pages/Environment/ReactIDE/ReactIDE";
import { TaskDescriptor } from "src/components/TaskDescriptor/TaskDescriptor";

export const Environment: React.FC = () => {
  const { taskId } = useParams();
  const [testFiles, setTestFiles] = useState<any>();
  const [repository, setRepository] = useState<any>();
  const [repositoryResponse, setRepositoryResponse] = useState<any[]>([]);
  const [task, setTask] = useState<any>();
  const [triggerEndscreen, setTriggerEndscreen] = useState<boolean>(false);

  useEffect(() => {
    if (taskId) {
      getTaskFiles(taskId).then((response) => {
        createTestFiles(response.testFiles);
        setRepositoryResponse(response.repoFiles);
        createRepository(response.repoFiles);
        setTask(response);
      });
    }
  }, [taskId]);

  function createTestFiles(tests: Test[]) {
    const testFiles: any = {};
    tests.forEach((test) => {
      testFiles[`${test.fileName}`] = {
        code: formatTest(test.content),
        hidden: true,
        readonly: true,
      };
    });
    setTestFiles(testFiles);
  }
  function createRepository(repository: Repo[]) {
    const repoFiles: any = {};
    repository.forEach((file) => {
      if (file.fileName.includes("App.tsx")) {
        repoFiles[`${file.fileName}`] = {
          code: format(file.content, file.fileName),
          hidden: false,
        };
      } else if (file.fileName.includes("index.tsx")) {
        repoFiles[`${file.fileName}`] = {
          code: format(file.content, file.fileName),
          hidden: false,
        };
      } else {
        repoFiles[`${file.fileName}`] = {
          code: format(file.content, file.fileName),
          hidden: true,
        };
      }
    });
    setRepository(repoFiles);
  }

  const React = repository && (
    <ReactIDE
      repoResponse={repositoryResponse}
      repository={repository}
      testFiles={testFiles}
    >
      <SandpackLayout className={styles.container}>
        <div className={styles.topPane} id="topPane">
          <SideBar />
          <Engine repository={repositoryResponse} />
          <SandpackPreview className={styles.preview} showSandpackErrorOverlay={false} />
          <TaskDescriptor task={task} triggerEndscreen={triggerEndscreen} />
        </div>
        <BottomPane triggerEndscreenStateChange={setTriggerEndscreen} />
      </SandpackLayout>
    </ReactIDE>
  );

  return React ?? <div>error loading IDE</div>;
};

interface BottomPaneProps {
  triggerEndscreenStateChange: (value: boolean) => void;
}
export const BottomPane: React.FC<BottomPaneProps> = ({
  triggerEndscreenStateChange,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  function onTestsComplete(specs: Record<string, Spec>) {
    Object.values(specs).forEach((testFile) => {
      if (
        didAllDescribesSucceed(testFile.describes) &&
        Object.keys(testFile.describes).length > 0
      ) {
        triggerEndscreenStateChange(true);
      }
    });
  }

  function didAllDescribesSucceed(describe: any) {
    let allDescribesSucceeded = true;
    Object.values(describe).forEach((describe: any) => {
      if (!didTestSucceed(describe.tests)) {
        allDescribesSucceeded = false;
      }
    });
    return allDescribesSucceeded;
  }

  function didTestSucceed(test: any): boolean {
    let testSucceeded = true;
    Object.values(test).forEach((test: any) => {
      if (Object.keys(test).length === 0 || test.status === "fail" ) {
        testSucceeded = false;
      }
    });
    return Object.keys(test).length > 0 ? testSucceeded : false;
  }

  useEffect(() => {
    const topPane = document.getElementById("topPane");
    if (expanded && topPane) {
      topPane.style.height = "60%";
    } else if (topPane) {
      topPane.style.height = "95%";
    }
  });

  return (
    <SandpackLayout className={styles.bottomPane}>
      {
      /*<SandpackConsole
        showSyntaxError
        showHeader
        onClick={() => setExpanded(!expanded)}
        className={styles.console}
      />*/
      }
      <SandpackTests
        onComplete={onTestsComplete}
        onClick={() => setExpanded(!expanded)}
        className={styles.tests}
      />
    </SandpackLayout>
  );
};

export const SideBar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const topPane = document.getElementById("sideBar");
    if (expanded && topPane) {
      topPane.style.height = "60%";
    } else if (topPane) {
      topPane.style.height = "95%";
    }
  });

  const Explorer = expanded && (
    <>
      <SandpackFileExplorer />
    </>
  );

  return (
    <div className={styles.sideBar} id="sideBar" style={{ cursor: "pointer" }}>
      <Folder
        size={20}
        style={{ margin: "0.6em", marginTop: "0.9em", transition: "0.35s" }}
        color="white"
        onClick={() => setExpanded(!expanded)}
      />
      {Explorer}
    </div>
  );
};
