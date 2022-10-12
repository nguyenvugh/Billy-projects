import { useMutation } from "react-query";
import { getLevel } from "../services";

export const useGetLevel = () => {
  return {
    ...useMutation(getLevel),
  };
};
