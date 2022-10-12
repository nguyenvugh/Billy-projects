import { getProductsCategorySiteMap, getProductsSiteMap } from "@ltp/services/sitemap";
import { getValidSlug } from "@ltp/utils/index";
import { WEB_DOMAIN } from "@ltp/utils/constant";
import { genSitemapContentUrl, genSitemapUrlSet } from "@ltp/utils/sitemap.constatns";
import { concatUrls } from "@ltp/utils/validate-url";
import Custom404 from "pages/404";

export async function getServerSideProps({ locale, res, params: { categorySlug } }) {
  if (res) {
    try {
      const category_slug = categorySlug.split(".xml")[0];
      const categories = await getProductsCategorySiteMap({}, locale);
      const listCateSlug = (categories.data?.results || []).map((cate) => {
        return getValidSlug(cate);
      });
      if (listCateSlug.includes(category_slug)) {
        const products = await getProductsSiteMap({ category_slug }, locale);
        const listProductSlug = (products.data?.results || [])
          .map((cate) => {
            return getValidSlug(cate);
          })
          .filter((slug) => slug);
        res.setHeader("Content-Type", "text/xml");
        res.write(generateSiteMap(listProductSlug, locale));
        res.end();
      }
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
    const asPath = locale === "vi" ? "san-pham" : `${locale}/product`;
    const location = concatUrls(WEB_DOMAIN, `/${asPath}/${slug}/`);
    return genSitemapContentUrl(
      location,
      `
      <changefreq>daily</changefreq>
      <priority>1</priority>
      `,
    );
  });

  return genSitemapUrlSet(categoriesXmlData.join(""));
}

export default function CategorySiteMap() {
  return <Custom404 />;
}
