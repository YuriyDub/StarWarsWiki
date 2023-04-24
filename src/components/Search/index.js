import styles from "./Search.module.scss";
import Button from "../Button";

function Search({ placeholder }) {
  return (
    <div className={styles.search}>
      <img src="/img/icons/search.png" alt="Search" />
      <input type="search" placeholder={placeholder}></input>
      <Button text={"Sent"} />
    </div>
  );
}

export default Search;
