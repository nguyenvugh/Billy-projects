import { API_EVENTS } from "@/src/common/constants/urlAPI";
import { Lang, ListResponse } from "@/src/common/interfaces/common.interface";
import { toUrlQueryString } from "@/src/common/lib/common.lib";
import { execute } from "@/src/common/lib/request";

export async function getArticleCompany(lang: Lang = "vi") {
  try {
    const res = await execute.get<ListResponse<Event>>(
      toUrlQueryString(API_EVENTS, { field: "WOOD", timeline: "TOOK_PLACE" }),
      {
        headers: { lang },
      }
    );

    return res.data;
  } catch (err) {
    return err;
  }
}
