import { useQuery } from "react-query";
import { getAllTopics } from "../services";
import { QUERY_KEY } from "src/common/constants/querykey.constants";
import { useToast } from "@chakra-ui/react";

export const useGetAllTopics = (page: number, limit: number) => {
  const toast = useToast();
  return useQuery(QUERY_KEY.TOPIC_LIST, () => getAllTopics(page, limit), {
    onSuccess() {
      toast.closeAll();
      toast({
        title: "Loading data topic",
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
