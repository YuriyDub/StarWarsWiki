import NavButton from "@components/NavButton";
import Search from "@components/Search";
import Button from "@components/Button";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

function Header() {
  return (
    <header>
      <Link to="/" className={styles.logo}>
        <img src="/img/death-star.png" alt="Logo" />
        <div className={styles.text}>
          <h3>
            <b>STARWARS</b>.Wiki
          </h3>
          <p>dictionary for jedies</p>
        </div>
      </Link>
      <div className={styles.navigation}>
        <NavButton text="Peoples" href={"/peoples"} />
        <NavButton text="Ships" href={"/ships"} />
        <NavButton text="Planets" href={"/planets"} />
        <NavButton text="Films" href={"/films"} />
      </div>
      <div className={styles.rightSide}>
        <Search placeholder={"Search..."} />
        <Button imgUrl={"/img/icons/account.png"} />
      </div>
    </header>
  );
}

export default Header;
