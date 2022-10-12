import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { List, Params } from "src/common/interfaces/common.interface";
import { Documents } from "../interfaces";
import { getAllDocumentsService } from "../services";

function useGetDocuments(params: Params) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<List<Documents>>, Error>([QUERY_KEYS.DOCUMENT_LIST, params], () =>
      getAllDocumentsService(params),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useGetDocuments };
