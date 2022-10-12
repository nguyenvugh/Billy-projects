import { useQuery } from "react-query";
import { getPosts } from "../services";
import { GET_POSTS } from "../../../common/constants/querykeys.constant";

export const useGetPosts = () => {
  return useQuery(GET_POSTS, getPosts);
};
