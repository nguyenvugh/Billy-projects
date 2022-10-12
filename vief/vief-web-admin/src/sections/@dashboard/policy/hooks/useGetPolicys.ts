import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { PolicySearchParams, IResPolicys } from '../interface';
import { getPolicys } from '../services';

export function useGetPolicys(params: PolicySearchParams) {
  const query = useQuery<IResPolicys>([QUERY_KEYS.ARTICLE_LIST, params], () => getPolicys(params));

  return { data: query.data || ({} as IResPolicys), isLoading: query.isLoading };
}
