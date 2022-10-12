import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { useToast } from "src/common/hooks/useToast";
import { ErrorResponse } from "src/common/interfaces/common.interface";
import { addCbiService } from "../services";

function useAddCbi() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return {
    ...useMutation(addCbiService, {
      onSuccess() {
        queryClient.invalidateQueries(QUERY_KEYS.CBIS_LIST);
      },
      onError(error: AxiosResponse<ErrorResponse>) {
        toast({
          title: error.data?.message,
          status: "error",
        });
      },
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CBIS_LIST),
  };
}

export { useAddCbi };
