import { useMutation } from "react-query";
import { deleteLevels } from "../services";
import { useToast } from "@chakra-ui/react";

export const useDeleteLevel = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(deleteLevels, {
      onSuccess() {
        refetch();
        toast({
          title: "Deleted",
          status: "success",
          duration: 3000,
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
