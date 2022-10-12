import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { addCategoryService } from "../services";

function useAddCategory() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.CATEGORY_ADD, addCategoryService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useAddCategory };
