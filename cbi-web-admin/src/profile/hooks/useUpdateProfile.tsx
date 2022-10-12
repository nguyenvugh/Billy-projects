import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { updatePassword } from "../services";

const useUpdateProfile = (
  onError = (_data: AxiosResponse) => {},
  onSuccess = (_data: AxiosResponse) => {},
) => {
  return useMutation(updatePassword, {
    onSuccess,
    onError,
  });
};
export { useUpdateProfile };
