import { useEffect, useState } from "react";
import { useQueryParams } from "@hooks/useQueryParams";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_PLANETS, SWAPI_PARAM_PAGE } from "@constants/api.js";
import { getPlanetId, getPlanetImage, getPageId } from "@services/getData.js";
import PlanetCard from "@components/PlanetCard";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";

function List() {
  const [planets, setPlanets] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [counterPage, setCounterPage] = useState(0);

  const query = useQueryParams();
  const queryPage = query.get("page");

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const planetsList = res.results.map(({ name, url }) => {
      const id = getPlanetId(url);
      const img = getPlanetImage(id);

      return { id, name, img };
    });

    setPrevPage(res.previous);
    setNextPage(res.next);
    setCounterPage(getPageId(url));

    setPlanets(planetsList);
  };

  useEffect(() => {
    getResource(API_PLANETS + SWAPI_PARAM_PAGE + queryPage);
  }, [queryPage]);

  if (!planets) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <h1>PLANETS</h1>
      <ul className={styles.cards}>
        {planets ? (
          planets.map(({ id, name, img }) => {
            return <PlanetCard key={id} id={id} name={name} img={img} />;
          })
        ) : (
          <PlaceHolder />
        )}
      </ul>
      <PagesNavigation
        category="planets"
        prevPage={prevPage}
        nextPage={nextPage}
        counter={counterPage}
      />
    </div>
  );
}

export default withErrorApi(List);