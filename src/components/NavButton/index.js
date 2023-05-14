import { Link } from "react-router-dom";
import styles from "./NavButton.module.scss";

function NavButton({ text, href }) {
  return (
    <Link className={styles.button} to={href}>
      <h2>{text}</h2>
    </Link>
  );
}

export default NavButton;
