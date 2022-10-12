import { useQuery } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { getDetailConfig } from "../services";

export const useGetConfigDetail = (key) => {
  return {
    ...useQuery(QUERY_KEYS.GET_DETAIL_CONFIG, () => getDetailConfig(key)),
  };
};
