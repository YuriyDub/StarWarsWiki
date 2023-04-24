import { useEffect, useState } from "react";
import { getApiResource } from "../../utils/network.js";
import { API_PEOPLE } from "../../constants/api.js";
import { getPeopleId, getPeopleImage } from "../../services/getPeopleData.js";
import PeopleCard from "../../components/PeopleCard";
import styles from "./PeoplePage.module.scss";

function PeoplePage() {
  const [people, setPeople] = useState(null);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const peopleList = res.results.map(({ name, url }) => {
      const id = getPeopleId(url);
      const img = getPeopleImage(id);

      return { id, name, img };
    });

    setPeople(peopleList);
  };

  useEffect(() => {
    getResource(API_PEOPLE);
  }, []);

  return (
    <div className={styles.page}>
      <ul className={styles.cards}>
        {people?.map(({ id, name, img }) => {
          return <PeopleCard key={id} name={name} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default PeoplePage;
