import { apiFlashSale, apiProductList, apiProductReviews } from 'app/axios/urlApi';
import axios from 'app/services/axios';

/**
 * 
 * @param {Number} params.page
 * @param {Number} params.limit
 * @param {String} params.q
 * @param {Number} params.status - Approve is 2, Decline is 3, Processing is 1
 */
export const getProductReviews = (params) => {
  return axios.get(apiProductReviews, { params });
};

/**
 * 
 * @param {id} params.id
 */

export const getProductReviewDetail = (params) => {
  return axios.get(`${apiProductReviews}/${params.id}`);
};


/**
 * 
 * @param {array} params.ids 
 */
export const patchApproveProductReviews = (params) => {
  const _params = {
    ...params,
    status: 2
  };
  return axios.patch(apiProductReviews, _params);
};


/**
 * 
 * @param {array} params.ids 
 */
export const patchDeclineProductReviews = (params) => {
  const _params = {
    ...params,
    status: 3
  };
  return axios.patch(apiProductReviews, _params);
};

export const deleteProductReviews = (params) => {
  return axios.delete(apiProductReviews, {data: params});
};


