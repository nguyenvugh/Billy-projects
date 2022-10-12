import { useMutation } from "react-query";
import { deleteAllPodcasts } from "../services";
import { useToast } from "@chakra-ui/react";

export const useDeleteAllPodcasts = (refetch) => {
  const toast = useToast();

  return {
    ...useMutation(deleteAllPodcasts, {
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
