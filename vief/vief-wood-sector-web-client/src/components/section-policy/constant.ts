import { LANG } from "@/src/common/constants/common.constant";
import { Lang, SearchParams } from "./../../common/interfaces/common.interface";
export const getParamSearchPolicy = ({
  lang = "vi",
  ...params
}: SearchParams): SearchParams => ({
  field: "WOOD",
  type: "POLICY",
  page: 1,
  isFeature: 1,
  lang: (lang || LANG.vi) as Lang,
  ...params,
});

export const ARTICLE_POLICY_SIZE = 6;
