import React from "react";
import styles from "./PlaceHolder.module.scss";
import loadImage from "@icons/loading.png";

function PlaceHolder() {
  return (
    <div className={styles.loader}>
      <h2>Loading</h2>
      <img src={loadImage} alt="LoadImage" />
    </div>
  );
}

export default PlaceHolder;
