import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_PLANETS, SWAPI_PARAM_PAGE } from "@constants/api.js";
import { getPlanetId, getPlanetImage, getPageId } from "@services/getData.js";
import PlanetCard from "@components/PlanetCard";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";
import { SWAPI_PARAM_SEARCH } from "../../../constants/api";
import Search from "../../../components/Search";

function List({ setErrorApi }) {
  const [planets, setPlanets] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const page = searchParams.get("page");

  const fetchPlanets = useCallback(
    async (search, page) => {
      const url =
        API_PLANETS +
        "?" +
        new URLSearchParams({
          [SWAPI_PARAM_SEARCH]: search,
          [SWAPI_PARAM_PAGE]: page,
        }).toString();

      const res = await getApiResource(url);

      const planetsList = res.results.map(({ name, url }) => {
        const id = getPlanetId(url);
        const img = getPlanetImage(id);

        return { id, name, img };
      });

      setPrevPage(res.previous);
      setNextPage(res.next);

      setPlanets(planetsList);

      if (res) {
        setErrorApi(false);
      } else {
        setErrorApi(true);
      }
    },
    [setErrorApi]
  );

  useEffect(() => {
    fetchPlanets(search, page);
  }, [page, search, fetchPlanets]);

  if (!planets) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <h1>PLANETS</h1>
      <div className={styles.search}>
        <Search placeholder={"Search..."} />
      </div>
      <ul className={styles.cards}>
        {planets ? (
          planets.length ? (
            planets.map(({ id, name, img }) => {
              return <PlanetCard key={id} id={id} name={name} img={img} />;
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
