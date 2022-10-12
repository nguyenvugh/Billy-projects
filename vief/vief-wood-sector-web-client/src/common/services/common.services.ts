import { toUrlQueryString } from "../lib/common.lib";
import { execute } from "../lib/request";
import { ARTICLE_DETAIL_RESPONSE, LANG, LIST_DATA_RESPONSE } from "./../constants/common.constant";
import { API_ARTICLE, API_CATEGORY } from "./../constants/urlAPI";
import {
  Article,
  ArticleDetail,
  Category,
  Lang,
  ListResponse,
  RequestCallBack,
  SearchParams,
} from "./../interfaces/common.interface";

export async function getListArticleService({
  lang,
  onSuccess,
  onError,
  ...params
}: SearchParams & RequestCallBack<ListResponse<Article>>) {
  try {
    const res = await execute.get<ListResponse<Article>>(toUrlQueryString(API_ARTICLE, params), {
      headers: { lang: lang || LANG.vi },
    });
    onSuccess && onSuccess(res.data);
    return res.data;
  } catch (error) {
    onError && onError(error);
    return LIST_DATA_RESPONSE;
  }
}

export async function getListCategoryService({
  lang,
  onSuccess,
  onError,
  ...params
}: SearchParams & RequestCallBack<ListResponse<Category>>) {
  try {
    const res = await execute.get<ListResponse<Category>>(toUrlQueryString(API_CATEGORY, params), {
      headers: { lang: lang || LANG.vi },
    });
    onSuccess && onSuccess(res.data);
    return res.data;
  } catch (error) {
    onError && onError(error);
    return LIST_DATA_RESPONSE;
  }
}

export async function getArticleDetailService(
  slug: string,
  lang: Lang,
  requestCallback?: RequestCallBack<ArticleDetail>
) {
  try {
    const res = await execute.get<ArticleDetail>(`${API_ARTICLE}/${slug}`, {
      headers: { lang: lang || LANG.vi },
    });
    if (requestCallback) {
      requestCallback.onSuccess && requestCallback.onSuccess(res.data);
    }
    return res.data;
  } catch (error) {
    if (requestCallback) {
      requestCallback.onError && requestCallback.onError(error);
    }
    return ARTICLE_DETAIL_RESPONSE;
  }
}
