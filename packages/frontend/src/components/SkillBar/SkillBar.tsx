import { ConsoleIcon } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import styles from "src/components/SkillBar/SkillBar.module.scss";
import { User } from "src/models/User";
import { useAuth } from "../../hooks/useAuth";
import { RANKENUM } from "../CustomProgressBar/CustomProgressBar";

export interface SkillBarInterface {
  skill: string;
}

export const SkillBar: React.FC<SkillBarInterface> = ({ skill }) => {
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>(auth?.user || undefined);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const [key, setKey] = useState<string>();

  useEffect(() => {
    getProgressBarWidth();
  }, [user]);

  useEffect(() => {
    if (auth?.user) {
      setUser({ ...auth?.user });
    }
  }, [auth?.user]);

  useEffect(() => {
    if (user && auth) {
      Object.keys(user).forEach((key) => {
        if (key.includes(skill.toLowerCase())) {
          setKey(key);
        }
      });
    }
  }, []);

  function getProgressBarWidth() {
    let value = 0;
    if (user) {
      if ((user[key as keyof User] as number) < RANKENUM.Apprentice) {
        //ep <= 1000
        value = 100 * ((user[key as keyof User] as number) / RANKENUM.Apprentice);
      } else if ((user[key as keyof User] as number) < RANKENUM.Savior) {
        //ep <= 5000
        value = 100 * ((user[key as keyof User] as number) / RANKENUM.Savior);
      } else {
        value = 100 * ((user[key as keyof User] as number) / RANKENUM.Super);
      }
    }
    setProgressBarWidth(value);
  }

  const className =
    user &&
    (user[key as keyof User] as number) &&
    (user[key as keyof User] as number) > RANKENUM.Savior
      ? "warning"
      : user &&
        (user[key as keyof User] as number) &&
        (user[key as keyof User] as number) > RANKENUM.Apprentice
      ? "info"
      : "success";

  const displayedValue = user && (
    <h3 className={styles.value}>{user[key as keyof User] as number}</h3>
  );

  return (
    <tr className={styles.container}>
      <td>
        <h3 className={styles.text}>{skill}</h3>
      </td>
      <td>
        <ProgressBar
          variant={className}
          className={styles.bar}
          now={progressBarWidth}
          animated
        />
      </td>
      <td>{displayedValue}</td>
    </tr>
  );
};
