import { useEffect, useState } from "react";
import styles from "./CustomProgressBar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Label, User } from "src/models/User";
import { ProgressBar } from "react-bootstrap";

export enum RANKENUM {
  Apprentice = 8000,
  Savior = 15000,
  Super = 30000,
}

export interface ProgressBarProps {
  amountOfLabels: number;
  label: Label;
  gainedEp: number;
}

export const CustomProgressBar: React.FC<ProgressBarProps> = ({
  amountOfLabels,
  label,
  gainedEp,
}) => {
  const [updatedKey, setUpdatedKey] = useState<string>();
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>(auth?.user || undefined);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

  useEffect(() => {
    getProgressBarWidth();
  }, [user]);

  useEffect(() => {
    if (auth?.user) {
      setUser({ ...auth.user });
      Object.keys(auth.user).forEach((key) => {
        if (key.includes(label.value.toLowerCase())) {
          setUpdatedKey(key);
        }
      });
    }
  }, [auth?.user]);

  function getProgressBarWidth() {
    if (user && updatedKey) {
      let value = 0;
      if ((user[updatedKey as keyof User] as number) < RANKENUM.Apprentice) {
        //ep <= 1000
        value = 100 * ((user[updatedKey as keyof User] as number) / RANKENUM.Apprentice);
      } else if ((user[updatedKey as keyof User] as number) < RANKENUM.Savior) {
        //ep <= 5000
        value = 100 * ((user[updatedKey as keyof User] as number) / RANKENUM.Savior);
      } else {
        value = 100 * ((user[updatedKey as keyof User] as number) / RANKENUM.Super);
      }
      setProgressBarWidth(value);
    }
  }

  const className =
    user &&
    (user[updatedKey as keyof User] as number) &&
    (user[updatedKey as keyof User] as number) > RANKENUM.Savior
      ? "warning"
      : user &&
        (user[updatedKey as keyof User] as number) &&
        (user[updatedKey as keyof User] as number) > RANKENUM.Apprentice
      ? "info"
      : "success";

  const value = user && `+${(gainedEp / amountOfLabels).toFixed(0)}`;
  return (
    <div className={styles.container}>
      <h3 className={styles.text}>{label.value}</h3>
      <ProgressBar
        variant={className}
        className={styles.bar}
        now={progressBarWidth}
        animated
      />
      <h3>{value}</h3>
    </div>
  );
};
