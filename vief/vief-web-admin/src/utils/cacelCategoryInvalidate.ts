import { QueryClient, QueryKey } from "react-query";

export const cancelMultiQueries = (queryClient: QueryClient, keys: QueryKey[]) => {
  keys.forEach((key) => {
    queryClient.cancelQueries(key);
  });
};
