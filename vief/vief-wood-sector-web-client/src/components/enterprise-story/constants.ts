import { LANG } from "@/src/common/constants/common.constant";
import { SearchParams } from "@/src/common/interfaces/common.interface";

export const getParamSearchEnterprise = ({ lang = "vi", ...params }: SearchParams): SearchParams => ({
  field: "WOOD",
  type: "ENTERPRISE",
  page: 1,
  isFeature: 1,
  lang: lang || LANG.vi,
  ...params,
});

export const ARTICLE_ENTERPRISE_SIZE = 7;
