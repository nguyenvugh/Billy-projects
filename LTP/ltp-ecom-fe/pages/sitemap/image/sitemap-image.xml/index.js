import { getProductsCategorySiteMap } from "@ltp/services/sitemap";
import { getValidSlug } from "@ltp/utils/index";
import { WEB_DOMAIN } from "@ltp/utils/constant";
import { genSitemapContent, genSitemapIndex } from "@ltp/utils/sitemap.constatns";
import { concatUrls } from "@ltp/utils/validate-url";
import Custom404 from "pages/404";

export async function getServerSideProps({ locale, res }) {
  if (res) {
    try {
      const categories = await getProductsCategorySiteMap({}, locale);
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
    const location = concatUrls(WEB_DOMAIN, `/sitemap/image/Image-${slug}.xml`);
    return genSitemapContent(location);
  });

  return genSitemapIndex(categoriesXmlData.join(""));
}

export default function SiteMapImage() {
  return <Custom404 />;
}
