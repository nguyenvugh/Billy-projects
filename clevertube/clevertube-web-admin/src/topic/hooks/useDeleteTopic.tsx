import { useMutation } from "react-query";
import { deleteTopic } from "../services";
import { useToast } from "@chakra-ui/react";

export const useDeleteTopic = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(deleteTopic, {
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
