import { LIST_DATA_RESPONSE } from "@/src/common/constants/common.constant";
import { execute } from "@/src/common/lib/request";
import { CLIENT_ID, IMG_URL } from "./contants";

export const getListPictureService = () => {
  try {
    return execute.get(IMG_URL + CLIENT_ID);
  } catch (error) {
    return LIST_DATA_RESPONSE;
  }
  return LIST_DATA_RESPONSE;
};
