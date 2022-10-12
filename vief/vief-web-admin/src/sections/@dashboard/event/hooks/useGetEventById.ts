import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IEventCallback } from '../interfaces';
import { getEventById } from '../services';

export const useGetEventById = ({ id, callback }: { id: number; callback: IEventCallback }) =>
  useQuery([QUERY_KEYS.EVENT_DETAIL, id], () => getEventById(id), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
