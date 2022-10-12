import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICategoryCallback } from '../interfaces';
import { getCategoryPolicyById } from '../services';

export const useGetCategoryById = ({ id, callback }: { id: number; callback: ICategoryCallback }) =>
  useQuery([QUERY_KEYS.CATEGORY_DETAIL, id], () => getCategoryPolicyById(id), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
