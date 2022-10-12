import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { editCategory } from "../services";

function useEditCategory() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.CATEGORY_EDIT, editCategory),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useEditCategory };
