import axios from "@ltp/services/axios";
import { urlCoupon } from "@ltp/services/urlAPI";
/**
 * @param {Number} params.limit
 * @param {Number} params.page
 */
export const getCoupon = (params) => axios.get(urlCoupon, { params });
