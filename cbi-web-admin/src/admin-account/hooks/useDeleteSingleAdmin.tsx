import { useMutation, useQueryClient } from "react-query";
import { deleteSingleAdmin } from "../services";

export const useDeleteSingleAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSingleAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
