import { LANG } from "@/src/common/constants/common.constant";
import { Lang, SearchParams } from "@/src/common/interfaces/common.interface";

import { FileDownload, Files } from "./interfaces";

export const getParamSearchDocument = ({ lang = "vi", ...params }: SearchParams): SearchParams => ({
  field: "WOOD",
  isFeature: 1,
  page: 1,
  size: 100,
  lang: (lang || LANG.vi) as Lang,
  ...params,
});

export const DOCUMENT_SIZE = 6;

export const getParamSearchFile = ({ key, ...params }: SearchParams): SearchParams => ({
  key: key,
  ...params,
});
