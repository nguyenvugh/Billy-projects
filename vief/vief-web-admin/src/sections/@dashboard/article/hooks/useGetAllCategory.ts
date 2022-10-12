import { getAllCategoty } from '../services';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetAllCategory = (type: string) => {
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_LIST_ENTERPRISE], () => getAllCategoty({ type: type }), {
      staleTime: 2000,
    }),
  };
};
