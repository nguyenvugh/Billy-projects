import { createNewCategory } from '../services';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(createNewCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.CATEGORY_LIST]);
      },
    }),
  };
};
