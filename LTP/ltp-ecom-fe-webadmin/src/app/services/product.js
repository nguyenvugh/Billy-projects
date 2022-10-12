import axios from "app/axios";
import { apiListProductCoupon } from "app/axios/urlApi";

export const fetchProductsCouponAxios = (params) => {
  return axios.get(`${apiListProductCoupon}`, { params });
};
