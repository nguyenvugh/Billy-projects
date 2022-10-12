import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { deleteDocumentsService } from "../services";

function useDeleteDocuments() {
  const queryClient = useQueryClient();
  return {
    ...useMutation(QUERY_KEYS.DOCUMENT_LIST, deleteDocumentsService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.DOCUMENT_LIST),
  };
}

export { useDeleteDocuments };
