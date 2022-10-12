import axios from "axios";
import { baseURL } from "./urlAPI";
import { getToken } from "app/reducers/auth";

const instance = axios.create({
  baseURL: baseURL,
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

export const getProductCategory = (url) => {
  return instance.get(url).then((res) => res?.data);
};

export const deleteProductCategory = (url) => {
  return instance.delete(url).then((res) => res?.data);
};

export const postImage = (url, params) => {
  return instance
    .post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "*/*",
      },
    })
    .then((res) => res?.data);
};

export const deleteImage = (url) => {
  return instance.delete(url).then((res) => console.log(res));
};

export const addNewCate = (url, params, config) => {
  return instance.post(url, params, config).then((res) => res?.data);
};

export const updateCate = (url, params, config) => {
  return instance.patch(url, params, config).then((res) => res?.data);
};

export const putApi = (url, params) => {
  return instance.put(url, params).then((res) => res?.data);
};

export default instance;
