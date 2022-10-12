import { getArtilceById } from '../services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetArticleById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.ARTICLE_LIST_ENTERPRISE, id], () => getArtilceById(id)),
  };
};
