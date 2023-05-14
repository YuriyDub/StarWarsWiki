import { useEffect, useState } from "react";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_PLANETS } from "@constants/api.js";
import { getPlanetId, getPlanetImage } from "@services/getData.js";
import PlanetCard from "@components/PlanetCard";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";

function List() {
  const [planets, setPlanets] = useState(null);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const planetsList = res.results.map(({ name, url }) => {
      const id = getPlanetId(url);
      const img = getPlanetImage(id);

      return { id, name, img };
    });

    setPlanets(planetsList);
  };

  useEffect(() => {
    getResource(API_PLANETS);
  }, []);

  if (!planets) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <h1>PLANETS</h1>
      <ul className={styles.cards}>
        {planets?.map(({ id, name, img }) => {
          return <PlanetCard key={id} id={id} name={name} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default withErrorApi(List);
