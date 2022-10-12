import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { updateTranscript } from "../services";

export const useEditTranscript = () => {
  const toast = useToast();
  return {
    ...useMutation(updateTranscript, {
      onSuccess() {
        toast.closeAll();
        toast({
          title: "Success",
          status: "success",
          duration: 2000,
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
