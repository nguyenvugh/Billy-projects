/* eslint-disable no-param-reassign */
import { getNewsSiteMap } from "@ltp/services/sitemap";
import { WEB_DOMAIN } from "@ltp/utils/constant";
import { genSitemapContentUrl, genSitemapUrlSet } from "@ltp/utils/sitemap.constatns";
import { concatUrls } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import Custom404 from "pages/404";
import { getTranslateArray, getValidSlug } from "../../../utils/index";

export async function getServerSideProps({ locale, res }) {
  if (res) {
    try {
      const newsData = await getNewsSiteMap({});
      const listGeneralNewsProps = newsData.data?.data;
      const listCategory = listGeneralNewsProps?.categories || [];
      const dataCate = listCategory.filter((item) => !!(item.childrens || []).length);
      const nativeNewsData = dataCate.reduce((rs, currentCate) => {
        rs = [...rs, ...currentCate.childrens];
        return rs;
      }, []);
      const allNewsData = transformObjTran(nativeNewsData, locale);

      res.setHeader("Content-Type", "text/xml");
      res.write(generateSiteMap(allNewsData, locale));
      res.end();

      return {
        props: {},
      };
    } catch (error) {
      return {
        props: {},
      };
    }
  }
  return {
    props: {},
  };
}

const transformObjTran = (listTrans, lang) => {
  const listChilds = Lodash.map(listTrans, (obj) => {
    const translates = Lodash.get(obj, "translates", []);
    const arrayTrans = getTranslateArray(translates, lang);
    const objTrans = arrayTrans.reduce((obj, item) => {
      if (["slug", "redirect_slug", "redirect_slug_302"].includes(item.language_field)) {
        return {
          [item.language_field]: item.language_value,
        };
      }
      return {
        ...obj,
      };
    }, {});
    return { ...objTrans, ...obj };
  });
  return listChilds;
};

function generateSiteMap(listNews = [], locale) {
  const categoriesXmlData = listNews.map((news) => {
    if (news?.slug || news?.redirect_slug || news?.redirect_slug_302) {
      const slug = getValidSlug(news);
      const asPath = locale === "vi" ? "tin-moi" : `${locale}/blog`;
      const location = concatUrls(WEB_DOMAIN, `/${asPath}/${slug}/`);
      return genSitemapContentUrl(
        location,
        `
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
        `,
      );
    }
    return "";
  });

  return genSitemapUrlSet(categoriesXmlData.join(""));
}

export default function NewsSiteMap() {
  return <Custom404 />;
}
