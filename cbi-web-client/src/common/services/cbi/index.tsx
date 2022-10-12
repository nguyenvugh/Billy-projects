// import instance from "src/common/services/axios";

import {
  bodyRequestPostQuestion,
  ParamGetListCBI,
  responseEvaluateI,
  responseLevelEvaluateI,
  responseQuizLevelI,
} from "./cbi.interface";
import { URL_CBI, URL_CBI_SLUG, URL_SECRECT_CBI } from "@cbi/services/urlAPI";
import { getApi, postApi } from "@cbi/services/api";

export const getListEvaluateCBI = async (params: ParamGetListCBI) => {
  return await getApi<responseEvaluateI>(URL_CBI, { params });
};

export const getFormEvaluate = () => {
  const res = require("./listQuizCBIUpdate.json");
  return res;
};

export const getListLevelEvaluate = async (slug: string) => {
  const url = `${URL_CBI_SLUG}/${slug}/levels`;
  return await getApi<responseLevelEvaluateI>(url);
};

export const getListQuizLevel = async (slugGroup: string, slugLevel: string) => {
  const url = `${URL_CBI_SLUG}/${slugGroup}/levels/slug/${slugLevel}`;
  return await getApi<responseQuizLevelI>(url);
};

export const postListQuizLevel = async (
  slugGroup: string,
  slugLevel: string,
  payload: bodyRequestPostQuestion
) => {
  const url = `${URL_CBI_SLUG}/${slugGroup}/levels/slug/${slugLevel}`;
  return await postApi(url, payload);
};

export const getIsCanOpenSecretCbi = async () => {
  return await getApi(URL_SECRECT_CBI);
};
