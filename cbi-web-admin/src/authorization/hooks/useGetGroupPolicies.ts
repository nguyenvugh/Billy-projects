import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { ResGroupPoliciesGet } from "../interfaces";
import { getAllGroupPolices } from "../services";

function useGetGroupPolicies() {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<ResGroupPoliciesGet[]>, Error>([QUERY_KEYS.GROUP_POLICY_LIST], () =>
      getAllGroupPolices(),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.GROUP_POLICY_LIST),
  };
}

export { useGetGroupPolicies };
