import { useQuery } from "react-query";
import { getAllPodcasts } from "../services";
import { QUERY_KEY } from "src/common/constants/querykey.constants";
import { useToast } from "@chakra-ui/react";

export const useGetAllPodcasts = (page: number, limit: number) => {
  const toast = useToast();

  return useQuery(QUERY_KEY.PODCAST_LIST, () => getAllPodcasts(page, limit), {
    onSuccess() {
      toast.closeAll();
      toast({
        title: "Loading data podcasts",
        description: "Please wait...",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    },
    onError(e: any) {
      toast({
        title: e.response.data.message,
        status: "error",
      });
    },
  });
};
