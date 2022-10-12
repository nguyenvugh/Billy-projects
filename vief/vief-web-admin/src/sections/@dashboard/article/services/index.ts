import axiosInstance from 'src/utils/axios';
import { API_ARTICLE_ADMIN, API_CATEGORY_ADMIN } from 'src/common/constants/apis';
import { toQueryString } from 'src/common/lib/common.lib';
import { IFormArticleNew } from '../interfaces';

interface urlObj {
  page?: number;
  size?: number;
  field?: string;
  title?: string;
  isFeature?: number;
}

export const getListArticle = async (obj: urlObj) =>
  axiosInstance.get(API_ARTICLE_ADMIN + toQueryString(obj));

export const getArtilceById = async (id: number) => axiosInstance.get(API_ARTICLE_ADMIN + `/${id}`);

export const createNewArticle = async (newData: IFormArticleNew) =>
  axiosInstance.post(API_ARTICLE_ADMIN, newData);

export const deleteArticle = async (data: any) =>
  axiosInstance.delete(API_ARTICLE_ADMIN, { data: data });

export const editArticle = async ({ id, newData }: { id: number; newData: any }) =>
  axiosInstance.patch(API_ARTICLE_ADMIN + `/${id}`, newData);
export const getAllCategoty = async ({ type }: { type: string }) =>
  axiosInstance.get(API_CATEGORY_ADMIN + `?type=${type}`);

export const deleteCategoryEnterprise = async (id: number[]) => {
  const data = await (await axiosInstance.delete(API_CATEGORY_ADMIN, { data: { id } })).data;
  return data;
};
