import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IResAdminAccounts,IAdminAccountCallback } from '../interface';
import { deleteAdminAccounts } from '../services';

export function useDeleteAdminAccounts(callback: IAdminAccountCallback) {
  const queryClient = useQueryClient();

  return useMutation(deleteAdminAccounts, {
    onMutate: async (adminIds: number[]) => {
      await queryClient.cancelQueries([QUERY_KEYS.ADMIN_ACCOUNT_LIST]);
      const previousAdmin = queryClient.getQueryData<IResAdminAccounts>([QUERY_KEYS.ADMIN_ACCOUNT_LIST]);
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.ARTICLE_LIST])
        .forEach(({ queryKey }) => {
          queryClient.setQueryData<IResAdminAccounts>(queryKey, (old) => {
            if (!old) return {} as IResAdminAccounts;
            const newAdmins = (old.data || []).filter((p) => !adminIds.includes(p.id));
            const total = old.total - (old.data.length - newAdmins.length);
            return {
              data: [...newAdmins],
              total,
            };
          });
        });

      return { previousAdmin };
    },
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.ADMIN_ACCOUNT_LIST])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
    },
    onError: (_error, _variables, context) => {
      if (!context || !context.previousAdmin) return;
      callback.onError && callback.onError();
      queryClient.setQueryData<IResAdminAccounts>([QUERY_KEYS.ADMIN_ACCOUNT_LIST], context.previousAdmin);
    },
    retry: 2,
  });
}
