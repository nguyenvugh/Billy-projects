import { keyCache } from "@ltp/constants/data";
import { urlBase } from "@ltp/services/urlAPI";
import axios from "axios";
import https from "https";
import { readCache } from "./datacache";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const client = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent,
});

client.interceptors.request.use(async (config) => {
  try {
    const userInfo = readCache(keyCache.UserInfo);
    const token = userInfo?.access_token;
    const updatedConfig = { ...config };
    if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`;
    }
    return updatedConfig;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default client;
