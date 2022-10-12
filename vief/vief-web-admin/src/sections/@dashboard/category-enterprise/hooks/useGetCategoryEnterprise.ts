import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { CategorySearchParams } from '../interfaces';
import { getListCategoryEnterprise } from '../services';

export const useGetCategoryEnterprise = (SearchParams: CategorySearchParams) => {
  return {
    ...useQuery(
      [QUERY_KEYS.CATEGORY_LIST_ENTERPRISE, SearchParams],
      () => getListCategoryEnterprise(SearchParams),
      {
        staleTime: 2000,
      }
    ),
  };
};
