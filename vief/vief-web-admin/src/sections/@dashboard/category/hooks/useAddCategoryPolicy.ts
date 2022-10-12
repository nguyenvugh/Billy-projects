import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { ICategoryCallback } from '../interfaces';
import { addCategoryPolicy } from '../services';
import { invalidateQueries } from 'src/utils/categoryQuery';

export const useAddCategory = (callback: ICategoryCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.CATEGORY_LIST_POLICY);
  return {
    ...useMutation(addCategoryPolicy, {
      onSuccess: (_result, _variables, context) => {
        if (!context) return;
        invalidateQueries(queryClient, keys)
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};