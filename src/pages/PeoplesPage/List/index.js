import { useCallback, useEffect, useState } from "react";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import {
  API_PEOPLES,
  SWAPI_PARAM_PAGE,
  SWAPI_PARAM_SEARCH,
} from "@constants/api.js";
import { getPeopleId, getPeopleImage } from "@services/getData.js";
import PeopleCard from "@components/PeopleCard";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";
import Search from "@components/Search";

import styles from "./List.module.scss";
import { useSearchParams } from "react-router-dom";

function List({ setErrorApi }) {
  const [peoples, setPeoples] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const page = searchParams.get("page");

  const fetchPeoples = useCallback(
    async (search, page) => {
      const url =
        API_PEOPLES +
        "?" +
        new URLSearchParams({
          [SWAPI_PARAM_SEARCH]: search,
          [SWAPI_PARAM_PAGE]: page,
        }).toString();

      const res = await getApiResource(url);

      const peoplesList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url);
        const img = getPeopleImage(id);

        return { id, name, img };
      });

      setPrevPage(res.previous);
      setNextPage(res.next);

      setPeoples(peoplesList);

      if (res) {
        setErrorApi(false);
      } else {
        setErrorApi(true);
      }
    },
    [setErrorApi]
  );

  useEffect(() => {
    fetchPeoples(search, page);
  }, [page, search, fetchPeoples]);

  return (
    <div className={styles.page}>
      <h1>PEOPLE</h1>
      <div className={styles.search}>
        <Search placeholder={"Search..."} />
      </div>
      <ul className={styles.cards}>
        {peoples ? (
          peoples.length ? (
            peoples.map(({ id, name, img }) => {
              return <PeopleCard key={id} id={id} name={name} img={img} />;
            })
          ) : (
            <>NO RESULTS</>
          )
        ) : (
          <PlaceHolder />
        )}
      </ul>
      <PagesNavigation prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}

export default withErrorApi(List);
