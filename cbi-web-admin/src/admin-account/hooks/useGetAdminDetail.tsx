import { useQuery } from "react-query";
import { getDataAdminDetail } from "../services";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";

export const useGetAdminDetail = (id: string) => {
  return useQuery([QUERY_KEYS.GET_DETAIL_ADMIN, id], () => getDataAdminDetail(id));
};
