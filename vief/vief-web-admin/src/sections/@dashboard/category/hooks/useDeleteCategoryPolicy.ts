import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { ICategoryCallback, IResCategories } from '../interfaces';
import { deleteCategoryPolicy } from '../services';
import { cancelMultiQueries } from 'src/utils/cacelCategoryInvalidate';

export function useDeleteCategories(callback: ICategoryCallback) {
  const queryClient = useQueryClient();

  return useMutation(deleteCategoryPolicy, {
    onMutate: async (catetegoryIds: number[]) => {
      const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.CATEGORY_LIST_POLICY);
      cancelMultiQueries(queryClient ,keys)

      const previousCategory = keys.map(
        (key) => queryClient.getQueryData<IResCategories>(key) || ({} as IResCategories)
      );
      keys.forEach((queryKey) => {
        queryClient.setQueryData<IResCategories>(queryKey, (old) => {
          if (!old) return {} as IResCategories;
          const newCategory = (old.data || []).filter((p) => !catetegoryIds.includes(p.id));
          const total = old.total - (old.data.length - newCategory.length);
          return {
            data: [...newCategory],
            total,
          };
        });
      });

      return { previousCategory, keys };
    },
    onSuccess: (_result, _variables, context) => {
      if (!context) return;
      cancelMultiQueries(queryClient ,context.keys)
      callback.onSuccess && callback.onSuccess();
    },
    onError: (_error, _variables, context) => {
      if (!context?.previousCategory || !context.previousCategory.length) return;
      callback.onError && callback.onError();

      context.keys.forEach((key, index) => {
        queryClient.setQueryData<IResCategories>(key, context?.previousCategory[index]);
      });
    },
    retry: 2,
  });
}
