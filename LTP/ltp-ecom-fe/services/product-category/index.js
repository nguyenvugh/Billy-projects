import axios, { getApi } from "@ltp/services/axios";
import { urlCategoryOtherLang, urlProductsCategory } from "@ltp/services/urlAPI";
import { combineUrlParams } from "@ltp/utils/index";
import useSWR from "swr";

export const getCategory = () => axios.get(urlProductsCategory, { params: { page: 1, limit: 12 } });

export const getProductsCategory = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, mutate, revalidate } = useSWR(
    urlProductsCategory, // + encodeURIComponent(params),
    () => axios.get(urlProductsCategory, { params: { page: 1, limit: 12 } }).then((r) => r.data),
  );
  return {
    data,
    error,
    mutate,
    revalidate,
  };
};

export const getProductsCategoryAxios = (params) => axios.get(urlProductsCategory, { params });

export const getCategoryDetail = (id) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, mutate, revalidate } = useSWR(
    combineUrlParams(`${urlProductsCategory}/${id}`),
    getApi,
    {
      revalidateOnMount: true,
      initialData: { count: 0, results: {} },
    },
  );
  return {
    data,
    error,
    mutate,
    revalidate,
  };
};

export async function getCategoriesOtherLang(params) {
  try {
    const rs = await axios.get(urlCategoryOtherLang, {
      params,
    });
    if (rs?.data?.code === 200) {
      return rs?.data.data;
    } else {
      return params?.slug;
    }
  } catch (error) {
    return params?.slug;
  }
}

export async function getCategoryBySlug(slug, lang) {
  try {
    const rs = await axios.get(`${urlProductsCategory}/slug/${slug}`, { headers: { lang } });
    return rs?.data;
  } catch (error) {
    return {
      code: error?.response.status,
      data: error?.response.data?.message,
    };
  }
}
