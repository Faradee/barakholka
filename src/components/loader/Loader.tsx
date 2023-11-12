import React from "react";
import styles from "./styles.module.css";
const Loader = () => {
  return (
    <div className={styles.loader + " my-5 flex w-full justify-center gap-x-2"}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
