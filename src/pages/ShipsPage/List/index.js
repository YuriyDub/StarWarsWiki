import { useCallback, useEffect, useState } from "react";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_SHIPS, SWAPI_PARAM_PAGE } from "@constants/api.js";
import { getShipId, getShipImage } from "@services/getData.js";
import ShipCard from "@components/ShipCard";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";
import { SWAPI_PARAM_SEARCH } from "../../../constants/api";
import { useSearchParams } from "react-router-dom";
import Search from "../../../components/Search";

function ShipsPage({ setErrorApi }) {
  const [ships, setShips] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const page = searchParams.get("page");

  const fetchShips = useCallback(
    async (search, page, abortController) => {
      const url =
        API_SHIPS +
        "?" +
        new URLSearchParams({
          [SWAPI_PARAM_SEARCH]: search,
          [SWAPI_PARAM_PAGE]: page,
        }).toString();

      const res = await getApiResource(url, abortController);

      const shipsList = res.results.map(({ name, url }) => {
        const id = getShipId(url);
        const img = getShipImage(id);

        return { id, name, img };
      });

      setPrevPage(res.previous);
      setNextPage(res.next);

      setShips(shipsList);

      if (res) {
        setErrorApi(false);
      } else {
        setErrorApi(true);
      }
    },
    [setErrorApi]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchShips(search, page);
    return () => abortController.abort();
  }, [page, search, fetchShips]);

  return (
    <div className={styles.page}>
      <h1>SHIPS</h1>
      <div className={styles.search}>
        <Search placeholder={"Search..."} />
      </div>
      <ul className={styles.cards}>
        {ships ? (
          ships.length ? (
            ships.map(({ id, name, img }) => {
              return <ShipCard key={id} id={id} name={name} img={img} />;
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

export default withErrorApi(ShipsPage);
