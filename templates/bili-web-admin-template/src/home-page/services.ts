import { execute } from "src/common/lib/request/index";
import { EDIT_USER_INFO, USERS } from "src/common/constants/urlAPI";
import { UserType } from "src/common/interfaces/common.interfaces";

export const getUsers = () => {
  return execute.get(USERS);
};
export const editUser = (userEdit: UserType) => {
  return execute.patch(EDIT_USER_INFO, userEdit);
};
