import React from "react";
import { Link } from "react-router-dom";
import styles from "./PeopleCard.module.scss";

function PeopleCard({ id, img, name }) {
  return (
    <li className={styles.card}>
      <Link to={"/peoples/" + id}>
        <img src={img} alt={name} />
        <h2>{name}</h2>
      </Link>
    </li>
  );
}

export default PeopleCard;
