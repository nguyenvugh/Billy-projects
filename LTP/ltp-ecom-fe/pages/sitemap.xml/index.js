import { getProductsCategorySiteMap } from "@ltp/services/sitemap";
import { getValidSlug } from "@ltp/utils/index";
import { WEB_DOMAIN } from "@ltp/utils/constant";
import { genSitemapContent, genSitemapIndex } from "@ltp/utils/sitemap.constatns";
import { concatUrls } from "@ltp/utils/validate-url";
import Custom404 from "pages/404";

export async function getServerSideProps({ locale, res }) {
  if (res) {
    try {
      const categories = await getProductsCategorySiteMap({ type: "featured" }, locale);
      const listCateSlug = (categories.data?.results || []).map((cate) => {
        return getValidSlug(cate);
      });
      res.setHeader("Content-Type", "text/xml");
      res.write(generateSiteMap(listCateSlug));
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

function generateSiteMap(listSlugs = []) {
  const categoriesXmlData = listSlugs.map((slug) => {
    const location = concatUrls(WEB_DOMAIN, `/sitemap/${slug}.xml`);
    return genSitemapContent(location);
  });

  const sitemapData = [
    ...categoriesXmlData,
    genSitemapContent(concatUrls(WEB_DOMAIN, "/sitemap/categories.xml")),
    genSitemapContent(concatUrls(WEB_DOMAIN, "/sitemap/tin-moi.xml")),
  ];

  return genSitemapIndex(sitemapData.join(""));
}

export default function SiteMap() {
  return <Custom404 />;
}
