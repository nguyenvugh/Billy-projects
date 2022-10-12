import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { DetailSubmittedAnswerResponse, SubmittedAnswerType } from "../interfaces";
import { getDetailSubmittedAnswerService } from "../services";

function useGetDetailSubmittedAnswer(id: string, type: SubmittedAnswerType) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<DetailSubmittedAnswerResponse>, Error>(
      [QUERY_KEYS.SUBMITTED_ANSWER_DETAIL, id],
      () => getDetailSubmittedAnswerService(id, type),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.SUBMITTED_ANSWER_DETAIL),
  };
}

export { useGetDetailSubmittedAnswer };
