import { useMutation } from "react-query";
import { editTopic } from "../services";
import { useToast } from "@chakra-ui/react";

export const useEditTopic = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(editTopic, {
      onSuccess() {
        refetch();
        toast({
          title: "Edited success",
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
