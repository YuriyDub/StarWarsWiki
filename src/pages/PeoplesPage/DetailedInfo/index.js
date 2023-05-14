import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_PEOPLES } from "@constants/api.js";
import { getPeopleImage } from "@services/getData.js";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./DetailedInfo.module.scss";

function DetailedInfo() {
  const { id } = useParams();
  const imgUrl = getPeopleImage(id);

  const [details, setDetails] = useState(null);

  const getResource = async (url) => {
    setDetails(await getApiResource(url));
  };

  useEffect(() => {
    getResource(`${API_PEOPLES}/${id}/`);
  }, [id]);

  if (!details) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <img src={imgUrl} alt="people" />
        <div className={styles.description}>
          <div>
            <h1>{details.name}</h1>
            <h2>Birth Date: {details.birth_year}</h2>
          </div>
          <div className={styles.parameters}>
            <h2>Gender: {details.gender}</h2>
            <h2>Height: {details.height}.sm</h2>
            <h2>Mass: {details.mass}.kg</h2>
            <h2>Skin Color: {details.skin_color}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withErrorApi(DetailedInfo);
