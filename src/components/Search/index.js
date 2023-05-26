import { SWAPI_PARAM_SEARCH } from "../../constants/api";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Button from "@components/Button";

import styles from "./Search.module.scss";
import { memo, useEffect, useState } from "react";

function Search({ placeholder }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get(SWAPI_PARAM_SEARCH) ?? ""
  );

  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (searchParams.get(SWAPI_PARAM_SEARCH) === debouncedSearchValue) return;
    setSearchParams({
      page: 1,
      search: debouncedSearchValue,
    });
  }, [setSearchParams, debouncedSearchValue]);

  return (
    <form className={styles.search}>
      <img src="./img/icons/search.png" alt="Search" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.currentTarget.value);
        }}
      />
      <Button
        text="🞩"
        type="button"
        onClick={() => {
          setSearchValue("");
        }}
      />
    </form>
  );
}

export default memo(Search);
