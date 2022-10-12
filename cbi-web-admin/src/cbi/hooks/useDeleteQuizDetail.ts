import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { deleteQuizDetailService } from "../services";

function useDeleteQuizDetail() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.QUIZ_DETAIL_DELETE, deleteQuizDetailService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_LEVEL_LIST),
  };
}

export { useDeleteQuizDetail };
