import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { useToast } from "src/common/hooks/useToast";
import { addGroupPolicy } from "../services";

function useAddGroupPolicy() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return {
    ...useMutation(addGroupPolicy, {
      onError(error: AxiosResponse) {
        toast({
          title: error.data?.message,
          status: "error",
        });
      },
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.GROUP_POLICY_LIST),
  };
}

export { useAddGroupPolicy };
