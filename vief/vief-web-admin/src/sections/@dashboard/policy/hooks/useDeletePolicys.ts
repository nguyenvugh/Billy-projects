import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IResPolicys,IPolicyCallback } from '../interface';
import { deletePolicys } from '../services';

export function useDeletePolicys(callback: IPolicyCallback) {
  const queryClient = useQueryClient();

  return useMutation(deletePolicys, {
    onMutate: async (policyIds: number[]) => {
      await queryClient.cancelQueries([QUERY_KEYS.ARTICLE_LIST]);
      const previousPolicy = queryClient.getQueryData<IResPolicys>([QUERY_KEYS.ARTICLE_LIST]);
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.ARTICLE_LIST])
        .forEach(({ queryKey }) => {
          queryClient.setQueryData<IResPolicys>(queryKey, (old) => {
            if (!old) return {} as IResPolicys;
            const newPolicys = (old.data || []).filter((p) => !policyIds.includes(p.id));
            const total = old.total - (old.data.length - newPolicys.length);
            return {
              data: [...newPolicys],
              total,
            };
          });
        });

      return { previousPolicy };
    },
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.ARTICLE_LIST])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
    },
    onError: (_error, _variables, context) => {
      if (!context || !context.previousPolicy) return;
      callback.onError && callback.onError();
      queryClient.setQueryData<IResPolicys>([QUERY_KEYS.ARTICLE_LIST], context.previousPolicy);
    },
    retry: 2,
  });
}
