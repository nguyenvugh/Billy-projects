import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { changeStatusArticleService } from "../services";

function useChangeStatusArticle() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(changeStatusArticleService, {
      onMutate: (variables) => {
        return variables;
      },
      onError() {},
      onSuccess() {
        queryClient.invalidateQueries(QUERY_KEYS.ARTICLE_LIST);
      },
    }),
  };
}

export { useChangeStatusArticle };
