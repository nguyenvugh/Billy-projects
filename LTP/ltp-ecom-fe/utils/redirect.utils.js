import { LANG_EN } from "@ltp/constants/languages";
import { HTTP_STATUS_CODE } from "./constant";
import { addTrailingSlash } from "./validate-url";

export function getDataRedirect(code, linkRedirectTo3x, linkRedirectToVI, locale, res) {
  let isRedirect = false;
  let dataRedirect = {
    props: {},
  };
  const statusCode = HTTP_STATUS_CODE.includes(code) ? code : 200;
  if ([301, 302].includes(statusCode)) {
    isRedirect = true;
    dataRedirect = {
      redirect: {
        destination: addTrailingSlash(linkRedirectTo3x),
        statusCode,
      },
    };
  }
  if (locale === LANG_EN && statusCode === 404) {
    isRedirect = true;
    res.statusCode = 302;
    res.setHeader("Location", addTrailingSlash(linkRedirectToVI));
  }

  return { isRedirect, dataRedirect, statusCode };
}
