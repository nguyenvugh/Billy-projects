import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { createQuizCategoryService } from "../services";

function useAddQuizLevel() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.QUIZ_LEVEL_ADD, createQuizCategoryService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_LEVEL_LIST),
  };
}

export { useAddQuizLevel };
