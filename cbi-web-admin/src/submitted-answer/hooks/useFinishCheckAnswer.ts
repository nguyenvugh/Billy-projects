import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { finishCheckAnswerService } from "../services";

function useFinishCheckAnswer() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.SUBMITTED_ANSWER_ADD, finishCheckAnswerService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.SUBMITTED_ANSWER_LIST),
  };
}

export { useFinishCheckAnswer };
