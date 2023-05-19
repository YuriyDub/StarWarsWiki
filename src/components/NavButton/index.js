import { NavLink } from "react-router-dom";
import styles from "./NavButton.module.scss";

function NavButton({ text, href }) {
  return (
    <NavLink className={styles.button} to={href}>
      <h2>{text}</h2>
    </NavLink>
  );
}

export default NavButton;
