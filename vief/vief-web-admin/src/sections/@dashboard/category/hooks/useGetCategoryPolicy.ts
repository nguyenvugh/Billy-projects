import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { CategoryPolicySearchParams, IResCategories } from '../interfaces';
import { getCategoryPolicy } from '../services';

export function useGetCategories(params: CategoryPolicySearchParams) {
  const query = useQuery<IResCategories>([QUERY_KEYS.CATEGORY_LIST_POLICY, params], () =>
    getCategoryPolicy(params)
  );

  return { data: query.data || ({} as IResCategories), isLoading: query.isLoading };
}
