import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IEventCallback } from '../interfaces';
import { aditEvent } from '../services';

export const useEditEvent = (callback: IEventCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(aditEvent, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EVENT_DETAIL, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
