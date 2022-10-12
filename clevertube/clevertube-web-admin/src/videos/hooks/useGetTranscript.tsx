import { useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { QUERY_KEY } from "src/common/constants/querykey.constants";
import { getTranscript } from "../services";

export const useGetTranscrip = (url: string) => {
  const toast = useToast();
  return useQuery(
    [QUERY_KEY.GET_TRANSCRIPT_VIDEO, url],
    () => getTranscript({ url, videoType: "youtube" }),
    {
      onSuccess() {
        toast.closeAll();
        toast({
          title: "Success",
          status: "success",
          duration: 1000,
        });
      },
      // onError() {
      //   toast({
      //     title: "Error",
      //     status: "error",
      //   });
      // },
    }
  );
};
