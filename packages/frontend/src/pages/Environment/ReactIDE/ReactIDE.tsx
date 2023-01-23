import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import styles from "src/pages/Environment/Environment.module.scss";
import { ReactElement } from "react";

export interface IDEprops {
  repoResponse: any[];
  repository: any;
  testFiles: any;
  children: ReactElement;
}

export const ReactIDE: React.FC<IDEprops> = ({
  repoResponse,
  repository,
  testFiles,
  children,
}) => {
  return (
    repository && (
      <SandpackProvider
        files={{
          ...repository,
          ...testFiles,
        }}
        theme="dark"
        customSetup={{
          entry: "/src/index.tsx",
          environment: "create-react-app",
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
            "react-scripts": "^5.0.1",
            typescript: "^4.9.4",
            "react-router-dom": "^6.4.5",
            "react-bootstrap": "2.7.0",
            bootstrap: "5.2.3",
            "@types/react": "^18.0.26",
            "@types/react-dom": "^18.0.9",
            "@types/react-router-dom": "^5.3.3",
            "@testing-library/jest-dom": "^5.11.4",
            "@testing-library/react": "^11.1.0",
            "@testing-library/react-hooks": "^3.4.2",
            "@testing-library/user-event": "^13.3.0",
          },
        }}
        className={styles.spWrapper}
      >
        {children}
      </SandpackProvider>
    )
  );
};
