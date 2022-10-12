import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTE_NEWS } from "src/common/constants/routes.constants";
import { useToast } from "src/common/hooks/useToast";
import { addArticleService } from "../services";

function useAddArticle() {
  const toast = useToast();
  const navigate = useNavigate();
  return {
    ...useMutation(addArticleService, {
      onMutate: (variables) => {
        return variables;
      },
      onSuccess() {
        toast({
          position: "top",
          title: "Bài viết đã được tạo thành công!",
        });
        navigate(ROUTE_NEWS);
      },
      onError(err: AxiosResponse) {
        toast({
          title: err.data?.message,
          status: "error",
        });
      },
    }),
  };
}

export { useAddArticle };
