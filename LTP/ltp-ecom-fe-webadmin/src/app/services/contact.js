import { apiContact } from "app/axios/urlApi";
import axios from "app/services/axios";

export const getContactList = params => {
  return axios.get(apiContact, {params});
};

export const deleteContact = (params) => {
  return axios.delete(`${apiContact}`, {params});
};
