import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { List } from "src/common/interfaces/common.interface";
import { GetUserAccountParams, UserAccountList } from "../interfaces";
import { getAllUserAccounteService } from "../services";

function useGetUserAccount(params: GetUserAccountParams) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<List<UserAccountList>>, Error>(
      [QUERY_KEYS.USER_ACCOUNT_LIST, params],
      () => getAllUserAccounteService(params),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useGetUserAccount };
