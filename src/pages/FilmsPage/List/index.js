import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import {
  API_FILMS,
  SWAPI_PARAM_PAGE,
  SWAPI_PARAM_SEARCH,
} from "@constants/api.js";
import { getFilmId, getFilmImage } from "@services/getData.js";
import FilmCard from "@components/FilmCard/index.js";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";
import Search from "../../../components/Search";

function List({ setErrorApi }) {
  const [films, setFilms] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const page = searchParams.get("page");

  const fetchFilms = useCallback(
    async (search, page) => {
      const url =
        API_FILMS +
        "?" +
        new URLSearchParams({
          [SWAPI_PARAM_SEARCH]: search,
          [SWAPI_PARAM_PAGE]: page,
        }).toString();

      const res = await getApiResource(url);

      const filmsList = res.results.map(({ title, url }) => {
        const id = getFilmId(url);
        const img = getFilmImage(id);

        return { id, title, img };
      });

      setPrevPage(res.previous);
      setNextPage(res.next);

      setFilms(filmsList);

      if (res) {
        setErrorApi(false);
      } else {
        setErrorApi(true);
      }
    },
    [setErrorApi]
  );

  useEffect(() => {
    fetchFilms(search, page);
  }, [page, search, fetchFilms]);

  return (
    <div className={styles.page}>
      <h1>FILMS</h1>
      <div className={styles.search}>
        <Search placeholder={"Search..."} />
      </div>
      <ul className={styles.cards}>
        {films ? (
          films.length ? (
            films.map(({ id, title, img }) => {
              return <FilmCard key={id} id={id} title={title} img={img} />;
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
