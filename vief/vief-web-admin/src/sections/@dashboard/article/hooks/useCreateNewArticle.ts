import { createNewArticle } from '../services';
import { useMutation, useQueryClient } from 'react-query';
import { IArticleCallback } from '../interfaces';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { invalidateMultiQueries } from 'src/utils/invalidateMultiQueries';
export const useCreateNewArticle = (callback: IArticleCallback) => {
  const queryClient = useQueryClient();
  
  return {
    ...useMutation(createNewArticle, {
      onSuccess: () => {
        invalidateMultiQueries(queryClient,[QUERY_KEYS.ARTICLE_LIST])
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
