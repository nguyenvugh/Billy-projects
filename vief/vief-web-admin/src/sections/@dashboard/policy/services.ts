import { API_ARTICLE_ADMIN,API_CATEGORY_ADMIN } from 'src/common/constants/apis';
import { PolicySearchParams, IResPolicys, IFormPolicyNew,IEditPolicy } from './interface';
import execute from 'src/utils/axios';

export const getPolicys = async (params: PolicySearchParams) => {
  const data = (await (
    await execute.get(`${API_ARTICLE_ADMIN}?type=POLICY`, { params, headers: { lang: 'vi' } })
  ).data) as IResPolicys;
  return data;
};

export const deletePolicys = async (ids: number[]) => {
  const data = await (await execute.delete(API_ARTICLE_ADMIN, { data: { id: ids } })).data;
  return data;
};

export const addPolicy = (data: IFormPolicyNew) => execute.post(API_ARTICLE_ADMIN, data);

export const getAllCategoty = async () => execute.get(`${API_CATEGORY_ADMIN}?type=POLICY`);

export const getPolicyById = (id: number) => execute.get(`${API_ARTICLE_ADMIN}/${id}`);

export const editPolicy = ({ data, id }: { data: IEditPolicy; id: number }) =>
  execute.patch(`${API_ARTICLE_ADMIN}/${id}`, data);