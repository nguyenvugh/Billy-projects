import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { addDocumentsService } from "../services";

function useAddDocuments() {
  const queryClient = useQueryClient();
  return {
    ...useMutation(QUERY_KEYS.DOCUMENT_LIST, addDocumentsService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.DOCUMENT_LIST),
  };
}

export { useAddDocuments };
