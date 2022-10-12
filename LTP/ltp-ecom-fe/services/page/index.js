import axios from "@ltp/services/axios";
import { urlCompanyInfo, urlStaticPage, getStaticPageSlugUrl } from "@ltp/services/urlAPI";

export const getCompanyInfo = () => axios.get(urlCompanyInfo);

export const getStaticPage = (slug, params) => axios.get(`${urlStaticPage}/${slug}`, { params });

export const getStaticPageSlug = (params) => axios.get(`${getStaticPageSlugUrl}`, { params });

export const getStaticPageWithParam = (slugWithParam) =>
  axios.get(`${urlStaticPage}/${slugWithParam}`);
