import { API_CATEGORY_ADMIN } from 'src/common/constants/apis';
import { toQueryString } from 'src/common/lib/common.lib';
import axiosInstance from 'src/utils/axios';
// import { IPostCreateData, IQueryGetCategories } from './interfaces';
import {
  IQueryGetCategories,
  IResCategories,
  IFormCategoryNew,
  IEditCatgory,
  IPostCreateData,
} from './interfaces';

interface urlObj {
  page?: number;
  size?: number;
  field?: string;
  title?: string;
  isFeature?: number;
}

export const getListCategoryEnterprise = async (obj: urlObj) =>
  axiosInstance.get(API_CATEGORY_ADMIN + toQueryString(obj));

export const deleteCategory = async (id: number[]) => {
  const data = await (await axiosInstance.delete(API_CATEGORY_ADMIN, { data: { id } })).data;
  return data;
};

export const createNewCategory = async (newData: IPostCreateData) =>
  axiosInstance.post(API_CATEGORY_ADMIN, newData);

export const getCategoryEnterpriseById = async (id: number) =>
  axiosInstance.get(API_CATEGORY_ADMIN + `/${id}`);

export const editEnterpriseCategory = async ({ id, newData }: { id: number; newData: any }) =>
  axiosInstance.patch(API_CATEGORY_ADMIN + `/${id}`, newData);

export const addCategory = (data: IFormCategoryNew) => axiosInstance.post(API_CATEGORY_ADMIN, data);

export const getCategoryById = (id: number) => axiosInstance.get(`${API_CATEGORY_ADMIN}/${id}`);

export const editCategory = ({ data, id }: { data: IEditCatgory; id: number }) =>
  axiosInstance.patch(`${API_CATEGORY_ADMIN}/${id}`, data);
