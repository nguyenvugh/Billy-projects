import { useMutation } from "react-query";
import { editPodcast } from "../services";
import { useToast } from "@chakra-ui/react";

export const useEditPodcast = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(editPodcast, {
      onSuccess() {
        refetch();
        toast({
          title: "Edited",
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
