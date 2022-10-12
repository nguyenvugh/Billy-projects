import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { updateAttributes } from "../services";

export const useEditAttributes = () => {
  const toast = useToast();
  return {
    ...useMutation(updateAttributes, {
      onSuccess() {
        toast.closeAll();
        toast({
          title: "Success",
          status: "success",
          duration: 2000,
        });
      },
    }),
  };
};
