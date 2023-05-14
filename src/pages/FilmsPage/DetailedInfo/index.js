import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApiResource } from "@utils/network.js";
import { withErrorApi } from "@hoc-helpers/withErrorApi.js";
import { API_FILMS } from "@constants/api.js";
import { getFilmImage } from "@services/getData.js";

import PlaceHolder from "@components/PlaceHolder";

import styles from "./DetailedInfo.module.scss";

function DetailedInfo() {
  const { id } = useParams();
  const imgUrl = getFilmImage(id);

  const [details, setDetails] = useState(null);

  const getResource = async (url) => {
    setDetails(await getApiResource(url));
  };

  useEffect(() => {
    getResource(`${API_FILMS}/${id}/`);
  }, [id]);

  if (!details) {
    return <PlaceHolder />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <img src={imgUrl} alt="film" />
        <div className={styles.description}>
          <div>
            <h1>{details.title}</h1>
            <h2>Date: {details.release_date}</h2>
          </div>
          <h2>{details.opening_crawl}</h2>
          <div>
            <h3>
              <span>Producers: </span>
              {details.producer}
            </h3>
            <h3>
              <span>Directors: </span>
              {details.director}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withErrorApi(DetailedInfo);
