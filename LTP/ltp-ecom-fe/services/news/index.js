import axios from "@ltp/services/axios";
import {
  urlCategoryNews,
  urlGeneralNews,
  urlGeneralNewsSlugOtherLang,
  urlNewsHome,
  urlNewsHost,
} from "../urlAPI";

export const getGeneralNews = (params) => axios.get(urlGeneralNews, { params });
export const getNewsHot = () => axios.get(urlNewsHost);
export const getNewsDetail = (id) => axios.get(`${urlGeneralNews}/${id}`);

export const getNewsDetailSlug = async (slug, params) => {
  try {
    const res = await axios.get(`${urlGeneralNews}/slug/${slug}`, { params });
    return res?.data;
  } catch (error) {
    return {
      code: error?.response.status,
      data: error?.response.data?.message,
    };
  }
};

export const getNewsDetailOtherLangSlug = async (params) => {
  try {
    const res = await axios.get(`${urlGeneralNews}/${urlGeneralNewsSlugOtherLang}`, {
      params,
    });
    if (res?.data?.code === 200) {
      return res?.data.data;
    } else {
      return params?.slug;
    }
  } catch (error) {
    return params?.slug;
  }
};

export const getCategoryNews = ({ id, ...params }) =>
  axios.get(`${urlCategoryNews}/${id}`, { params });

export const getCategoryNewsSlug = async (slug, params) => {
  try {
    const res = await axios.get(`${urlCategoryNews}/slug/${slug}`, { params });
    return res.data;
  } catch (error) {
    return {
      code: 404,
      data: error?.response.data?.message,
    };
  }
};

export const getCategoryNewsOtherSlugUrl = async (params) => {
  try {
    const res = await axios.get(`${urlCategoryNews}/find-slug-other-lang`, { params });
    if (res?.data?.code === 200) {
      return res?.data.data;
    } else {
      return params?.slug;
    }
  } catch (error) {
    return params?.slug;
  }
};

export const getNewsHome = (params) => axios.get(urlNewsHome, { params });
