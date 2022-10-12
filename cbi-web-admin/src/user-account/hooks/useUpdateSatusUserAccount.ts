import { ErrorResponse } from "src/common/interfaces/common.interface";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { useToast } from "src/common/hooks/useToast";
import { updateStatusUserAccounteService } from "../services";

function useUpdateSatusUserAccount() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return {
    ...useMutation(updateStatusUserAccounteService, {
      onSuccess() {
        queryClient.invalidateQueries(QUERY_KEYS.USER_ACCOUNT_LIST);
      },
      onError(error: AxiosResponse<ErrorResponse>) {
        toast({
          title: error.data?.message,
          status: "error",
        });
      },
    }),
  };
}

export { useUpdateSatusUserAccount };
