import { getUserType } from '../services';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetAllAddNewAccount = () => {
  const queryClient = useQueryClient();
  return {
    ...useQuery([QUERY_KEYS.ADD_NEW_ACCOUNT], () => getUserType(), {
      staleTime: 2000,
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.ADD_NEW_ACCOUNT),
  };
};
