import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { Params } from "src/common/interfaces/common.interface";
import { QuizGroupListResponse } from "../interfaces";
import { getDetailQuizGroupService } from "../services";

function useDetailQuizGroup(id: string, params: Params) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<QuizGroupListResponse>, Error>(
      [QUERY_KEYS.QUIZ_GROUP_LIST, id, params],
      () => getDetailQuizGroupService(id, params),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.QUIZ_GROUP_LIST),
  };
}

export { useDetailQuizGroup };
