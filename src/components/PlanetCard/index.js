import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlanetCard.module.scss";

function PlanetCard({ img, name }) {
  return (
    <li className={styles.card}>
      <Link>
        <img src={img} alt={name} />
        <h2>{name}</h2>
      </Link>
    </li>
  );
}

export default PlanetCard;
