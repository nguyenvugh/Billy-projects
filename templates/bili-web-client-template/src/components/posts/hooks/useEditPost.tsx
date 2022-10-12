import { useMutation, useQueryClient } from "react-query";
import { editPost } from "../services";
import { EDIT_POST } from "src/common/constants/querykeys.constant";

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(EDIT_POST, editPost),
    invalidate: () => queryClient.invalidateQueries(EDIT_POST),
  };
};
