import { useEffect, useState } from "react";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_FILMS } from "@constants/api.js";
import { getFilmId, getFilmImage } from "@services/getData.js";
import FilmCard from "@components/FilmCard/index.js";

import styles from "./FilmsPage.module.scss";

function FilmsPage() {
  const [films, setFilms] = useState(null);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const filmsList = res.results.map(({ title, url }) => {
      const id = getFilmId(url);
      const img = getFilmImage(id);

      return { id, title, img };
    });

    setFilms(filmsList);
  };

  useEffect(() => {
    getResource(API_FILMS);
  }, []);

  return (
    <div className={styles.page}>
      <h1>FILMS</h1>
      <ul className={styles.cards}>
        {films?.map(({ id, title, img }) => {
          return <FilmCard key={id} title={title} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default withErrorApi(FilmsPage);
