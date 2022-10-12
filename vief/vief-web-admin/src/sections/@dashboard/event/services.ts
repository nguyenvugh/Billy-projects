import { API_EVENT, API_EVENT_ADMIN, API_REGISTER_EVENT_ADMIN } from 'src/common/constants/apis';
import execute from 'src/utils/axios';
import {
  EventSearchParams,
  IEditEvent,
  IFormEventNew,
  IResEvents,
  IResRegisterEvents,
} from './interfaces';

export const getEvents = async (params: EventSearchParams) => {
  const data = (await (
    await execute.get(API_EVENT, { params, headers: { lang: 'vi' } })
  ).data) as IResEvents;
  return data;
};

export const deleteEvents = async (ids: number[]) => {
  const data = await (await execute.delete(API_EVENT_ADMIN, { data: { ids } })).data;
  return data;
};

export const addEvent = (data: IFormEventNew) => execute.post(API_EVENT_ADMIN, data);

export const getEventById = (id: number) => execute.get(`${API_EVENT_ADMIN}/${id}`);

export const aditEvent = ({ data, id }: { data: IEditEvent; id: number }) =>
  execute.patch(`${API_EVENT_ADMIN}/${id}`, data);

export const getRegisterEvent = async (idEvent: number): Promise<IResRegisterEvents> =>
  (await execute.get(`${API_REGISTER_EVENT_ADMIN}/${idEvent}`))?.data;
