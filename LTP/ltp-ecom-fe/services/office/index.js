import { urlOffice, urlCustomerContact } from "@ltp/services/urlAPI";
import axios from "@ltp/services/axios";

export const getOfficeList = () => axios.get(urlOffice);
export const postCustomerContact = (params) => axios.post(urlCustomerContact, params);
