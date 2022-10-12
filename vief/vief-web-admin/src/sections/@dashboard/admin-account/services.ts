import { API_ADMIN_ACCOUNT} from 'src/common/constants/apis';
import { AdminAccountSearchParams, IResAdminAccounts } from './interface';
import execute from 'src/utils/axios';
export const getAdminAccounts = (params: AdminAccountSearchParams) => {
    const data = execute.get(API_ADMIN_ACCOUNT, { params, headers: { lang: 'vi' } });
    return data;
};
export const deleteAdminAccounts =  (ids: number[]) => {
  const data = execute.delete(`${API_ADMIN_ACCOUNT}/${ids}`, { data: { id: ids } });
  return data;
};