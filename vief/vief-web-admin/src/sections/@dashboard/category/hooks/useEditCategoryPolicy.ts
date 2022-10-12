import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICategoryCallback } from '../interfaces';
import { editCategoryPolicy } from '../services';

export const useEditCategory = (callback: ICategoryCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editCategoryPolicy, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.CATEGORY_DETAIL, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
