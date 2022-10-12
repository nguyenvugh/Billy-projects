import { API_CATEGORY_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/utils/axios';
import {
  CategoryPolicySearchParams,
  IResCategories,
  IFormCategoryPolicyNew,
  IEditCatgoryPolicy,
} from './interfaces';

export const getCategoryPolicy = async (params: CategoryPolicySearchParams) => {
  const policyParams = {...params}
  if(policyParams.field === "ALL") {
    delete policyParams.field
  }
  const data = (await await (
    await axiosInstance.get(API_CATEGORY_ADMIN, { params: policyParams, headers: { lang: 'vi' } })
  ).data) as IResCategories;
  return data;
};

export const deleteCategoryPolicy = async (id: number[]) => {
  const data = await (await axiosInstance.delete(API_CATEGORY_ADMIN, { data: { id } })).data;
  return data;
};

export const addCategoryPolicy = (data: IFormCategoryPolicyNew) =>
  axiosInstance.post(API_CATEGORY_ADMIN, data);

export const getCategoryPolicyById = (id: number) =>
  axiosInstance.get(`${API_CATEGORY_ADMIN}/${id}`);

export const editCategoryPolicy = ({ data, id }: { data: IEditCatgoryPolicy; id: number }) =>
  axiosInstance.patch(`${API_CATEGORY_ADMIN}/${id}`, data);
