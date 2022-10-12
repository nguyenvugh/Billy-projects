import Axios from "axios";
import { baseUrl } from "./urlApi";
import { getToken } from "app/reducers/auth";
const instance = Axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  try {
    let token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
      };
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error?.response?.data || error?.message);
  }
);

export default instance;
