import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAuthorizationList } from '../services';

export const useGetAuthorization = () => {
  return {
    ...useQuery([QUERY_KEYS.AUTHORIZATION_LIST], getAuthorizationList, {
      staleTime: 5000,
    }),
  };
};
