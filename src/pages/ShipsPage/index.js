import { useEffect, useState } from "react";
import { getApiResource } from "../../utils/network.js";
import { API_SHIPS } from "../../constants/api.js";
import { getShipId, getShipImage } from "../../services/getData.js";
import ShipCard from "../../components/ShipCard/index.js";
import styles from "./ShipsPage.module.scss";

function ShipPage() {
  const [ships, setShips] = useState(null);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    const peopleList = res.results.map(({ name, url }) => {
      const id = getShipId(url);
      const img = getShipImage(id);

      return { id, name, img };
    });

    setShips(peopleList);
  };

  useEffect(() => {
    getResource(API_SHIPS);
  }, []);

  return (
    <div className={styles.page}>
      <h1>SHIPS</h1>
      <ul className={styles.cards}>
        {ships?.map(({ id, name, img }) => {
          return <ShipCard key={id} name={name} img={img} />;
        })}
      </ul>
    </div>
  );
}

export default ShipPage;
