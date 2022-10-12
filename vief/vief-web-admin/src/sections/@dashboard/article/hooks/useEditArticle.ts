import { editArticle } from '../services';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useEditArticle = () => {
  const queryClient = useQueryClient();

  return {
    ...useMutation(editArticle, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.ARTICLE_LIST_ENTERPRISE]);
      },
    }),
  };
};
