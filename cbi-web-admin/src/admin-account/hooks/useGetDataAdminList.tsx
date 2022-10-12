import { useQuery, useQueryClient } from "react-query";
import { getDataAdminList } from "../services";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";

export const useGetDataAdminList = (page, limit) => {
  const queryClient = useQueryClient();
  return {
    ...useQuery([QUERY_KEYS.GET_LIST_ADMIN, page, limit], () => getDataAdminList(page, limit), {
      staleTime: 2000,
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.GET_LIST_ADMIN),
  };
};
