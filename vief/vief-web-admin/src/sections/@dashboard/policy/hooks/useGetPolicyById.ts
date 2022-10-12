import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IPolicyCallback } from '../interface';
import { getPolicyById } from '../services';

export const useGetPolicyById = ({ id, callback }: { id: number; callback: IPolicyCallback }) =>
  useQuery([QUERY_KEYS.ARTICLE_LIST, id], () => getPolicyById(id), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
