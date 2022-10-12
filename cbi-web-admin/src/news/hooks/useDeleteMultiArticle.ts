import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { deleteMultiArticleService } from "../services";

function useDeleteMultiArticle() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(deleteMultiArticleService, {
      onSuccess() {
        queryClient.invalidateQueries(QUERY_KEYS.ARTICLE_LIST);
      },
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.ARTICLE_LIST),
  };
}

export { useDeleteMultiArticle };
