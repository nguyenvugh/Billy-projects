import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { ICategoryCallback, IResponseCate } from '../interfaces';
import { deleteCategory } from '../services';
import { cancelMultiQueries } from 'src/utils/cacelCategoryInvalidate';
import { invalidateMultiQueries } from 'src/utils/invalidateMultiQueries';

export function useDeleteCategory(callback: ICategoryCallback) {
  const queryClient = useQueryClient();

  return useMutation(deleteCategory, {
    onMutate: async (catetegoryIds: number[]) => {
      const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.CATEGORY_LIST_ENTERPRISE);
      cancelMultiQueries(queryClient, keys);

      const previousCategory = keys.map(
        (key) => queryClient.getQueryData<IResponseCate>(key) || ({} as IResponseCate)
      );
      keys.forEach((queryKey) => {
        queryClient.setQueryData<IResponseCate>(queryKey, (old) => {
          if (!old) return {} as IResponseCate;
          const newCategory = (old?.data?.data || []).filter((p) => !catetegoryIds.includes(p.id));
          const total = old?.data?.total - (old?.data?.data.length - newCategory.length);
          return {
            data: {
              data: [...newCategory],
              total,
            },
          };
        });
      });

      return { previousCategory, keys };
    },
    onSuccess: (_result, _variables, context) => {
      if (!context) return;

      callback.onSuccess && callback.onSuccess();
    },
    onError: (_error, _variables, context) => {
      if (!context?.previousCategory || !context.previousCategory.length) return;
      callback.onError && callback.onError();
    },
    onSettled(data, error, variables, context) {
      invalidateMultiQueries(queryClient, context?.keys);
    },

    retry: 2,
  });
}
