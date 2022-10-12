import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/utils/getRelatedCacheKeys';
import { IEventCallback, IResEvents } from '../interfaces';
import { deleteEvents } from '../services';

export function useDeleteEvents(callback: IEventCallback) {
  const queryClient = useQueryClient();

  return useMutation(deleteEvents, {
    onMutate: async (eventIds: number[]) => {
      const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EVENT_LIST);
      keys.forEach(async (key) => {
        await queryClient.cancelQueries(key);
      });

      const previousEvent = keys.map(
        (key) => queryClient.getQueryData<IResEvents>(key) || ({} as IResEvents)
      );
      keys.forEach((queryKey) => {
        queryClient.setQueryData<IResEvents>(queryKey, (old) => {
          if (!old) return {} as IResEvents;
          const newEvents = (old.data || []).filter((p) => !eventIds.includes(p.id));
          const total = old.total - (old.data.length - newEvents.length);
          return {
            data: [...newEvents],
            total,
          };
        });
      });

      return { previousEvent, keys };
    },
    onSuccess: (_result, _variables, context) => {
      if (!context) return;
      context.keys.forEach((queryKey) => {
        queryClient.invalidateQueries(queryKey);
      });

      callback.onSuccess && callback.onSuccess();
    },
    onError: (_error, _variables, context) => {
      if (!context?.previousEvent || !context.previousEvent.length) return;
      callback.onError && callback.onError();

      context.keys.forEach((key, index) => {
        queryClient.setQueryData<IResEvents>(key, context?.previousEvent[index]);
      });
    },
    retry: 2,
  });
}
