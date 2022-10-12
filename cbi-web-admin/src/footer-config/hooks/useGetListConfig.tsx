import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { Config } from "../interfaces";
import { getListConfigsService } from "../services";

export const useGetListConfig = () => {
  const queryClient = useQueryClient();
  return {
    ...useQuery<AxiosResponse<Config[], Error>>(QUERY_KEYS.GET_LIST_CONFIG, getListConfigsService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.GET_LIST_CONFIG),
  };
};
