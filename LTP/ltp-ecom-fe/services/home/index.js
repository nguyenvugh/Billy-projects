import axios from "@ltp/services/axios";
import {
  urlCharityHome,
  urlEmailSubscription,
  urlFlashSaleHome,
  urlMenuCategory,
  urlMenuProducts,
  urlPromotionHome,
} from "@ltp/services/urlAPI";

export const getMenuProducts = () => axios.get(urlMenuProducts);

export const getMenuCategory = () => axios.get(urlMenuCategory);

export const getPromotionHome = () => axios.get(urlPromotionHome);

export const getFlashSaleHome = () => axios.get(urlFlashSaleHome);

export const getCharityHome = () => axios.get(urlCharityHome);

export const subscriptionEmail = (data) => axios.post(urlEmailSubscription, data);
