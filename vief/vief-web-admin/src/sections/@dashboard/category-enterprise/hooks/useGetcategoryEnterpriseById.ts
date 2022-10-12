import { getCategoryById } from '../services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetCategoryEnterpriseById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_LIST, id], () => getCategoryById(id), {
      staleTime: 5000,
    }),
  };
};
