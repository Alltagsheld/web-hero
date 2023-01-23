import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import styles from "src/components/LevelProgress/LevelProgress.module.scss";
import { User } from "src/models/User";
import { useAuth } from "../../hooks/useAuth";

export enum RANKENUM {
  Apprentice = 5000,
  Savior = 12500,
  Super = 20000,
}

export const LevelProgress: React.FC = () => {
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>(auth?.user || undefined);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

  useEffect(() => {
    getProgressBarWidth();
  }, [user]);

  useEffect(() => {
    if (auth?.user) {
      setUser({ ...auth?.user });
    }
  }, [auth?.user]);

  function getProgressBarWidth() {
    let value = 0;
    if (user) {
      if (user.totalEp < RANKENUM.Apprentice) {
        //ep <= 1000
        value = 100 * (user.totalEp / RANKENUM.Apprentice);
      } else if (user.totalEp < RANKENUM.Savior) {
        //ep <= 5000
        value = 100 * (user.totalEp / RANKENUM.Savior);
      } else {
        value = 100 * (user.totalEp / RANKENUM.Super);
      }
    }
    setProgressBarWidth(value);
  }

  const className =
    auth?.user && auth.user.totalEp > RANKENUM.Savior
      ? "warning"
      : auth?.user && auth.user.totalEp > RANKENUM.Apprentice
      ? "info"
      : "success";

  function getUserRank(): string {
    let returnValue = "";
    if (user && user.totalEp < RANKENUM.Apprentice) {
      returnValue = RANKENUM[RANKENUM.Apprentice];
    } else if (user && user.totalEp < RANKENUM.Savior) {
      returnValue = RANKENUM[RANKENUM.Savior];
    } else returnValue = RANKENUM[RANKENUM.Super];

    return returnValue;
  }

  const value = user && user.totalEp;

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h3>EP {value}</h3>
        <h3>{getUserRank()}</h3>
      </div>
      <ProgressBar
        variant={className}
        className={styles.bar}
        now={progressBarWidth}
        animated
      />
    </div>
  );
};
