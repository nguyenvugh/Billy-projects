import { LoginI } from "@cbi/components/ModalContainer/SignIn";
import { RegisterI } from "@cbi/components/ModalContainer/SignUp";
import { getApi, patchApi, postApi } from "../api";
import {
  URL_LOGIN,
  URL_REGISTER,
  URL_RESET_PASS,
  URL_VERIFY_PASS,
  URL_VERIFY_EMAIL,
  URL_CBI_USER,
} from "../urlAPI";
import {
  paramCbiUser,
  paramVerifyForgotPassword,
  ResponseCbiUser,
  ResponseCbiUserLevelI,
  ResponseQuestionCbiUser,
} from "./auth.interface";

export const login = async (data: LoginI) => {
  return await postApi(URL_LOGIN, data);
};

export const register = async (data: RegisterI) => {
  return await postApi(URL_REGISTER, data);
};

export const verifyEmail = async (token: string) => {
  const url = `${URL_VERIFY_EMAIL}/${token}`;
  return await postApi(url, {});
};

export const resetForgotPasswordApi = async (email: String) => {
  const url = `${URL_RESET_PASS}`;
  return await postApi(url, { email });
};

export const verifyPasswordApi = async (param: paramVerifyForgotPassword) => {
  const url = `${URL_VERIFY_PASS}`;
  return await patchApi(url, param);
};

export const getCbiUserApi = async (params: paramCbiUser) => {
  const url = URL_CBI_USER;
  return await getApi<ResponseCbiUser>(url, { params });
};

export const getCbiUserLevelApi = async (id: string) => {
  const url = `${URL_CBI_USER}/${id}`;
  return await getApi<ResponseCbiUserLevelI>(url);
};

export const getQuestionCbiUserApi = async (
  idGroup: string,
  idLevel: string
) => {
  const url = `${URL_CBI_USER}/${idGroup}/cbi-user-levels/${idLevel}`;
  return await getApi<ResponseQuestionCbiUser>(url);
};
