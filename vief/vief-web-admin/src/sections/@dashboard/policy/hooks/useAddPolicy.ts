import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { IResPolicys,IPolicyCallback } from '../interface';
import { addPolicy } from '../services';

export const useAddPolicy = (callback: IPolicyCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.ARTICLE_LIST);
  return {
    ...useMutation(addPolicy, {
      onSuccess: (_result, _variables, context) => {
        if (!context) return;
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
