import { editEnterpriseCategory } from '../services';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useEditEnterpriseCategory = () => {
  const queryClient = useQueryClient();

  return {
    ...useMutation(editEnterpriseCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST);
      },
    }),
  };
};
