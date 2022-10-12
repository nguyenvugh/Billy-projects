import { useMutation } from "react-query";
import { deleteAllTopics } from "../services";
import { useToast } from "@chakra-ui/react";

export const useDeleteAllTopics = (refetch) => {
  const toast = useToast();

  return {
    ...useMutation(deleteAllTopics, {
      onSuccess() {
        refetch();
        toast({
          title: "Deleted success",
          status: "success",
          duration: 3000,
        });
      },
      onError(e: any) {
        toast({
          title: e.response.data.message,
          status: "error",
        });
      },
    }),
  };
};
