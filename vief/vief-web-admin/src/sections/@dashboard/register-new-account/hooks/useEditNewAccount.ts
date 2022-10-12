import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAddNewAccountCallback } from '../interface';
import { editNewAccount } from '../services';

export const useEditAccount = (callback: IAddNewAccountCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editNewAccount, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.ADMIN_ACCOUNT_DETAIL, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
