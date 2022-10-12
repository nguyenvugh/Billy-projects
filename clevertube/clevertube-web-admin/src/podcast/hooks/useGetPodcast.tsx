import { useMutation } from "react-query";
import { getPodcast } from "../services";

export const useGetPodcast = () => {
  return {
    ...useMutation(getPodcast),
  };
};
