import { execute } from "../../common/lib/request/index";
import { EDIT_POSTS, GET_POSTS } from "src/common/constants/urlAPI";
import { PostEditedType } from "./posts.interface";

export const getPosts = () => {
  return execute.get(GET_POSTS);
};
export const editPost = (newData: PostEditedType) => {
  return execute.patch(EDIT_POSTS, newData);
};
