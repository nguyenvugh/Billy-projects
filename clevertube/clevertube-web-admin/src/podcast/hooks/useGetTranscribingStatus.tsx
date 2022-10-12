import { useMutation } from "react-query";
import { getTranscribingStatus } from "../services";

export const useGetTranscribingStatus = () => {
  return {
    ...useMutation(getTranscribingStatus),
  };
};
