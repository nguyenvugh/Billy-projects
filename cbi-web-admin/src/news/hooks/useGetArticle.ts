import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { List } from "src/common/interfaces/common.interface";
import { Article, ArticleParams } from "../interfaces";
import { getAllArticleService } from "../services";

function useGetArticle(params: ArticleParams) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<List<Article>>, Error>([QUERY_KEYS.ARTICLE_LIST, params], () =>
      getAllArticleService(params),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.ARTICLE_LIST),
  };
}

export { useGetArticle };
