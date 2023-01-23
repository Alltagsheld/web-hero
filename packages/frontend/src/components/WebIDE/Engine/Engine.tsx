import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { saveTaskRepo } from "src/actions/taskActions";
import { Editor } from "src/components/WebIDE/Editor/Editor";
import styles from "src/components/WebIDE/Engine/Engine.module.scss";
import { formatTest } from "src/pages/Environment/prettier";
export interface EngineInterface {
  repository: any[];
}
export const Engine: React.FC<EngineInterface> = ({ repository }) => {
  const [language, setLanguage] = useState<string>("");
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { taskId } = useParams();

  useEffect(() => {
    const splitFileName = sandpack.activeFile.split(".");
    setLanguage(splitFileName[splitFileName.length - 1]);
  }, [sandpack.activeFile, setLanguage]);

  document.onkeydown = function (e) {
    let charCode = String.fromCharCode(e.which).toLowerCase();
    if((e.ctrlKey || e.metaKey) && charCode === 's') {
      e.preventDefault();
      updateCode(formatTest(code));
      saveRepoFiles();
    }
  };


  function saveRepoFiles() {
    if (taskId) {
      repository.forEach((file) => {
        file.content = getFileContentByName(file.fileName);
      });
      saveTaskRepo(repository);
    }
  }

  function getFileContentByName(fileName: string) {
    let content = "";
    Object.entries(sandpack.files).forEach(([key, value]) => {
      if (key.includes(fileName)) {
        content = value.code;
        return;
      }
    });
    return content;
  }

  return (
    <SandpackStack className={styles.engine} style={{ resize: "horizontal" }}>
      <FileTabs closableTabs />
      <div style={{ flex: 1, background: "#1e1e1e" }}>
        <Editor
          value={code}
          width="100%"
          height="100%"
          language={language}
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value: any) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
};
