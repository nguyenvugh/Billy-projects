import { useQuery } from "react-query";
import { QUERY_KEY } from "src/common/constants/querykey.constants";
import { getLevels } from "../services";

export const useGetLevels = ({ page, limit }) => {
  return useQuery([QUERY_KEY.LEVEL_LIST, page, limit], () => getLevels(page, limit));
};
