import { useMutation } from "react-query";
import { addLevel } from "../services";
import { useToast } from "@chakra-ui/react";

export const useAddLevel = (refetch) => {
  const toast = useToast();
  return {
    ...useMutation(addLevel, {
      onSuccess() {
        refetch();
        toast({
          title: "Created",
          status: "success",
          duration: 3000,
        });
      },
      onMutate() {
        toast({
          title: "Creating your level...",
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
