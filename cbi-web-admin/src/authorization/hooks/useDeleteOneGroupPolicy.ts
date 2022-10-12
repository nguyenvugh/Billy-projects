import { ROUTE_AUTHORIZATION } from "./../../common/constants/routes.constants";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { useToast } from "src/common/hooks/useToast";
import { deleteOneGroupPolices } from "../services";

function useDeleteOneGroupPolicy() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  return {
    ...useMutation(deleteOneGroupPolices, {
      onSuccess() {
        navigate(ROUTE_AUTHORIZATION);
      },
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

export { useDeleteOneGroupPolicy };
