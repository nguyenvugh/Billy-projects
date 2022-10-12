import { API_GET_USER_TYPE, API_ADD_NEW_ACCOUNT } from "src/common/constants/apis";
import axiosInstance from "src/utils/axios";
import { IFormAddNewAccount } from "./interface";

export const getUserType = async () => axiosInstance.get(API_GET_USER_TYPE);

export const addAllNewAccount = (data: IFormAddNewAccount) =>
  axiosInstance.post(API_ADD_NEW_ACCOUNT, data);

export const editNewAccount = ({ data, id }: { data: IFormAddNewAccount; id: number }) =>
  axiosInstance.patch(`${API_ADD_NEW_ACCOUNT}/${id}`, data);

export const getAccountById = (id: number) => axiosInstance.get(`${API_ADD_NEW_ACCOUNT}/${id}`);
