import { List } from "src/common/interfaces/common.interface";
import { toUrlQueryString } from "src/common/lib/common.lib";
import { execute } from "src/common/lib/request";
import { USER_ACCOUNT } from "src/common/services/urlAPI";
import {
  ChangeUserPassword,
  GetUserAccountParams,
  UpdateStatusUserAccount,
  UserAccountDetail,
  UserAccountList,
} from "./interfaces";

export async function getAllUserAccounteService(params: GetUserAccountParams) {
  return await execute.get<List<UserAccountList>>(toUrlQueryString(USER_ACCOUNT, params));
}

export async function updateStatusUserAccounteService({
  userId,
  ...payload
}: UpdateStatusUserAccount) {
  return await execute.patch(USER_ACCOUNT + "/update-status/" + userId, payload);
}

export async function getDetailUserAccounteService(id: string) {
  return await execute.get<UserAccountDetail>(USER_ACCOUNT + "/" + id);
}

export async function updatePasswordUserAccounteService({
  userId,
  ...payload
}: ChangeUserPassword) {
  return await execute.patch(USER_ACCOUNT + "/update-password/" + userId, payload);
}
