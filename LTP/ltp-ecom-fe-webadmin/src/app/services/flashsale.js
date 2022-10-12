import { apiFlashSale, apiProductList } from 'app/axios/urlApi';
import axios from 'app/services/axios';

export const PRODUCT_STATUS = ['', 'Vừa mở bán', 'Còn hàng', 'Sắp cháy hàng', 'Cháy hàng'];

export const getProductList = async () => {
  return axios.get(apiProductList);
};

/**
* @param {number} params.page
* @param {number} params.limit
* @param {string} params.search_value
* @param {number} params.status 1 | 2 | 3
*/
export const getFlashSaleList = (params) => {
  return axios.get(`${apiFlashSale}`, { params });
};

/**
* @param {number} params.product_id
* @param {number} params.quantity
* @param {number} params.percentage
* @param {number} params.status
*/
export const createFlashSaleProduct = (params) => {
  return axios.post(`${apiFlashSale}/${params.id}/product`, params);
};

export const createFlashSale = (params) => {
  return axios.post(`${apiFlashSale}`, params);
};
/**
* @param {number}  params.flashsale_id
* @param {number} params.product_id
* @param {number} params.quantity
* @param {number} params.percentage
* @param {number} params.status
*/
export const updateFlashSaleProduct = (flashsale_id, record_id, params) => {
  return axios.put(`${apiFlashSale}/${flashsale_id}/product/${record_id}`, params);
};

/**
* @param {array} ids - [].toString()
*/
export const deleteFlashSale = (params) => {
  return axios.post(`${apiFlashSale}/delete`, params);
};

export const deleteFlashSaleProduct = (params) => {
  return axios.post(`${apiFlashSale}/product/delete`, params);
};

export const updateFlashSaleActive = (params) => {
  return axios.post(`${apiFlashSale}/${params.id}/activate`, params);
};


/**
* @param {string} params.start_date - yyyy-mm-ddd
* @param {string} params.start_time - HH:mm
* @param {string} params.end_date - yyyy-mm-ddd
* @param {string} params.end_time - HH:mm
*/
export const createSettingFlashSaleTime = (params) => {
  return axios.post(`${apiFlashSale}/setting-date-time`, params);
};

/**
* @param {string} params.is_active
**/
export const createActiveFlashSaleTime = (params) => {
  return axios.post(`${apiFlashSale}/activate-setting-date-time`, params);
};

/**
* @param {string} params.id - yyyy-mm-ddd
* @param {string} params.limit - HH:mm
* @param {string} params.page - yyyy-mm-ddd
*/
export const getFlashSaleProducts = (params) => {
  return axios.get(`${apiFlashSale}/${params.id}/products`, { params });
};
export const getFLashSaleDetail = (id) => {
  return axios.get(`${apiFlashSale}/${id}`);
};
/**
* @param {string} params.id - yyyy-mm-ddd
* @param {string} params.name - yyyy-mm-ddd
* @param {string} params.start_date - HH:mm
* @param {string} params.end_date - yyyy-mm-ddd
*/
export const updateFlashSaleDetail = (params) => {
  return axios.put(`${apiFlashSale}/${params.id}`, params);
};