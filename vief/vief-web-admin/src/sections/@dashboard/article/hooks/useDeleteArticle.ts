import { useMutation, useQueryClient } from 'react-query';
import { deleteArticle } from '../services';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { cancelMultiQueries } from 'src/utils/cacelCategoryInvalidate';
import { IResponArticle } from '../interfaces';
import { invalidateMultiQueries } from 'src/utils/invalidateMultiQueries';

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return {
    ...useMutation(deleteArticle, {
      onMutate: async ({ id }: { id: number[] }) => {
        const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.ARTICLE_LIST_ENTERPRISE);
        cancelMultiQueries(queryClient, keys);

        const previousCategory = keys.map(
          (key) => queryClient.getQueryData<IResponArticle>(key) || ({} as IResponArticle)
        );
        keys.forEach((queryKey) => {
          queryClient.setQueryData<IResponArticle>(queryKey, (old) => {
            if (!old) return {} as IResponArticle;
            const newArticle = (old?.data?.data || []).filter((p) => !id.includes(p.id));
            const total = old?.data?.total - (old?.data?.data.length - newArticle.length);
            return {
              data: {
                data: [...newArticle],
                total,
              },
            };
          });
        });
        return { previousCategory, keys };
      },
      onError: (_error, _variables, context) => {
        if (!context?.previousCategory || !context.previousCategory.length) return;
      },
      onSettled(data, error, variables, context) {
        invalidateMultiQueries(queryClient, context?.keys);
      },

      retry: 2,
    }),
  };
};
