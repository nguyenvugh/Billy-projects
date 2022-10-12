import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { AdminAccountSearchParams, IResAdminAccounts } from '../interface';
import { getAdminAccounts } from '../services';

export function useGetAdminAccounts(params: AdminAccountSearchParams) {
  // const query = useQuery<IResAdminAccounts>([QUERY_KEYS.ADMIN_ACCOUNT_LIST, params], () => getAdminAccounts(params));

  // return { data: query.data || ({} as IResAdminAccounts), isLoading: query.isLoading };

  return {
    ...useQuery(
      [QUERY_KEYS.ADMIN_ACCOUNT_LIST, params],
      () => getAdminAccounts(params),
      {
        staleTime: 2000,
      }
    ),
  };
}
