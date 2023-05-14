import React from "react";
import styles from "./PlaceHolder.module.scss";

function PlaceHolder() {
  return (
    <div className={styles.loader}>
      <h2>Loading</h2>
      <img src="/img/icons/loading.png" alt="LoadImage" />
    </div>
  );
}

export default PlaceHolder;
