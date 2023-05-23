import Button from "@components/Button";
import { useSearchParams } from "react-router-dom";
import { SWAPI_PARAM_SEARCH, SWAPI_PARAM_PAGE } from "../../constants/api";

import styles from "./PagesNavigation.module.scss";

function PagesNavigation({ prevPage, nextPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={styles.pageNavigation}>
      <Button
        text="previous"
        disabled={!prevPage}
        onClick={() => {
          setSearchParams({
            search: searchParams.get(SWAPI_PARAM_SEARCH) ?? "",
            page: parseInt(searchParams.get(SWAPI_PARAM_PAGE)) - 1,
          });
        }}
      />

      <Button
        text="next"
        disabled={!nextPage}
        onClick={() => {
          setSearchParams({
            search: searchParams.get(SWAPI_PARAM_SEARCH) ?? "",
            page: parseInt(searchParams.get(SWAPI_PARAM_PAGE)) + 1,
          });
        }}
      />
    </div>
  );
}

export default PagesNavigation;
