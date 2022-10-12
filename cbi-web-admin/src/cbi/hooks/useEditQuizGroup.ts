import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { updateQuizGroupService } from "../services";

function useEditQuizGroup() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.QUIZ_GROUP_EDIT, updateQuizGroupService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_GROUP_LIST),
  };
}

export { useEditQuizGroup };
