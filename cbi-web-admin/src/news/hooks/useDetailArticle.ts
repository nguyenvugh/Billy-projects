import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { Article } from "../interfaces";
import { getDetailArticleService } from "../services";

function useDetailArticle(id: string) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<Article>, Error>([QUERY_KEYS.ARTICLE_LIST, id], () =>
      getDetailArticleService(id),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useDetailArticle };
