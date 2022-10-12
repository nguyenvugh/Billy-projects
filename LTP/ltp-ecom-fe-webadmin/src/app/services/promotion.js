import axios from 'app/services/axios';
import { apiPromotions } from 'app/axios/urlApi';

/**
* @param {number} params.page
* @param {number} params.limit
* @param {number} params.sort_field
* @param {number} params.sort_type - type = ASC | DESC | " "
*/
export const getPromotionList = (params) => {
  return axios.get(apiPromotions, { params });
};


/**
* @param {number} params.id
*/
export const getPromotionDetail = (params) => {
  return axios.get(`${apiPromotions}/${params.id}`, params);
};

/**
* @param {number} params.thumbnail_id
* @param {number} params.type - type = 1 | 2
* @param {number} params.product_id
* @param {number} params.percentage
* @param {string} params.start_date - yyyy-mm-dd
* @param {string} params.end_date - yyyy-mm-dd
* @param {string} params.start_time - HH:mm
* @param {string} params.end_time - HH:mm
* @param {array} params.contents 
* @param {string} params.contents.language_code - vi | en
* @param {string} params.contents.language_field - name, description, create_by
* @param {string} params.contents.language_value
*/
export const createPromotion = (params) => {
  return axios.post(apiPromotions, params);
};

/**
* @param {number} params.thumbnail_id
* @param {number} params.type - type = 1 | 2
* @param {number} params.product_id
* @param {number} params.percentage
* @param {string} params.start_date - yyyy-mm-dd
* @param {string} params.end_date - yyyy-mm-dd
* @param {string} params.start_time - HH:mm
* @param {string} params.end_time - HH:mm
* @param {array} params.contents 
* @param {string} params.contents.language_code - vi | en
* @param {string} params.contents.language_field - name, description, create_by
* @param {string} params.contents.language_value
*/
export const updatePromotion = (id, params) => {
  return axios.put(`${apiPromotions}/${id}`, params);
};


/**
* @param {array} ids - [].toString()
*/
export const deletePromotion = (params) => {
  return axios.post(`${apiPromotions}/delete`, params);
};