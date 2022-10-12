import { useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { QUERY_KEY } from "src/common/constants/querykey.constants";
import { getVideoById } from "../services";

export const useGetVideoById = (id: number) => {
  const toast = useToast();
  return useQuery([QUERY_KEY.VIDEO, id], () => getVideoById(id), {
    onSuccess() {
      toast({
        title: "Loading data",
        description: "Please wait...",
        status: "info",
        duration: 1000,
      });
    },
    onError() {
      toast({
        title: "Error",
        status: "error",
      });
    },
  });
};
