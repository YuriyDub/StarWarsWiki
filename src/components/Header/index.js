import NavButton from "@components/NavButton";
import Search from "@components/Search";
import Button from "@components/Button";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

function Header() {
  return (
    <header>
      <Link to="/" className={styles.logo}>
        <img src="./img/icons/death-star.png" alt="Logo" />
        <div className={styles.text}>
          <h3>
            <b>STARWARS</b>.Wiki
          </h3>
          <p>dictionary for jedies</p>
        </div>
      </Link>
      <div className={styles.navigation}>
        <NavButton text="Peoples" href={"/peoples/?page=1"} />
        <NavButton text="Ships" href={"/ships/?page=1"} />
        <NavButton text="Planets" href={"/planets/?page=1"} />
        <NavButton text="Films" href={"/films/?page=1"} />
      </div>
      <div className={styles.rightSide}>
        <Button imgUrl={"./img/icons/account.png"} />
      </div>
    </header>
  );
}

export default Header;
