import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { updateQuizLevelService } from "../services";

function useEditQuizLevel() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.QUIZ_LEVEL_EDIT, updateQuizLevelService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_LEVEL_LIST),
  };
}

export { useEditQuizLevel };
