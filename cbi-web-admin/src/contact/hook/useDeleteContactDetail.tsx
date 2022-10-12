import { useMutation } from "react-query";
import { deleteContactDetail } from "../services";

export const useDeleteContactDetail = () => {
  return useMutation(deleteContactDetail);
};
