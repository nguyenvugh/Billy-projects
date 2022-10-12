import { useMutation } from "react-query";
import { editLevel } from "../services";
import { useToast } from "@chakra-ui/react";

export const useEditLevel = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(editLevel, {
      onSuccess() {
        refetch();
        toast({
          title: "Edited",
          status: "success",
          duration: 3000,
        });
      },
      onMutate() {
        toast({
          title: "Editing your level...",
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
