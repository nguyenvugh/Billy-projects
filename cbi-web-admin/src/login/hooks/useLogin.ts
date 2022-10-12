import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "../constants/querykeys.constants";
import { login } from "../services";

function useLogin() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.LOGIN, login),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.LOGIN),
  };
}

export { useLogin };
