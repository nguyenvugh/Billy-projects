import axios from "../../axios";
import { apiCoupon } from "../../axios/urlApi";

export const getCouponList = (params) => {
  return axios.get(`${apiCoupon}`, { params });
};

export const getCouponId = ({ id, ...params }) => {
  return axios.get(`${apiCoupon}/${id}`, { params });
};

export const createCoupon = (params) => {
  return axios.post(`${apiCoupon}`, params);
};

export const editCoupon = ({ id, ...params }) => {
  return axios.put(`${apiCoupon}/${id}`, params);
};

export const deleteCoupons = (params) => {
  return axios.post(`${apiCoupon}/delete`, params);
};
