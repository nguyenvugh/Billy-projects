import { keyCache } from "@cbi/constants/data";
import jwt_decode from "jwt-decode";
import Lodash from "lodash";
import { TITLE_LEVEL_CBI, youtubeVideoLinkRegex } from "../constants/index";
import { readCache } from "./dataCache";

interface JWTPayloadI {
  exp: number;
  iat: number;
  usernameOrEmail: string;
}

export const getTranslateArray = (listTrans: any, lang: string) => {
  let arrTrans = Lodash.filter(listTrans, (obj) => obj.language_code === lang);
  return arrTrans;
};

export const toTitleCase = (string: string = "") => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatRouterNewsDetail = (slug: string) => {
  return `/news-detail/${slug}`;
};

export const getAccessToken = () => {
  const userInfo = readCache(keyCache.UserInfo, {});
  return userInfo?.accessToken;
};

export const decodeJwt = (token: string): JWTPayloadI => {
  return jwt_decode(token);
};

export const formatRouterDetail = (string: string) => {
  const router = Lodash.split(string, " ");
  const resRouter = router.join("-");
  return resRouter;
};

export const calcuTitleRestultCBI = (point: number) => {
  if (point > 80) {
    return {
      title: TITLE_LEVEL_CBI.level3,
      image: "/img/global/ic_tienphongkhihau.png",
    };
  } else if (point >= 40 && point <= 80) {
    return {
      title: TITLE_LEVEL_CBI.level2,
      image: "/img/global/ic_hanhdongkhihau.png",
    };
  } else if (point < 40) {
    return {
      title: TITLE_LEVEL_CBI.level1,
      image: "/img/global/ic_ythuckhihau.png",
    };
  }
};

export function toQueryString(objParams: object) {
  const str = [];
  for (const p in objParams)
    if (objParams.hasOwnProperty(p)) {
      str.push(
        // @ts-ignore
        `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`
      );
    }
  return "?" + str.join("&");
}

export function toUrlQueryString(url: string, objParams?: object) {
  return objParams ? `${url}${toQueryString(objParams)}` : url;
}

export function toImageEndoint(imgKey: string) {
  return `${
    process.env.NEXT_PUBLIC_S3_IMG_URL ||
    "https://s3.ap-southeast-1.amazonaws.com/cbi-s3-dev-bucket"
  }/${imgKey}`;
}

export function replaceOembedVideo() {
  document.querySelectorAll("oembed[url]").forEach((element: any) => {
    let urlVideo = element.attributes?.url.value as string;
    if (youtubeVideoLinkRegex.test(urlVideo)) {
      // replace youtube link to https://youtube.com/embed/6L9LDweNOZY format
      urlVideo = urlVideo.replace(youtubeVideoLinkRegex, "$1youtube.com/embed/$6");
    }

    const iframEl = createIfram(urlVideo);
    element.parentNode.replaceChild(iframEl, element);
  });
}

export function createIfram(src: string) {
  const ifrm = document.createElement("iframe");
  ifrm.setAttribute("src", src);
  ifrm.style.width = "100%";
  ifrm.style.minHeight = "480px";
  return ifrm;
}

export function downloadFile(url: string, fileName: string) {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function numberWithCommas(x: number = 0, isGetEmptyDefault?: boolean) {
  if (!x && isGetEmptyDefault) return "";
  if (x === 0) return "0";
  return x.toLocaleString();
}

export function scrollToEl(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const y = element.getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: y,
    behavior: "smooth",
  });
}
