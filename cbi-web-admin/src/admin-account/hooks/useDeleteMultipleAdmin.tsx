import { useMutation, useQueryClient } from "react-query";
import { deleteMultipleAdmin } from "../services";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";

export const useDeleteMultipleAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMultipleAdmin, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.GET_LIST_ADMIN),
  });
};
