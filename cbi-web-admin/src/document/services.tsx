import { List, Params } from "src/common/interfaces/common.interface";
import { toUrlQueryString } from "src/common/lib/common.lib";
import { execute } from "src/common/lib/request";
import { ADMIN_DOCUMENTS } from "src/common/services/urlAPI";
import { Documents, DocumentsCreate } from "./interfaces";

export async function getAllDocumentsService(params: Params) {
  return await execute.get<List<Documents>>(toUrlQueryString(ADMIN_DOCUMENTS, params));
}

export async function deleteDocumentsService(ids: string[]) {
  return await execute.delete(ADMIN_DOCUMENTS, { data: { ids } });
}

export async function addDocumentsService(document: DocumentsCreate) {
  return await execute.post<Documents>(ADMIN_DOCUMENTS, document);
}
