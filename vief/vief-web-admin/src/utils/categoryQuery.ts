import { QueryClient, QueryKey } from "react-query";

export const invalidateQueries = (queryClient: QueryClient, keys: QueryKey[]) => {
  keys.forEach((key) => {
    queryClient.invalidateQueries(key);
  });
};
