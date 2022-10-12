import { Query, QueryClient, QueryKey } from 'react-query';

export const getRelatedCacheKeys = (queryClient: QueryClient, targetKey: string) =>
  queryClient
    .getQueryCache()
    .getAll()
    .map((query: Query) => query.queryKey)
    .filter((key: QueryKey) => (Array.isArray(key) ? key.includes(targetKey) : key === targetKey));

