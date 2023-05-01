import {
  URL_IMG_PERSON,
  HTTPS,
  SWAPI_ROOT,
  SWAPI_PEOPLES,
  SWAPI_SHIPS,
  SWAPI_PLANETS,
  SWAPI_FILMS,
  GUIDE_IMG_EXTENTION,
  URL_IMG_SHIP,
  URL_IMG_PLANET,
  URL_IMG_FILM,
} from "../constants/api";

const getId = (url, category) => {
  const id = url.replace(HTTPS + SWAPI_ROOT + category, "").replace(/\//g, "");
  return id;
};

export const getPeopleId = (url) => getId(url, SWAPI_PEOPLES);

export const getPeopleImage = (id) =>
  `${URL_IMG_PERSON}/${id}${GUIDE_IMG_EXTENTION}`;

export const getShipId = (url) => getId(url, SWAPI_SHIPS);

export const getShipImage = (id) =>
  `${URL_IMG_SHIP}/${id}${GUIDE_IMG_EXTENTION}`;

export const getPlanetId = (url) => getId(url, SWAPI_PLANETS);

export const getPlanetImage = (id) =>
  `${URL_IMG_PLANET}/${id}${GUIDE_IMG_EXTENTION}`;

export const getFilmId = (url) => getId(url, SWAPI_FILMS);

export const getFilmImage = (id) =>
  `${URL_IMG_FILM}/${id}${GUIDE_IMG_EXTENTION}`;
