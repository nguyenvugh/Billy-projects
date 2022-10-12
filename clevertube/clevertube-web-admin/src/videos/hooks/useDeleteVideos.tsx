import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { deleteVideos } from "../services";

export const useDeleteVideos = (refetch) => {
  const toast = useToast();

  return {
    ...useMutation(deleteVideos, {
      onSuccess() {
        refetch();
        toast({
          title: "Deleted",
          status: "success",
          duration: 3000,
        });
      },
      onMutate() {
        toast({
          title: "Deleting level...",
          status: "success",
        });
      },
      onError() {
        toast({
          title: "Error",
          status: "error",
        });
      },
    }),
  };
};
