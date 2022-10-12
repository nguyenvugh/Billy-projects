import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { List } from "src/common/interfaces/common.interface";
import { toTotalPage } from "src/common/lib/common.lib";
import { SubmittedAnswerParams, SubmittedAnswerResponse, SubmittedAnswerType } from "../interfaces";
import { getSubmittedAnswerService } from "../services";

function useGetSubmittedAnswers(params: SubmittedAnswerParams, type: SubmittedAnswerType) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<AxiosResponse<List<SubmittedAnswerResponse>>, Error>(
    [QUERY_KEYS.SUBMITTED_ANSWER_LIST, { params }],
    () => getSubmittedAnswerService(params, type),
  );
  const dataAnswer = data?.data.results || [];
  const totalPage = toTotalPage(data?.data.total);

  return {
    dataAnswer,
    totalPage,
    isLoading,
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.SUBMITTED_ANSWER_LIST),
  };
}

export { useGetSubmittedAnswers };
