import { AxiosError, AxiosRequestConfig } from "axios";
import axiosConfig from "./axiosConfig";
// import { handleServiceError } from "../utils/apiErrorService";

export const getApi = async <TResponse>(
  path: string,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosConfig.get<TResponse>(path, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postApi = async <TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosConfig.post<TResponse>(path, payload, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putApi = async <TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosConfig.put<TResponse>(path, payload, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteApi = async <TResponse>(
  path: string
): Promise<TResponse> => {
  try {
    const response = await axiosConfig.delete<TResponse>(path);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const patchApi = async <TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosConfig.patch<TResponse>(path, payload, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
