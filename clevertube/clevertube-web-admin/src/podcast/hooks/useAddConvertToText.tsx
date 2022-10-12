import { useMutation } from "react-query";
import { addConvertToText } from "../services";
import { useToast } from "@chakra-ui/react";

export const useAddConvertToText = () => {
  const toast = useToast();
  return {
    ...useMutation(addConvertToText, {
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
