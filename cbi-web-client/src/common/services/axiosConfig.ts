import { clearCache } from "@cbi/utils/dataCache";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "../utils";
import { BASE_URL } from "./urlAPI";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    lang: "vi",
  },
});

axiosConfig.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.data?.statusCode === 401) {
      clearCache();
      if (window) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosConfig;
