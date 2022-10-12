import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { deleteQuizGroupService } from "../services";

function useDeleteQuizGroup() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.QUIZ_GROUP_DELETE, deleteQuizGroupService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_GROUP_LIST),
  };
}

export { useDeleteQuizGroup };
