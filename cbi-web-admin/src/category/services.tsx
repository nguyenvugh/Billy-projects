import { List } from "src/common/interfaces/common.interface";
import { toUrlQueryString } from "src/common/lib/common.lib";
import { execute } from "src/common/lib/request";
import {
  CREATE_ARTICLE_CATEGORY,
  DELETE_ARTICLE_CATEGORY,
  GET_ALL_ARTICLE_CATEGORY,
  UPDATE_ARTICLE_CATEGORY,
} from "src/common/services/urlAPI";
import { Category, CategoryParams, DeleteParams, UpdateParams } from "./interfaces";

export async function getAllCategoryService(categoryParams: CategoryParams) {
  const { page, limit } = categoryParams;
  const params = {
    page,
    limit,
  };
  return execute.get<List<Category>>(toUrlQueryString(GET_ALL_ARTICLE_CATEGORY, params));
}

export async function addCategoryService(name: string) {
  return execute.post(CREATE_ARTICLE_CATEGORY, { name });
}

export async function editCategory({ id, name }: UpdateParams) {
  const url = `${UPDATE_ARTICLE_CATEGORY}/${id}`;
  return execute.patch(url, { name });
}

export async function deleteCategoryService(params: DeleteParams) {
  return execute.delete(DELETE_ARTICLE_CATEGORY, { data: params });
}

export async function deleteSingleCategoryService(id: string) {
  return execute.delete(`${DELETE_ARTICLE_CATEGORY}/${id}`);
}
