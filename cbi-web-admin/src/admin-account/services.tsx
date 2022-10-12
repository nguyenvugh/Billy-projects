import { execute } from "src/common/lib/request";
import { ADMIN_DETAIL, ADMIN_LIST, CASL_GROUP_POLICY } from "src/common/services/urlAPI";

interface editInfoAdminTypes {
  id: string;
  newData: object;
}
export const getDataAdminList = (page, limit) => {
  return execute.get(ADMIN_LIST + "?page=" + page + "&limit=" + limit);
};
export const getDataAdminDetail = (id: string) => {
  return execute.get(ADMIN_DETAIL + id);
};
export const createNewAdmin = (newAdmin: any) => {
  return execute.post(ADMIN_LIST, newAdmin);
};
export const editInfoAdmin = ({ id, newData }: editInfoAdminTypes) => {
  return execute.patch(ADMIN_DETAIL + id, newData);
};
export const deleteSingleAdmin = (id) => {
  return execute.delete(ADMIN_DETAIL + id);
};
export const deleteMultipleAdmin = (adminDeleted) => {
  return execute.delete(ADMIN_LIST, { data: adminDeleted });
};
export const getGroupPermission = () => {
  return execute.get(CASL_GROUP_POLICY);
};
