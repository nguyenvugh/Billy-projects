import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { ResGroupPoliciesGet } from "../interfaces";
import { getDetailGroupPolices } from "../services";

function useGetDetailGroupPolicies(key: string) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<ResGroupPoliciesGet>, Error>([QUERY_KEYS.GROUP_POLICY_DETAIL], () =>
      getDetailGroupPolices(key),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.GROUP_POLICY_DETAIL),
  };
}

export { useGetDetailGroupPolicies };
