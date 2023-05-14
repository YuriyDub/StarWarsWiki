import React from "react";
import { Link } from "react-router-dom";
import styles from "./FilmCard.module.scss";

function FilmCard({ id, img, title }) {
  return (
    <li className={styles.card}>
      <Link to={"/films/" + id}>
        <img src={img} alt={title} />
        <h2>{title}</h2>
      </Link>
    </li>
  );
}

export default FilmCard;
