import React from "react";
import { Link } from "react-router-dom";
import styles from "./ShipCard.module.scss";

function ShipCard({ id, img, name }) {
  return (
    <li className={styles.card}>
      <Link to={"/ships/" + id}>
        <img src={img} alt={name} />
        <h2>{name}</h2>
      </Link>
    </li>
  );
}

export default ShipCard;
