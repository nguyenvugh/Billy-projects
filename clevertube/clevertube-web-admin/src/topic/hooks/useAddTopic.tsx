import { useMutation } from "react-query";
import { addTopic } from "../services";
import { useToast } from "@chakra-ui/react";

export const useAddTopic = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(addTopic, {
      onSuccess() {
        refetch();
        toast({
          title: "Created success",
          status: "success",
          duration: 3000,
        });
      },
      onError(e: any) {
        toast({
          title: e.response.data.message + " " + e.response.data.error,
          status: "error",
        });
      },
    }),
  };
};
