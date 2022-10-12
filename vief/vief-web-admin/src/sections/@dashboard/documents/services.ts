import { API_DOCUMENT } from 'src/common/constants/apis';
import { ListResponse } from 'src/common/constants/common.interfaces';
import execute from 'src/utils/axios';
import { Document, DocumentPayload, DocumentSearchParams } from './interface';

export const getDocuments = async (params: DocumentSearchParams) => {
  const data = await (
    await execute.get<ListResponse<Document>>(API_DOCUMENT, { params, headers: { lang: 'vi' } })
  ).data;
  return data;
};

export const deleteDocuments = async (ids: number[]) => {
  const data = await (await execute.delete<Document>(API_DOCUMENT, { data: { ids: ids } })).data;
  return data;
};

export const addDocuments = async (payload: DocumentPayload) => {
  const data = await (await execute.post<Document>(API_DOCUMENT, payload)).data;
  return data;
};

export const editDocuments = async (payload: DocumentPayload, id: number) => {
  const data = await (await execute.patch<Document>(`${API_DOCUMENT}/${id}`, payload)).data;
  return data;
};
