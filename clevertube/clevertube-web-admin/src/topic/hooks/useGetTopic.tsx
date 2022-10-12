import { useMutation } from "react-query";
import { getTopic } from "../services";

export const useGetTopic = () => {
  return {
    ...useMutation(getTopic),
  };
};
