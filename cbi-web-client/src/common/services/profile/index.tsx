import {
  FormGeneralParamI,
  ResponseUserInforI,
} from "src/ClimateAccount/interface";
import { getApi, patchApi, postApi } from "../api";
import {
  URL_PROFILE,
  URL_UPDATE_PROFILE,
  URL_CHANGE_PASSWORD,
} from "../urlAPI";
import { ResponseChangePassword } from "./interface";

export const getProfile = async () => {
  const url = URL_PROFILE;
  return getApi<ResponseUserInforI>(url);
};

export const updateProfile = async (param: FormGeneralParamI) => {
  const url = URL_UPDATE_PROFILE;
  return patchApi(url, param);
};

export const changePasswordProfile = async (_param: ResponseChangePassword) => {
  const url = URL_CHANGE_PASSWORD;
  return postApi(url, _param);
};
