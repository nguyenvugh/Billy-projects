import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IEventCallback } from '../interfaces';
import { getRegisterEvent } from '../services';

export const useGetRegisterEventById = ({
  idEvent,
  callback,
}: {
  idEvent: number;
  callback: IEventCallback;
}) =>
  useQuery([QUERY_KEYS.EVENT_DETAIL, idEvent], () => getRegisterEvent(idEvent), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
