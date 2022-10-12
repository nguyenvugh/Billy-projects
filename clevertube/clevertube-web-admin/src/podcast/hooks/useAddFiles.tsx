import { useMutation } from "react-query";
import { addFiles } from "../services";
import { useToast } from "@chakra-ui/react";

export const useAddFiles = () => {
  const toast = useToast();
  return {
    ...useMutation(addFiles, {
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
