import { useQuery } from "react-query";
import { QUERY_KEY } from "src/common/constants/querykey.constants";
import { useToast } from "@chakra-ui/react";
import { getVideos } from "../services";

export const useGetVideos = (page: number, limit: number) => {
  const toast = useToast();
  return useQuery([QUERY_KEY.VIDEO_LIST, page, limit], () => getVideos({ page, limit }), {
    onSuccess() {
      // toast({
      //   title: "Loading data",
      //   description: "Please wait...",
      //   status: "info",
      //   duration: 1000,
      // });
    },
    onError() {
      toast({
        title: "Error",
        status: "error",
      });
    },
  });
};
