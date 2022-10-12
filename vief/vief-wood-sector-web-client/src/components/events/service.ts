import { toUrlQueryString } from "@/src/common/lib/common.lib";
import { API_EVENTS, API_EVENTS_CLIENT } from "./../../common/constants/urlAPI";
import { execute } from "@/src/common/lib/request";
import { Lang, ListResponse, RequestCallBack } from "@/src/common/interfaces/common.interface";
import { Event } from "../section-event/interface";
import { EventSearchParams } from "./interface";
import { LANG, LIST_DATA_RESPONSE } from "@/src/common/constants/common.constant";

export async function getArticleEvent({ lang = "vi", ...params }: EventSearchParams) {
  try {
    const res = await execute.get<ListResponse<Event>>(toUrlQueryString(API_EVENTS, params), {
      headers: { lang },
    });

    return res.data;
  } catch (err) {
    return LIST_DATA_RESPONSE;
  }
}

export async function getEventDetailService(slug: string, lang: Lang, requestCallback?: RequestCallBack<Event>) {
  if (!slug) return undefined;
  try {
    const res = await execute.get<{ data: Event }>(`${API_EVENTS_CLIENT}/${slug}`, {
      headers: { lang: lang || LANG.vi },
    });
    if (requestCallback) {
      requestCallback.onSuccess && requestCallback.onSuccess(res.data.data);
    }
    return res.data.data;
  } catch (error) {
    if (requestCallback) {
      requestCallback.onError && requestCallback.onError(error);
    }
    return undefined;
  }
}
