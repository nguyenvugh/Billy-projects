import { execute } from "src/common/lib/request";
import { DELETE_CONTACT_DETAIL, GET_CONTACT } from "src/common/services/urlAPI";
import { APIListContactResponse, ContactParamsI } from "./interfaces";

export const getListContactService = (params: ContactParamsI) => {
  return execute.get<APIListContactResponse>(GET_CONTACT, { params });
};

export async function deleteContactService(params) {
  return execute.delete(GET_CONTACT, { data: params });
}
export const deleteContactDetail = (id) => {
  return execute.delete(DELETE_CONTACT_DETAIL + id);
};
