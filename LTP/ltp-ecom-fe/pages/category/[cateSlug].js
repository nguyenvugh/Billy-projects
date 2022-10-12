import { ListProductByCate } from "@ltp/components/Category/components/ListProductByCate";
import { LANG_VI } from "@ltp/constants/languages";
import { getCategoryBySlug } from "@ltp/services/product-category";
import { ROUTE_CATEGORY_SLUG } from "@ltp/utils/constant";
import { getDataRedirect } from "@ltp/utils/redirect.utils";
import Custom404 from "pages/404";
import { MetadataTags } from "SEOs/meta-tag";

function index({ category, slugSelected, statusCode }) {
  if (statusCode === 404) return <Custom404 />;
  return (
    <>
      <MetadataTags title={category?.title_seo} desContent={category?.description_seo} />
      <ListProductByCate slugSelected={slugSelected} category={category} />;
    </>
  );
}

export async function getServerSideProps({ res, locale, params: { cateSlug } }) {
  try {
    const category = await getCategoryBySlug(cateSlug, locale);
    const { isRedirect, dataRedirect, statusCode } = getDataRedirect(
      category?.code,
      ROUTE_CATEGORY_SLUG(locale, category?.data),
      ROUTE_CATEGORY_SLUG(LANG_VI, cateSlug),
      locale,
      res,
    );
    if (isRedirect) {
      return dataRedirect;
    }

    res.statusCode = statusCode;
    return {
      props: {
        category,
        slugSelected: category?.slug || cateSlug,
        statusCode,
      },
    };
  } catch (e) {
    res.statusCode = 404;
    return { props: { slugSelected: cateSlug, statusCode: 404 } };
  }
}
export default index;
