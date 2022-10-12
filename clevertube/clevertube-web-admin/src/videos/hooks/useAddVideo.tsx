import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { createVideo } from "../services";

export const useAddVideo = () => {
  const toast = useToast();
  return {
    ...useMutation(createVideo, {
      onSuccess() {
        toast.closeAll();
        toast({
          title: "Created",
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
