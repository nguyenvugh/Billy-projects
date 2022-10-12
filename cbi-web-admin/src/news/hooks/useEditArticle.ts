import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { editArticleService } from "../services";

function useEditArticle(
  onSuccess = (_data: AxiosResponse) => {},
  onError = (_data: AxiosResponse) => {},
) {
  return {
    ...useMutation(editArticleService, {
      onError,
      onSuccess,
    }),
  };
}

export { useEditArticle };
