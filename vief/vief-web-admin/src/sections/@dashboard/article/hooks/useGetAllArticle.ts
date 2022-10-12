import { getListArticle } from '../services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ArticleSearchParams } from '../interfaces';

export const useGetAllArticle = (searchParams: ArticleSearchParams) => {
  return {
    ...useQuery([QUERY_KEYS.ARTICLE_LIST_ENTERPRISE, searchParams], () =>
      getListArticle(searchParams)
    ),
  };
};
