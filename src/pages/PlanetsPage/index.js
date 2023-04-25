import { useEffect, useState } from "react";
import { getApiResource } from "../../utils/network.js";
import { API_PLANETS } from "../../constants/api.js";
import { getPlanetId, getPlanetImage } from "../../services/getData.js";
import PlanetCard from "../../components/PlanetCard";
import styles from "./PlanetsPage.module.scss";

function PlanetsPage() {
  const [planets, setPlanets] = useState(null);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const peopleList = res.results.map(({ name, url }) => {
      const id = getPlanetId(url);
      const img = getPlanetImage(id);

      return { id, name, img };
    });

    setPlanets(peopleList);
  };

  useEffect(() => {
    getResource(API_PLANETS);
  }, []);

  return (
    <div className={styles.page}>
      <h1>PLANETS</h1>
      <ul className={styles.cards}>
        {planets?.map(({ id, name, img }) => {
          return <PlanetCard key={id} name={name} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default PlanetsPage;
