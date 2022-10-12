import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { concatUrls } from "@ltp/utils/validate-url";
import { REGEX_URL_CONTAIN_QUERY, WEB_DOMAIN } from "@ltp/utils/constant";

export const MetadataTags = ({ title, notIndex, desContent, icon, fromStaticPage }) => {
  const [isNotIndex, setNotIndex] = useState(notIndex);
  const router = useRouter();
  const locale = router?.locale;

  useEffect(() => {
    if (router.locale === "en") {
      setNotIndex(true);
    } else if (REGEX_URL_CONTAIN_QUERY.test(router.asPath)) {
      setNotIndex(true);
    } else {
      setNotIndex(notIndex);
    }
  }, [JSON.stringify(router.query)]);

  const handleLinkCanonical = (router) => {
    if (fromStaticPage) {
      return "";
    }
    if (locale === "en") {
      return concatUrls(WEB_DOMAIN, `/en${router.asPath.split("?")[0]}`);
    }
    return concatUrls(WEB_DOMAIN, router.asPath.split("?")[0]);
  };

  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";
  return (
    <Head>
      <title>{title || "LTP-ecommerce"}</title>
      <meta name="description" content={desContent || "LTP-ecommerce"} />
      <link rel="icon" href={icon || "/favicon.ico"} />
      {/* {linkCanonical && <link rel="canonical" href={linkCanonical} />} */}
      {handleLinkCanonical(router) && <link rel="canonical" href={handleLinkCanonical(router)} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {isDevelopment ? (
        <meta name="robots" content={"noindex,nofollow"} />
      ) : (
        <meta name="robots" content={isNotIndex ? "noindex,follow" : "index,follow"} />
      )}
      {/* <meta name="robots" content="noindex,follow" /> */}
      <meta name="revisit-after" content="1 days" />
      <meta httpEquiv="content-language" content={locale} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Head>
  );
};
