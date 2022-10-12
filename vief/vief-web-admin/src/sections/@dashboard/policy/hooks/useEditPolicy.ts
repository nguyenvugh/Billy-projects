import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IPolicyCallback } from '../interface';
import { editPolicy } from '../services';

export const useEditPolicy = (callback: IPolicyCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editPolicy, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.ARTICLE_LIST, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
