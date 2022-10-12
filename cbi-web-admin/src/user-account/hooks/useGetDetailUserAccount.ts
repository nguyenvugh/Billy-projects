import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { UserAccountDetail } from "../interfaces";
import { getDetailUserAccounteService } from "../services";

function useGetDetailUserAccount(userId: string) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<UserAccountDetail>, Error>(
      [QUERY_KEYS.USER_ACCOUNT_LIST, userId],
      () => getDetailUserAccounteService(userId),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useGetDetailUserAccount };
