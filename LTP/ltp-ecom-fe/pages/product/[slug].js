import { ProductDetail } from "@ltp/components/product/Product";
import { LANG_VI } from "@ltp/constants/languages";
import { getProductDetailSlug } from "@ltp/services/product/index";
import { ROUTE_PRODUCT_DETAIL_SLUG } from "@ltp/utils/constant";
import { getDataRedirect } from "@ltp/utils/redirect.utils";

function index({ productDetailProps, comboId, slug, statusCode }) {
  return (
    <ProductDetail
      productDetailProps={productDetailProps}
      comboId={comboId}
      slug={slug}
      statusCode={statusCode}
    />
  );
}

export const getServerSideProps = async ({ query, locale, res, req }) => {
  try {
    const { comboId = null, slug } = query;
    const response = await getProductDetailSlug(slug, {
      lang: locale,
      token: req?.cookies.access_token,
    });
    const { isRedirect, dataRedirect, statusCode } = getDataRedirect(
      response?.code,
      ROUTE_PRODUCT_DETAIL_SLUG(locale, response?.data),
      ROUTE_PRODUCT_DETAIL_SLUG(LANG_VI, slug),
      locale,
      res,
    );
    if (isRedirect) {
      return dataRedirect;
    }
    res.statusCode = statusCode;
    return {
      props: {
        slug,
        comboId,
        productDetailProps: response,
        statusCode,
      },
    };
  } catch (e) {
    res.statusCode = 404;
    return { props: { productDetailProps: {}, comboId: null, query, statusCode: 404 } };
  }
};

export default index;
