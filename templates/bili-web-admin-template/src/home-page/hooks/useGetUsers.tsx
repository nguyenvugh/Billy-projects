import { useQuery } from "react-query";
import { getUsers } from "../services";
import { QUERY_KEY } from "src/common/constants/querykey.constants";

export const useGetUsers = () => {
  return useQuery(QUERY_KEY.USER_LIST, getUsers);
};
