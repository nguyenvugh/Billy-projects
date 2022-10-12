import { getAllCategoty } from '../services';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetAllCategory = () => {
  const queryClient = useQueryClient();
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_LIST_POLICY], () => getAllCategoty(), {
      staleTime: 2000,
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST_POLICY),
  };
};
