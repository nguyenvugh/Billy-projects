import { QueryClient, QueryKey } from 'react-query';

export const invalidateMultiQueries = (queryClient: QueryClient, keys?: QueryKey[]) => {
  keys?.forEach((key) => {
    queryClient.invalidateQueries(key);
  });
};
