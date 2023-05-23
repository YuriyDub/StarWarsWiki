import styles from "./Search.module.scss";
import { SWAPI_PARAM_SEARCH } from "../../constants/api";
import { useSearchParams } from "react-router-dom";

function Search({ placeholder }) {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={styles.search}>
      <img src="/img/icons/search.png" alt="Search" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchParams.get(SWAPI_PARAM_SEARCH) ?? ""}
        onChange={(e) => {
          setSearchParams({
            page: 1,
            search: e.currentTarget.value,
          });
        }}
      />
    </div>
  );
}

export default Search;
