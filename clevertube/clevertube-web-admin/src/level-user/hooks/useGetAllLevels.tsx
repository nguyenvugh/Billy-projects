import { useQuery } from "react-query";
import { getAllLevels } from "../services";
import { QUERY_KEY } from "src/common/constants/querykey.constants";

export const useGetAllLevels = () => {
  return useQuery(QUERY_KEY.LEVEL_LIST, getAllLevels);
};
