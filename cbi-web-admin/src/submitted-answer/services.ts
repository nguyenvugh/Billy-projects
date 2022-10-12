import { List } from "src/common/interfaces/common.interface";
import { toUrlQueryString } from "src/common/lib/common.lib";
import { execute } from "src/common/lib/request";
import { GET_SUBMITTED_ANSWER, GET_SUBMITTED_ANSWER_UNCHECKED } from "src/common/services/urlAPI";
import {
  CheckParams,
  DetailSubmittedAnswerResponse,
  SubmittedAnswerParams,
  SubmittedAnswerResponse,
  SubmittedAnswerType,
} from "./interfaces";

export async function getSubmittedAnswerService(
  params: SubmittedAnswerParams,
  type: SubmittedAnswerType,
) {
  return execute.get<List<SubmittedAnswerResponse>>(
    toUrlQueryString(
      type === SubmittedAnswerType.UNCHECKED
        ? GET_SUBMITTED_ANSWER_UNCHECKED
        : GET_SUBMITTED_ANSWER,
      params,
    ),
  );
}

export async function getDetailSubmittedAnswerService(id: string, type: SubmittedAnswerType) {
  return execute.get<DetailSubmittedAnswerResponse>(
    `${
      type === SubmittedAnswerType.UNCHECKED ? GET_SUBMITTED_ANSWER_UNCHECKED : GET_SUBMITTED_ANSWER
    }/${id}`,
  );
}

export async function finishCheckAnswerService({
  id,
  params,
}: {
  id: string;
  params: CheckParams;
}) {
  return await execute.patch(`${GET_SUBMITTED_ANSWER_UNCHECKED}/${id}`, params);
}
