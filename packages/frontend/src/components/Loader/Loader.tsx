import React from "react";
import LoaderSVG from "src/assets/Loader.svg";
import styles from "src/components/Loader/Loader.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <img src={LoaderSVG} alt={"Loading..."} />
    </div>
  );
};
