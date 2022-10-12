import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { IAddNewAccountCallback } from '../interface';
import { addAllNewAccount } from '../services';
import { invalidateQueries } from 'src/utils/categoryQuery';

export const useAddNewAccount = (callback: IAddNewAccountCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.ADD_NEW_ACCOUNT);
  return {
    ...useMutation(addAllNewAccount, {
      onSuccess: (_result, _variables, context) => {
        if (!context) return;
        invalidateQueries(queryClient, keys)
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};