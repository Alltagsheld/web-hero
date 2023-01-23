import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage, langs } from '@uiw/codemirror-extensions-langs';
import styles from "src/components/WebIDE/Editor/Editor.module.scss";
import { useEffect, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Regex } from "react-bootstrap-icons";

export const Editor = (props) => {
  const { language, value, onChange} = props;
  const [extension, setExtension] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const { sandpack } = useSandpack();
  
  function handleChange(value, viewUpdate) {
    setTimeout(onChange(value), 2000);
  }

  useEffect(() => {
    setExtension(getExtension(language));
  }, [language])

  useEffect(() => {
    fileNameMatchesRegExpression()
  }, [sandpack.activeFile])

  function getExtension(language) {
    let extension;
    switch (language) {
      case "js": {
        loadLanguage('javascript');
        extension = [langs.javascript()];
        break;
      }
      case "tsx": {
        loadLanguage('tsx');
        extension = [langs.tsx()];
        break;
      }
      case "ts": {
        loadLanguage('typescript');
        extension = [langs.typescript()];
        break;
      }
      case "css": {
        loadLanguage('css');
        extension = [langs.css()];
        break;
      }
      case "scss": {
        loadLanguage('scss');
        extension = [langs.sass()];
        break;
      }
      case "html": {
        loadLanguage('html');
        extension = [langs.html()]
        break;
      }
      default: {
        loadLanguage('javascript');
        extension = [langs.javascript()];
        break;
      }
    }
    return extension;
  }

  function fileNameMatchesRegExpression() {
    let fileIsReadOnly = false;
    const regEx = /.challenge.(test|spec)\.[tj]sx?$/;
    if (regEx.test(sandpack.activeFile)) {
      fileIsReadOnly = true;
    }
    fileIsReadOnly = false;
    setReadOnly(fileIsReadOnly);
  }


  return (
    <div style={{fontFamily: "Arial, monospace", fontSize: "16px", height: "100%"}}>
      <CodeMirror
        value={value}
        height="200px"
        extensions={extension}
        onChange={handleChange}
        theme={"dark"}
        className={styles.codeMirrorWrapper}
        basicSetup={true}
        minHeight="100%"
        minWidth="100%"
        readOnly={readOnly}
      />
    </div>
  );
};
