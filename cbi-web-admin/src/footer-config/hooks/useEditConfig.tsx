import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONFIG } from "src/common/constants/routes.constants";
import { useToast } from "src/common/hooks/useToast";
import { editConfig } from "../services";

export const useEditConfig = () => {
  const navigate = useNavigate();
  const toast = useToast();
  return {
    ...useMutation(editConfig, {
      onSuccess() {
        toast({ title: "Cập nhật cấu hình thành công!" });
        navigate(ROUTE_CONFIG);
      },
    }),
  };
};
