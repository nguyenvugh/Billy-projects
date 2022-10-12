import {
  urlCountry,
  urlListCityProduct,
  urlCity,
  urlDistrict,
  urlWard,
  urlAddress,
} from "@ltp/services/urlAPI";
import axios, { getApi } from "@ltp/services/axios";
import { combineUrlParams } from "@ltp/utils/index";
import useSWR from "swr";

export const getCityProduct = (params = {}) => {
  const {
    data,
    error,
    mutate,
    revalidate,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useSWR(combineUrlParams(urlListCityProduct, params), getApi, {
    revalidateOnMount: true,
    initialData: { total: 0, results: [] },
  });
  return {
    data,
    error,
    mutate,
    revalidate,
  };
};
export const getCountry = (params = {}) => axios.get(urlCountry, { params });
export const getCity = (params = {}) => axios.get(urlCity, { params });
export const getDistrict = (params = {}) => axios.get(urlDistrict, { params });
export const getWard = (params = {}) => axios.get(urlWard, { params });

// manager address
export const createAddressUser = (params = {}) => axios.post(urlAddress, params);
export const getAddressUser = (params = {}) => axios.get(urlAddress, params);
export const updateAddressUser = ({ id, ...rest }) => axios.patch(`${urlAddress}/${id}`, rest);
export const updateAddressDefault = (id) => axios.patch(`${urlAddress}/${id}/default`);
