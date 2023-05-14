import { useEffect, useState } from "react";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_FILMS } from "@constants/api.js";
import { getFilmId, getFilmImage } from "@services/getData.js";
import FilmCard from "@components/FilmCard/index.js";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";

function List() {
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

  if (!films) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <h1>FILMS</h1>
      <ul className={styles.cards}>
        {films?.map(({ id, title, img }) => {
          return <FilmCard key={id} id={id} title={title} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default withErrorApi(List);
