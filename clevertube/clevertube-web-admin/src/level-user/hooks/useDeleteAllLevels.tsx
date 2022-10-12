import { useMutation } from "react-query";
import { deleteAllLevels } from "../services";
import { useToast } from "@chakra-ui/react";

export const useDeleteAllLevels = (refetch) => {
  const toast = useToast();

  return {
    ...useMutation(deleteAllLevels, {
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
