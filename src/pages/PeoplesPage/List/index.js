import { useEffect, useState } from "react";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_PEOPLES } from "@constants/api.js";
import { getPeopleId, getPeopleImage } from "@services/getData.js";
import PeopleCard from "@components/PeopleCard";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./List.module.scss";

function List() {
  const [peoples, setPeoples] = useState(null);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const peoplesList = res.results.map(({ name, url }) => {
      const id = getPeopleId(url);
      const img = getPeopleImage(id);

      return { id, name, img };
    });

    setPeoples(peoplesList);
  };

  useEffect(() => {
    getResource(API_PEOPLES);
  }, []);

  if (!peoples) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <h1>PEOPLES</h1>
      <ul className={styles.cards}>
        {peoples?.map(({ id, name, img }) => {
          return <PeopleCard key={id} id={id} name={name} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default withErrorApi(List);
