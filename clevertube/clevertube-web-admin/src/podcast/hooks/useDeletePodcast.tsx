import { useMutation } from "react-query";
import { deletePodcast } from "../services";
import { useToast } from "@chakra-ui/react";

export const useDeletePodcast = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(deletePodcast, {
      onSuccess() {
        refetch();
        toast({
          title: "Deleted",
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
