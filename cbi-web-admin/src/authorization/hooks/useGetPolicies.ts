import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { Policy } from "../interfaces";
import { getAllPolices } from "../services";

function useGetPolicies() {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<Policy[]>, Error>([QUERY_KEYS.POLICY_LIST], () => getAllPolices()),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.POLICY_LIST),
  };
}

export { useGetPolicies };
