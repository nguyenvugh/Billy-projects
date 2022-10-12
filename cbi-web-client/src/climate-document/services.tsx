import axiosConfig from "@cbi/services/axiosConfig";
import { List, PageParams } from "src/common/interfaces/common.interface";
import { URL_DOCUMENTS } from "src/common/services/urlAPI";
import { toUrlQueryString } from "src/common/utils/index";
import { Documents } from "./documents.interface";

export const getDocuments = (params: PageParams) => {
  return axiosConfig.get<List<Documents>>(
    toUrlQueryString(URL_DOCUMENTS, params)
  );
};
