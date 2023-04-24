import {
  URL_IMG_PERSON,
  HTTPS,
  SWAPI_ROOT,
  SWAPI_PEOPLE,
  SWAPI_SHIPS,
  GUIDE_IMG_EXTENTION,
  URL_IMG_SHIPS,
} from "../constants/api";

const getId = (url, category) => {
  const id = url.replace(HTTPS + SWAPI_ROOT + category, "").replace(/\//g, "");
  return id;
};

export const getPeopleId = (url) => getId(url, SWAPI_PEOPLE);

export const getPeopleImage = (id) =>
  `${URL_IMG_PERSON}/${id}${GUIDE_IMG_EXTENTION}`;

export const getShipId = (url) => getId(url, SWAPI_SHIPS);

export const getShipImage = (id) =>
  `${URL_IMG_SHIPS}/${id}${GUIDE_IMG_EXTENTION}`;
