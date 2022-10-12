import { useMutation } from "react-query";
import { createNewAdmin } from "../services";

export const useCreateNewAdmin = () => {
  return useMutation(createNewAdmin);
};
