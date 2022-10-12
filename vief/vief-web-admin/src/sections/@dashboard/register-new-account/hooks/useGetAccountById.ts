import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAddNewAccountCallback } from '../interface';
import { getAccountById } from '../services';

export const useGetAccountById = ({ id, callback }: { id: number; callback: IAddNewAccountCallback }) =>
  useQuery([QUERY_KEYS.ADMIN_ACCOUNT_DETAIL, id], () => getAccountById(id), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
