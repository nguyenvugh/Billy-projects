import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { deleteEmailsService } from "../emails.services";

function useDeleteEmails() {
  const queryClient = useQueryClient();
  return {
    ...useMutation(QUERY_KEYS.EMAIL_DELETE, deleteEmailsService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.EMAIL_LIST),
  };
}

export { useDeleteEmails };
