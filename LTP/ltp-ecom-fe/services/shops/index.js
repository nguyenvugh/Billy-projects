import { urlShops } from "@ltp/services/urlAPI";
import axios from "@ltp/services/axios";

export const getShopList = (params) => axios.get(urlShops, { params });
