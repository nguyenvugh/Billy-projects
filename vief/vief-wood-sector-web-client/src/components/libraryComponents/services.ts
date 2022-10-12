import { LANG, LIST_DATA_RESPONSE } from "@/src/common/constants/common.constant";
import { API_DOCUMENT, API_DOWNLOADFILE } from "@/src/common/constants/urlAPI";
import { ListResponse, RequestCallBack, SearchParams } from "@/src/common/interfaces/common.interface";

import { toUrlQueryString } from "@/src/common/lib/common.lib";
import { execute } from "@/src/common/lib/request";
import { DocumentItem, FileDownload } from "./interfaces";

// export function getListDoccumentService() {
//   return execute.get(API_DOCUMENT);
// }

export async function getListDocumentService({
  lang,
  onSuccess,
  onError,
  ...params
}: SearchParams & RequestCallBack<ListResponse<DocumentItem>>) {
  try {
    const res = await execute.get<ListResponse<DocumentItem>>(toUrlQueryString(API_DOCUMENT, params), {
      headers: { lang: lang || LANG.vi },
    });

    onSuccess && onSuccess(res.data);
    return res.data;
  } catch (error) {
    onError && onError(error);
    return LIST_DATA_RESPONSE;
  }
}

export async function getLinkDownloadFile({ key, onSuccess, onError }: SearchParams & RequestCallBack<FileDownload>) {
  try {
    const res = await execute.get<FileDownload>(toUrlQueryString(API_DOWNLOADFILE, { key: key }));
    return res.data;
  } catch (error) {
    onError && onError(error);

    return LIST_DATA_RESPONSE;
  }
}
