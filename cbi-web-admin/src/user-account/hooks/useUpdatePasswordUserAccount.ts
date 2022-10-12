import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useToast } from "src/common/hooks/useToast";
import { ErrorResponse } from "src/common/interfaces/common.interface";
import { updatePasswordUserAccounteService } from "../services";

function useUpdatePasswordUserAccount() {
  const toast = useToast();

  return {
    ...useMutation(updatePasswordUserAccounteService, {
      onSuccess() {
        toast({
          title: "Thay đổi mật khẩu thành công!",
        });
      },
      onError(error: AxiosResponse<ErrorResponse>) {
        toast({
          title: error.data?.message,
          status: "error",
        });
      },
    }),
  };
}

export { useUpdatePasswordUserAccount };
