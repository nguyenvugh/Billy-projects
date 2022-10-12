import axios from "@ltp/services/axios";
import {
  urlCustomerOrder,
  urlGetOnpayCancel,
  urlOrderPayment,
  urlOrderShipping,
  urlOrderValidate,
} from "@ltp/services/urlAPI";
import Lodash from "lodash";

export const getOrderPayment = (params) => axios.post(urlOrderPayment, params);
export const getOrderShipping = (params = {}) => axios.post(urlOrderShipping, params);
export const CustomerOrder = (params = {}) => axios.post(urlCustomerOrder, params);
export const GetOnpayCancel = (params = {}) => {
  if (Lodash.isEmpty(params)) {
    return;
  }
  // eslint-disable-next-line
  return axios.get(urlGetOnpayCancel, { params });
};

export const orderValidate = (data) => axios.post(urlOrderValidate, data);
