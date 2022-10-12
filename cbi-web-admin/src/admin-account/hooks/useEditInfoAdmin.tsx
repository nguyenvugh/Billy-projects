import { useMutation } from "react-query";
import { editInfoAdmin } from "../services";

export const useEditInfoAdmin = () => {
  return useMutation(editInfoAdmin);
};
