import { useEffect, useState } from "react";
import { useQueryParams } from "@hooks/useQueryParams";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_SHIPS, SWAPI_PARAM_PAGE } from "@constants/api.js";
import { getShipId, getShipImage, getPageId } from "@services/getData.js";
import ShipCard from "@components/ShipCard";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";

function ShipsPage() {
  const [ships, setShips] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [counterPage, setCounterPage] = useState(0);

  const query = useQueryParams();
  const queryPage = query.get("page");

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const peopleList = res.results.map(({ name, url }) => {
      const id = getShipId(url);
      const img = getShipImage(id);

      return { id, name, img };
    });

    setPrevPage(res.previous);
    setNextPage(res.next);
    setCounterPage(getPageId(url));

    setShips(peopleList);
  };

  useEffect(() => {
    getResource(API_SHIPS + SWAPI_PARAM_PAGE + queryPage);
  }, [queryPage]);

  return (
    <div className={styles.page}>
      <h1>SHIPS</h1>
      <ul className={styles.cards}>
        {ships ? (
          ships.map(({ id, name, img }) => {
            return <ShipCard id={id} key={id} name={name} img={img} />;
          })
        ) : (
          <PlaceHolder />
        )}
      </ul>
      <PagesNavigation
        category="ships"
        prevPage={prevPage}
        nextPage={nextPage}
        counter={counterPage}
      />
    </div>
  );
}

export default withErrorApi(ShipsPage);
