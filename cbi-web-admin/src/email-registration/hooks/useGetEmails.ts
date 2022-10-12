import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { List, Params } from "src/common/interfaces/common.interface";
import { Emails } from "../emails.interface";
import { getAllEmailsService } from "../emails.services";

function useGetEmails(params: Params) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<List<Emails>>, Error>([QUERY_KEYS.EMAIL_LIST, { params }], () =>
      getAllEmailsService(params),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.EMAIL_LIST),
  };
}

export { useGetEmails };
