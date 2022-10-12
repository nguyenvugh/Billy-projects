import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { EventSearchParams, IResEvents } from '../interfaces';
import { getEvents } from '../services';

export function useGetEvents(params: EventSearchParams) {
  const query = useQuery<IResEvents>([QUERY_KEYS.EVENT_LIST, params], () => getEvents(params));

  return { data: query.data || ({} as IResEvents), isLoading: query.isLoading };
}
