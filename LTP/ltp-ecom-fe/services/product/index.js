import axios, { getApi } from "@ltp/services/axios";
import { urlCombo, urlComboFavorite, urlProduct, urlProductRelate } from "@ltp/services/urlAPI";
import { combineUrlParams } from "@ltp/utils/index";
import useSWR from "swr";

export const getProducts = (params = {}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, mutate, revalidate, isValidating } = useSWR(
    combineUrlParams(urlProduct, params),
    getApi,
    {
      revalidateOnMount: true,
    },
  );
  return {
    data,
    error,
    mutate,
    revalidate,
    isValidating,
  };
};

export const getProductsAxios = (params) => axios.get(urlProduct, { params });
export const getProductsAxiosByLang = (params, lang) => {
  return axios.get(combineUrlParams(urlProduct, params), { headers: { lang } });
};

export const getProductDetail = (id) => axios.get(`${urlProduct}/${id}`);

export const getProductDetailSlug = async (slug, { token, ...params }) => {
  let finalParams = { params };
  if (token) {
    finalParams.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const rs = await axios.get(`${urlProduct}/slug/${slug}`, finalParams);
    return rs?.data;
  } catch (error) {
    return {
      code: error?.response.status,
      data: error?.response.data?.message,
    };
  }
};

export const getProductDetailOtherSlug = async (params) => {
  try {
    const res = await axios.get(`${urlProduct}/find-slug-other-lang`, { params });
    if (res?.data?.code === 200) {
      return res?.data.data;
    } else {
      return params?.slug;
    }
  } catch (error) {
    return params?.slug;
  }
};

export const getProductRelate = ({ category, ...rest }) => {
  if (category && /^.*?[0-9]$/.test(category)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate, revalidate } = useSWR(
      combineUrlParams(urlProductRelate, { category, ...rest }),
      getApi,
      {
        revalidateOnMount: true,
        initialData: { results: [] },
      },
    );
    return {
      data,
      error,
      mutate,
      revalidate,
    };
  }
  return { data: { results: [] }, error: true };
};
export const getProductReview = ({ id, ...rest }) => {
  if (id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate, revalidate } = useSWR(
      combineUrlParams(`${urlProduct}/${id}/review`, { ...rest }),
      getApi,
      {
        revalidateOnMount: true,
        initialData: { results: [], total: 0 },
      },
    );
    return {
      data,
      error,
      mutate,
      revalidate,
    };
  }
  return { data: { results: [] }, error: true };
};

export const getComboList = (params) => axios.get(urlCombo, { params });

export const getComboById = (id) => axios.get(`${urlCombo}/${id}`);

export const favoriteCombo = (params) => axios.post(urlComboFavorite, undefined, { params });
