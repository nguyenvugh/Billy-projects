import { useQuery } from 'react-query';
import { ListResponse } from 'src/common/constants/common.interfaces';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { Document, DocumentSearchParams } from '../interface';
import { getDocuments } from '../services';

export function useGetDocuments(params: DocumentSearchParams) {
  const response = useQuery<ListResponse<Document>>([QUERY_KEYS.DOCUMENT_LIST, params], () =>
    getDocuments(params)
  );
  return { ...response, data: response.data, isLoading: response.isLoading };
}
