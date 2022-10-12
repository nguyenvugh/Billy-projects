import { useQuery } from "react-query";
import { getGroupPermission } from "../services";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";

export const useGetGroupPermission = () => {
  return useQuery(QUERY_KEYS.GROUP_POLICY_LIST, getGroupPermission);
};
