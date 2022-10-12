import axios from "@ltp/services/axios";
import client from "@ltp/services/client";
import {
  urlAddress,
  urlFavoriteCombo,
  urlFavoriteProduct,
  urlOrder,
  urlPassword,
  urlProfile,
  urlReview,
  urlSeenProduct,
  urlSocialLinking,
} from "@ltp/services/urlAPI";

// GENERAL PROFILE
/**
 *
 * @typedef SEX
 * @enum {0 | 1 | 2}
 */

/**
 * @typedef Profile
 * @property {string} name
 * @property {string} phone_number
 * @property {string} birthday - dd/mm/yyyy
 * @property {string} email
 * @property {SEX} sex  - 0 | 1 | 2
 * @property {number} avatar_id - Get ID from /customer/media-upload
 */

/**
 * @async
 * @return {Promise<Profile>}
 */
export const getProfile = () => axios.get(urlProfile);

export const getProfileClient = () => client.get(urlProfile);

/**
 * @async
 * @param {Profile}
 * @param {string} params.phone_number
 * @param {string} birthday - dd/mm/yyyy
 * @param {string} email
 * @param {SEX} sex  - 0 | 1 | 2
 * @param {number} avatar_id - Get ID from /customer/media-upload
 */
export const updateProfile = (params) => axios.post(urlProfile, params);

/**
 * @async
 * @param {string} params.type - key: google | facebook
 * @param {string} params.uid
 * @param {string} params.oauthIdToken can be null
 * @param {string} params.oauthAccessToken
 * @param {string} action - key: connect | disconnect
 */
export const createSocialAccount = (params) => axios.post(urlSocialLinking, params);

// FORGOT PASSWORD

/**
 *
 * @param {string} params.old_password
 * @param {string} params.new_password
 */
export const updatePassword = (params) => axios.post(urlPassword, params);

// ADDRESS
export const getMyAddress = () => axios.get(urlAddress);

export const createMyAddress = (params) => axios.post(urlAddress, params);

/**
 * @param {number} id
 * @param {Object} params
 */
export const updateMyAddress = (id, params) => axios.patch(`${urlAddress}/${id}`, params);
/**
 * @param {number} id
 */
export const deleteMyAddress = (id) => axios.delete(`${urlAddress}/${id}`);

/**
 * @param {number} id
 */
export const updateAddressDefault = (id) => axios.patch(`${urlAddress}/${id}/default`);

// FAVORITE
/**
 *
 * @param {number} params.page
 * @param {number} params.limit
 */
export const getFavoriteProduct = (params) => axios.get(`${urlFavoriteProduct}`, { params });
export const getFavoriteCombo = (params) => axios.get(`${urlFavoriteCombo}`, { params });
/**
 *
 * @param {number} params.product
 */
export const createFavoriteProduct = (params) =>
  axios.post(`${urlFavoriteProduct}`, {}, { params });

export const deleteAllFavoriteProducts = () => axios.delete(`${urlFavoriteProduct}`);
export const deleteAllFavoriteCombo = () => axios.delete(`${urlFavoriteCombo}`);
/**
 * @param {number} id
 */
export const deleteFavoriteProduct = (id) => axios.delete(`${urlFavoriteProduct}/${id}`);
export const deleteFavoriteCombo = (id) => axios.delete(`${urlFavoriteCombo}/${id}`);
// REVIEW
/**
 *
 * @param {number} params.page
 * @param {number} params.limit
 */
export const getReview = (params) => axios.get(urlReview, { params });

export const postReview = (params) => axios.post(urlReview, params);
// SEEN PRODUCT
/**
 *
 * @param {number} params.page
 * @param {number} params.limit
 */
export const getSeenProduct = (params) => axios.get(urlSeenProduct, { params });

// ORDER

/**
 *
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.search
 *
 */
export const getOrders = (params) => axios.get(urlOrder, { params });

export const getOrderDetail = (id) => axios.get(`${urlOrder}/${id}`);

/**
 *
 * @param {number} id
 * @param {string} params.note
 */
export const cancelOrder = (id, params) => axios.patch(`${urlOrder}/${id}/cancel`, params);
/**
 *
 * @param {number} id
 * @param {number} shippingId
 */
export const getOrderTracking = (id, shippingId) =>
  axios.get(`${urlOrder}/${id}/shippings/${shippingId}`);
