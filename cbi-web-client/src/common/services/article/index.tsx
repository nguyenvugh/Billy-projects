import { toUrlQueryString } from "src/common/utils/index";
import { URL_ARTICLE, URL_ARTICLE_CATEGORY } from "src/common/services/urlAPI";
import axiosConfig from "../axiosConfig";
import { Article, ArticleCategory, ArticleParams } from "./article.interface";
import { List } from "src/common/interfaces/common.interface";

export const getArticle = (params: ArticleParams) => {
  return axiosConfig.get<List<Article>>(
    toUrlQueryString(URL_ARTICLE, { ...params, status: "PUBLISH" })
  );
};

export const getAllCategory = () => {
  return axiosConfig.get<ArticleCategory[]>(URL_ARTICLE_CATEGORY + "/find-all");
};

export const getArticleDetail = (slug: string) => {
  return axiosConfig.get<Article>(URL_ARTICLE + `/slug/${slug}`);
};

export const getNewsHot = () => {
  // return axios.get(urlNewsHost);
  const res = require("./hotnews.json");
  return res;
};

export const getCategoryNews = ({ id, ...params }: any) => {
  // return axios.get(`${urlCategoryNews}/${id}`, { params });
  const res = require("./categorynews.json");
  return res;
};

export const getNewsDetail = (id: number) => {
  const res = require("./news-detail.json");
  return res;
};
