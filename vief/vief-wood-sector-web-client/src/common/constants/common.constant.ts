import { Article, ArticleDetail, Lang, SearchParams } from "../interfaces/common.interface";

// DECLARE COMMON CONSTANTS
export const LANG: Record<Lang, Lang> = {
  vi: "vi",
  en: "en",
};

export const COMMON = "THIS_IS_COMMON";

export const PICTURE = (version?: string) => "https://source.unsplash.com/user/c_v_r/1600x900" + "?v=" + version;

export const PAGE_SIZE = 10;

export const LIST_DATA_RESPONSE = {
  data: [],
  total: 0,
};

export const ARTICLE_RESPONSE: Article = {
  thumbnail: {
    id: -1,
    key: "",
    type: "png",
    url: "",
  },
  title: "",
  slug: "",
  shortDesc: "",
  content: "",
  lang: "vi",
  author: "",
  field: "WOOD",
  isFeature: 1,
  category: {
    id: -1,
    name: "",
    slug: "",
    type: "POLICY",
  },
  id: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  version: 0,
};

export const ARTICLE_DETAIL_RESPONSE: ArticleDetail = {
  article: ARTICLE_RESPONSE,
  category: {
    id: -1,
    name: "",
    shortDesc: "",
    slug: "",
    type: "POLICY",
  },
  id: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  version: 0,
};

export const SEARCH_PARAMS_DEFAULT: SearchParams = {
  page: 1,
  size: PAGE_SIZE,
  field: "WOOD",
};
