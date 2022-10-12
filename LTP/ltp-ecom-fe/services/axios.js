import { keyCache } from "@ltp/constants/data";
import { urlBase, urlCustomerOrder } from "@ltp/services/urlAPI";
import axios from "axios";
import https from "https";
import { clearCache, readCache } from "./datacache";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const instance = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent,
});
export const getApi = (url) => instance.get(url).then((res) => res?.data);

export const postApi = (url) => instance.post(url).then((res) => res?.data);
instance.interceptors.request.use(async (config) => {
  try {
    const userInfo = readCache(keyCache.UserInfo);
    const token = userInfo?.access_token;
    const updatedConfig = { ...config };
    if (token) {
      updatedConfig.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return updatedConfig;
  } catch (error) {
    return Promise.reject(error);
  }
});
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      clearCache();
      window.location.href = "/";
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    if (error.response?.data?.statusCode === 401) {
      clearCache();
      if ([urlCustomerOrder].includes(error.response.config?.url)) {
        return Promise.reject(new Error({ status: 401, message: "error" }));
      }
      window.location.href = "/";
      return Promise.reject();
    }
    return Promise.reject(error);
  },
);

export default instance;
let hostname = "";
if (typeof window !== "undefined") {
  hostname = window.location.origin;
}
export const HOST = hostname || "http://ltpe-web-local.tesosoft.com";
