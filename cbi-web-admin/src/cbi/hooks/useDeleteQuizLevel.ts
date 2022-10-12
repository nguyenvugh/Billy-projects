import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { deleteQuizLevelService } from "../services";

function useDeleteQuizLevel() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.QUIZ_LEVEL_DELETE, deleteQuizLevelService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_LEVEL_LIST),
  };
}

export { useDeleteQuizLevel };
