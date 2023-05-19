import Button from "@components/Button";
import { Link } from "react-router-dom";

import styles from "./PagesNavigation.module.scss";

function PagesNavigation({ category, prevPage, nextPage, counter }) {
  return (
    <div className={styles.pageNavigation}>
      <Link
        to={
          prevPage
            ? `/${category}/?page=${Number(counter) - 1}`
            : `/${category}/?page=${Number(counter)}`
        }
      >
        <Button text="previous" disabled={!prevPage} />
      </Link>
      <Link
        to={
          nextPage
            ? `/${category}/?page=${Number(counter) + 1}`
            : `/${category}/?page=${Number(counter)}`
        }
      >
        <Button text="next" disabled={!nextPage} />
      </Link>
    </div>
  );
}

export default PagesNavigation;
