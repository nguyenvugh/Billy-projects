import { execute } from "src/common/lib/request";
import { FETCH_DATA_USER, UPDATE_PASSWORD } from "src/common/services/urlAPI";

export const updatePassword = (newPassword: any) => {
  return execute.patch(UPDATE_PASSWORD, newPassword);
};

export const fetchDataUser = async () => {
  return execute.get(FETCH_DATA_USER);
};
