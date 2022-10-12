import { List, Params } from "src/common/interfaces/common.interface";
import { toUrlQueryString } from "src/common/lib/common.lib";
import { execute } from "src/common/lib/request";
import { ADMIN_CBI, DELETE_QUIZ_GROUP, GET_QUIZ_GROUPS } from "src/common/services/urlAPI";
import {
  CBIS,
  CbiResponse,
  DeleteParams,
  QuizCategoryParam,
  QuizDetailParams,
  QuizGroupListResponse,
  QuizGroupParam,
  QuizLevelResponse,
} from "./interfaces";
export const MAX = 100;
// import BaseService from '../common/service';
// import {Product} from './interface';

export async function addCbiService(cbi: CBIS) {
  return execute.post<CbiResponse>(ADMIN_CBI, cbi);
}

export async function updateCbiService({ id, cbi }: { id: string; cbi: CBIS }) {
  return execute.patch<CbiResponse>(ADMIN_CBI + `/${id}`, cbi);
}

// export const createProduct = async (body: Product) => {
//   // Alert.alert('call api create product');
//   const res = await BaseService.post<Product>('/products', body);
//   return res.data;
// };

// Group

export async function getDetailQuizGroupService(id: string, params: Params) {
  return await execute.get<QuizGroupListResponse>(
    toUrlQueryString(`${GET_QUIZ_GROUPS}/${id}/levels`, params),
  );
}

export async function createQuizGroupService({
  id,
  quizGroupParams,
}: {
  id: string;
  quizGroupParams: QuizGroupParam;
}) {
  return await execute.post(`${GET_QUIZ_GROUPS}/${id}/levels`, quizGroupParams);
}

export async function updateQuizGroupService({
  id,
  level_id,
  quizGroupParams,
}: {
  id: string;
  level_id: string;
  quizGroupParams: QuizGroupParam;
}) {
  return await execute.patch(`${GET_QUIZ_GROUPS}/${id}/levels/${level_id}`, quizGroupParams);
}

export async function deleteQuizGroupService({ id, level_id }: { id: string; level_id: string }) {
  return execute.delete(`${DELETE_QUIZ_GROUP}/${id}/levels/${level_id}`);
}

// Level

export async function getDetailQuizLevelService({
  id,
  level_id,
}: {
  id: string;
  level_id: string;
}) {
  return await execute.get<QuizLevelResponse>(
    toUrlQueryString(`${GET_QUIZ_GROUPS}/${id}/levels/${level_id}/groups`),
  );
}

export async function createQuizCategoryService({
  id,
  level_id,
  quizCategoryParams,
}: {
  id: string;
  level_id: string;
  quizCategoryParams: QuizCategoryParam;
}) {
  return await execute.post(
    `${GET_QUIZ_GROUPS}/${id}/levels/${level_id}/groups`,
    quizCategoryParams,
  );
}

export async function updateQuizLevelService({
  id,
  level_id,
  group_id,
  quizCategoryParams,
}: {
  id: string;
  level_id: string;
  group_id: string;
  quizCategoryParams: QuizCategoryParam;
}) {
  return await execute.patch(
    `${GET_QUIZ_GROUPS}/${id}/levels/${level_id}/groups/${group_id}`,
    quizCategoryParams,
  );
}

export async function deleteQuizLevelService({
  id,
  level_id,
  group_id,
}: {
  id: string;
  level_id: string;
  group_id: string;
}) {
  return execute.delete(`${DELETE_QUIZ_GROUP}/${id}/levels/${level_id}/groups/${group_id}`);
}

export async function createQuizDetailService({
  id,
  level_id,
  group_id,
  quizDetailParams,
}: {
  id: string;
  level_id: string;
  group_id: string;
  quizDetailParams: QuizDetailParams;
}) {
  return await execute.post(
    `${GET_QUIZ_GROUPS}/${id}/levels/${level_id}/groups/${group_id}/questions`,
    quizDetailParams,
  );
}

export async function updateQuizDetailService({
  id,
  level_id,
  group_id,
  question_id,
  quizDetailParams,
}: {
  id: string;
  level_id: string;
  group_id: string;
  question_id: string;
  quizDetailParams: QuizDetailParams;
}) {
  return await execute.patch(
    `${GET_QUIZ_GROUPS}/${id}/levels/${level_id}/groups/${group_id}/questions/${question_id}`,
    quizDetailParams,
  );
}

export async function deleteQuizDetailService({
  id,
  level_id,
  group_id,
  question_id,
}: {
  id: string;
  level_id: string;
  group_id: string;
  question_id: string;
}) {
  return execute.delete(
    `${DELETE_QUIZ_GROUP}/${id}/levels/${level_id}/groups/${group_id}/questions/${question_id}`,
  );
}

export async function getCbiService(params: Params) {
  return execute.get<List<CbiResponse>>(toUrlQueryString(ADMIN_CBI, params));
}

export async function deleteCbiService(id: string) {
  return execute.delete(ADMIN_CBI + `/${id}`);
}

export async function deleteMultipleCbisService(params: DeleteParams) {
  return execute.delete(ADMIN_CBI, { data: params });
}
