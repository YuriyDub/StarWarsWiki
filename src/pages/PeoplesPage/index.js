import { useEffect, useState } from "react";
import { getApiResource } from "../../utils/network.js";
import { API_PEOPLE } from "../../constants/api.js";
import { getPeopleId, getPeopleImage } from "../../services/getData.js";
import PeopleCard from "../../components/PeopleCard/index.js";
import styles from "./PeoplesPage.module.scss";

function PeoplePage() {
  const [peoples, setPeoples] = useState(null);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const peopleList = res.results.map(({ name, url }) => {
      const id = getPeopleId(url);
      const img = getPeopleImage(id);

      return { id, name, img };
    });

    setPeoples(peopleList);
  };

  useEffect(() => {
    getResource(API_PEOPLE);
  }, []);

  return (
    <div className={styles.page}>
      <h1>PEOPLES</h1>
      <ul className={styles.cards}>
        {peoples?.map(({ id, name, img }) => {
          return <PeopleCard key={id} name={name} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default PeoplePage;