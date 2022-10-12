import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { QuizLevelResponse } from "../interfaces";
import { getDetailQuizLevelService } from "../services";

function useDetailQuizLevel(id: string, level_id: string) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<QuizLevelResponse>, Error>(
      [QUERY_KEYS.QUIZ_LEVEL_LIST, id, level_id],
      () => getDetailQuizLevelService({ id, level_id }),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_LEVEL_LIST),
  };
}

export { useDetailQuizLevel };
