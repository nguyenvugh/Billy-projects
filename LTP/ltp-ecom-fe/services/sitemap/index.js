import axios from "@ltp/services/axios";
import { urlNewsSitemap, urlProductCateSitemap, urlProductSitemap } from "../urlAPI";

export const getProductsCategorySiteMap = async (params, lang) => {
  return await axios.get(urlProductCateSitemap, { params, headers: { lang } });
};

export const getProductsSiteMap = (params, lang) =>
  axios.get(urlProductSitemap, { params, headers: { lang } });

export const getNewsSiteMap = (params) => axios.get(urlNewsSitemap, { params });
