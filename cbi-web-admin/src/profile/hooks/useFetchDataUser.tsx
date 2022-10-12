import { useQuery } from "react-query";
import { fetchDataUser } from "../services";

const useFetchDataUser = () => {
  return useQuery("getDataUser", fetchDataUser);
};
export { useFetchDataUser };
