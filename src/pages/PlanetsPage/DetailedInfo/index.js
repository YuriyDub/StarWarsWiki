import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_PLANETS } from "@constants/api.js";
import { getPlanetImage } from "@services/getData.js";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./DetailedInfo.module.scss";

function DetailedInfo() {
  const { id } = useParams();
  const imgUrl = getPlanetImage(id);

  const [details, setDetails] = useState(null);

  const getResource = async (url) => {
    setDetails(await getApiResource(url));
  };

  useEffect(() => {
    getResource(`${API_PLANETS}/${id}/`);
  }, [id]);

  if (!details) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <img src={imgUrl} alt="planet" />
        <div className={styles.description}>
          <div>
            <h1>{details.name}</h1>
            <h2>Population: {details.population}</h2>
            <h2>Climate: {details.climate}</h2>
            <h2>Terrain: {details.terrain}</h2>
          </div>
          <div className={styles.parameters}>
            <h2>Diameter: {details.diameter}</h2>
            <h2>Orbital Period: {details.orbital_period}</h2>
            <h2>Rotation Period: {details.rotation_period}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withErrorApi(DetailedInfo);
