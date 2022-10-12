import { execute } from "src/common/lib/request";
import { ARTICLES, GET_ALL_CATEGORY } from "src/common/services/urlAPI";
import {
  AllCategory,
  Article,
  ArticleCreate,
  ArticleParams,
  ResIsFullPublished,
} from "./interfaces";
import { List } from "src/common/interfaces/common.interface";
import { toUrlQueryString } from "src/common/lib/common.lib";

export async function getAllArticleService(params: ArticleParams) {
  return await execute.get<List<Article>>(toUrlQueryString(ARTICLES, params));
}

export async function getAllCategoryService() {
  return await execute.get<AllCategory[]>(GET_ALL_CATEGORY);
}

export async function deleteMultiArticleService(selectedIds: string[]) {
  return await execute.delete(ARTICLES, {
    data: { ids: selectedIds },
  });
}

export async function addArticleService(article: ArticleCreate) {
  return await execute.post(ARTICLES, article);
}

export async function getDetailArticleService(id: string) {
  return await execute.get<Article>(`${ARTICLES}/${id}`);
}

export async function editArticleService({ article, id }: { article: ArticleCreate; id: string }) {
  return await execute.patch<Article>(`${ARTICLES}/${id}`, article);
}

export async function changeStatusArticleService(id: string) {
  return await execute.put(`${ARTICLES}/change-status/${id}`);
}

export async function checkIsFullPublishService() {
  return await execute.get<ResIsFullPublished>(`${ARTICLES}/check/is-full-published`);
}
