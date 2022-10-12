import { getProductsCategorySiteMap } from "@ltp/services/sitemap";
import { getValidSlug } from "@ltp/utils/index";
import { WEB_DOMAIN } from "@ltp/utils/constant";
import { genSitemapContentUrl, genSitemapUrlSet } from "@ltp/utils/sitemap.constatns";
import { concatUrls } from "@ltp/utils/validate-url";
import Custom404 from "pages/404";

export async function getServerSideProps({ locale, res }) {
  if (res) {
    // const categories = await getProductsCategorySiteMap({}, locale);
    try {
      const categories = await getProductsCategorySiteMap({}, locale);
      const listCateSlug = (categories.data?.results || []).map((cate) => {
        return getValidSlug(cate);
      });
      res.setHeader("Content-Type", "text/xml");
      res.write(generateSiteMap(listCateSlug, locale));
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

function generateSiteMap(listSlugs = [], locale) {
  const categoriesXmlData = listSlugs.map((slug) => {
    const asPath = locale === "vi" ? "danh-muc" : `${locale}/category`;
    const location = concatUrls(WEB_DOMAIN, `/${asPath}/${slug}/`);
    return genSitemapContentUrl(
      location,
      `
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
      `,
    );
  });

  return genSitemapUrlSet(categoriesXmlData.join(""));
}

export default function CategorySiteMap() {
  return <Custom404 />;
}
