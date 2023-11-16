import React from "react";
import styles from "./styles.module.css";
const Loader = () => {
  return (
    <div
      className={
        styles.loader +
        " absolute z-50 flex h-full w-full items-center justify-center"
      }
    >
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
