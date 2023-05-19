import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_SHIPS } from "@constants/api.js";
import { getShipImage } from "@services/getData.js";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./DetailedInfo.module.scss";

function DetailedInfo() {
  const { id } = useParams();
  const imgUrl = getShipImage(id);

  const [details, setDetails] = useState(null);

  const getResource = async (url) => {
    setDetails(await getApiResource(url));
  };

  useEffect(() => {
    getResource(`${API_SHIPS}/${id}/`);
  }, [id]);

  if (!details) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <img src={imgUrl} alt="ship" />
        <div className={styles.description}>
          <div>
            <h1>{details.name}</h1>
            <h2>Model: {details.model}</h2>
            <h2>Manufacturer: {details.manufacturer}</h2>
            <h2>Starship Class: {details.starship_class}</h2>
          </div>
          <div className={styles.parameters}>
            <h2>Cost In Credits: {details.cost_in_credits}</h2>
            <h2>MGLT: {details.MGLT}</h2>
            <h2>Max Atmosphering Speed: {details.max_atmosphering_speed}</h2>
            <h2>Cargo Capacity: {details.cargo_capacity}</h2>
            <h2>Passengers: {details.passengers}</h2>
            <h2>Consumables: {details.consumables}</h2>
            <h2>Hyperdrive Rating: {details.hyperdrive_rating}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withErrorApi(DetailedInfo);
