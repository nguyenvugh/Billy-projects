import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "src/common/constants/querykey.constants";
import { editUser } from "../services";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(QUERY_KEY.USER_LIST, editUser),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEY.USER_LIST),
  };
};
