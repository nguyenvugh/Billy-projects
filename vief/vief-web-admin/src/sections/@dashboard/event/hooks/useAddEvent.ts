import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { IEventCallback } from '../interfaces';
import { addEvent } from '../services';

export const useAddEvent = (callback: IEventCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EVENT_LIST);
  return {
    ...useMutation(addEvent, {
      onSuccess: (_result, _variables, context) => {
        if (!context) return;
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
