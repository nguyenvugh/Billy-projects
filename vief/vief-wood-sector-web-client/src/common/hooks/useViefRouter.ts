import { LANG } from "@/src/common/constants/common.constant";
import React from "react";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import { Lang } from "../interfaces/common.interface";

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}

function useViefRouter() {
  const router = useRouter();

  function push(url: UrlObject | string, as?: UrlObject, options?: TransitionOptions) {
    router.push(url, as, options);
  }

  function replace(url: UrlObject | string, as?: UrlObject, options?: TransitionOptions) {
    router.replace(url, as, options);
  }

  return { ...router, push, replace, locale: (router.locale || LANG.en) as Lang };
}

export { useViefRouter };
