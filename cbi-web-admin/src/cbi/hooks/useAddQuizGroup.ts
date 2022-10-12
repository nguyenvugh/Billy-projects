import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { createQuizGroupService } from "../services";

function useAddQuizGroup() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.QUIZ_GROUP_ADD, createQuizGroupService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_GROUP_LIST),
  };
}

export { useAddQuizGroup };
