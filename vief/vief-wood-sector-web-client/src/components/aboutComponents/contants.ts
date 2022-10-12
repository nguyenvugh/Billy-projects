import { LANG } from "@/src/common/constants/common.constant";
import { Lang, SearchParams } from "@/src/common/interfaces/common.interface";

export const CLIENT_ID = "vMRhfaPfadaQ5anWl1Zttb3uFoHr_p6zcLNclnF2mNg";
export const IMG_URL = "https://api.unsplash.com/photos/random?count=5&client_id=";

export const getParamSearchPicture = ({ lang = "vi", ...params }: SearchParams): SearchParams => ({
  field: "WOOD",
  lang: (lang || LANG.vi) as Lang,
  ...params,
});
