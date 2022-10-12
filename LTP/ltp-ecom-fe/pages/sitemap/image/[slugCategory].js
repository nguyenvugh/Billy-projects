import { getProductsCategorySiteMap, getProductsSiteMap } from "@ltp/services/sitemap";
import { getValidSlug } from "@ltp/utils/index";
import { WEB_DOMAIN } from "@ltp/utils/constant";
import { genImageSitemapIndex, genSitemapImageContent } from "@ltp/utils/sitemap.constatns";
import Custom404 from "pages/404";

export async function getServerSideProps({ locale, res, params: { slugCategory } }) {
  if (res) {
    try {
      const category_slug = slugCategory.split(".xml")[0].replace("Image-", "");
      const categories = await getProductsCategorySiteMap({}, locale);
      const listCateSlug = (categories.data?.results || []).map((cate) => {
        return getValidSlug(cate);
      });
      if (listCateSlug.includes(category_slug)) {
        const products = await getProductsSiteMap({ category_slug }, locale);
        res.setHeader("Content-Type", "text/xml");
        res.write(generateSiteMapImage(products.data?.results || [], locale));
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

function generateSiteMapImage(listProduct = [], locale) {
  const categoriesXmlData = listProduct.map((product) =>
    genSitemapImageContent(product, locale, WEB_DOMAIN),
  );

  return genImageSitemapIndex(categoriesXmlData.join(""));
}

export default function CategorySiteMapImage() {
  return <Custom404 />;
}
