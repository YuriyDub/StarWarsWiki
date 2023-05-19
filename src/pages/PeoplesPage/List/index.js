import { useEffect, useState } from "react";
import { useQueryParams } from "@hooks/useQueryParams";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_PEOPLES, SWAPI_PARAM_PAGE } from "@constants/api.js";
import { getPeopleId, getPeopleImage, getPageId } from "@services/getData.js";
import PeopleCard from "@components/PeopleCard";
import PagesNavigation from "@components/PagesNavigation";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";

function List() {
  const [peoples, setPeoples] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [counterPage, setCounterPage] = useState(0);

  const query = useQueryParams();
  const queryPage = query.get("page");

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const peoplesList = res.results.map(({ name, url }) => {
      const id = getPeopleId(url);
      const img = getPeopleImage(id);

      return { id, name, img };
    });

    setPrevPage(res.previous);
    setNextPage(res.next);
    setCounterPage(getPageId(url));

    setPeoples(peoplesList);
  };

  useEffect(() => {
    getResource(API_PEOPLES + SWAPI_PARAM_PAGE + queryPage);
  }, [queryPage]);

  return (
    <div className={styles.page}>
      <h1>PEOPLES</h1>
      <ul className={styles.cards}>
        {peoples ? (
          peoples.map(({ id, name, img }) => {
            return <PeopleCard key={id} id={id} name={name} img={img} />;
          })
        ) : (
          <PlaceHolder />
        )}
      </ul>
      <PagesNavigation
        category="peoples"
        prevPage={prevPage}
        nextPage={nextPage}
        counter={counterPage}
      />
    </div>
  );
}

export default withErrorApi(List);
