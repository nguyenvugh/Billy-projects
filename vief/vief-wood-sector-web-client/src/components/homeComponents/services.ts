import { LIST_DATA_RESPONSE } from "./../../common/constants/common.constant";
import { Lang, ListResponse } from "./../../common/interfaces/common.interface";
import { execute } from "@/src/common/lib/request";
import { Banner } from "./interfaces";
import { toUrlQueryString } from "@/src/common/lib/common.lib";
import { API_BANNER } from "@/src/common/constants/urlAPI";

export async function getListBannerService(lang: Lang = "vi") {
  try {
    const res = await execute.get<ListResponse<Banner>>(toUrlQueryString(API_BANNER, { fields: "WOOD" }), {
      headers: { lang },
    });
    return res.data;
  } catch (error) {
    console.log("b: ", error);
    return LIST_DATA_RESPONSE;
  }
}
