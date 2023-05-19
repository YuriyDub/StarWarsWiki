import { useEffect, useState } from "react";
import { useQueryParams } from "@hooks/useQueryParams";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_FILMS, SWAPI_PARAM_PAGE } from "@constants/api.js";
import { getFilmId, getFilmImage, getPageId } from "@services/getData.js";
import FilmCard from "@components/FilmCard/index.js";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";

function List() {
  const [films, setFilms] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [counterPage, setCounterPage] = useState(0);

  const query = useQueryParams();
  const queryPage = query.get("page");

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const filmsList = res.results.map(({ title, url }) => {
      const id = getFilmId(url);
      const img = getFilmImage(id);

      return { id, title, img };
    });

    setPrevPage(res.previous);
    setNextPage(res.next);
    setCounterPage(getPageId(url));

    setFilms(filmsList);
  };

  useEffect(() => {
    getResource(API_FILMS + SWAPI_PARAM_PAGE + queryPage);
  }, []);

  return (
    <div className={styles.page}>
      <h1>FILMS</h1>
      <ul className={styles.cards}>
        {films ? (
          films.map(({ id, title, img }) => {
            return <FilmCard key={id} id={id} title={title} img={img} />;
          })
        ) : (
          <PlaceHolder />
        )}
      </ul>
      <PagesNavigation
        category="films"
        prevPage={prevPage}
        nextPage={nextPage}
        counter={counterPage}
      />
    </div>
  );
}

export default withErrorApi(List);
