import { useMutation } from "react-query";
import { addPodcast } from "../services";
import { useToast } from "@chakra-ui/react";

export const useAddPodcast = () => {
  const toast = useToast();
  return {
    ...useMutation(addPodcast, {
      onSuccess() {
        toast({
          title: "Created success",
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
