import axios from "app/axios";
import { urlLogin } from "app/axios/urlApi";

export const loginAuth = params => {
  return axios.post(`${urlLogin}`, params);
};
