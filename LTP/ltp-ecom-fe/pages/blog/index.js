import { Box, BreadcrumbItem, BreadcrumbLink, Grid, GridItem } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import NewsHot from "@ltp/components/News/NewsHot";
import useTranslation from "@ltp/hooks/useTranslation";
import { getGeneralNews } from "@ltp/services/news";
import { ROUTE_CATEGORY_NEW, WEB_DOMAIN } from "@ltp/utils/constant";
import { addTrailingSlash, concatUrls } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import { MetadataTags } from "SEOs/meta-tag";
import Blog from "./Blog";
import Company from "./Company";
import ImageCategoryCarousel from "./ImageCarousel";
import Journal from "./Journal";
import Recruitment from "./Recruitment";

export async function getServerSideProps({ locale }) {
  try {
    const generalNews = getGeneralNews({ lang: locale });
    const res = await Promise.all([generalNews]);
    return {
      props: {
        listGeneralNewsProps: res[0].data?.data,
      },
    };
  } catch (e) {
    return { props: { listGeneralNewsProps: [] } };
  }
}
function Category({ listGeneralNewsProps }) {
  const { t, locale } = useTranslation();
  const listFeature = listGeneralNewsProps?.features || [];
  const listCategory = listGeneralNewsProps?.categories || [];
  const data = listCategory.filter((item) => !!(item.childrens || []).length);
  const generalNews1 = Lodash.get(data, "[0]", {});
  const generalNews2 = Lodash.get(data, "[1]", {});
  const generalNews3 = Lodash.get(data, "[2]", {});
  const generalNews4 = data.slice(3);

  return (
    <div>
      <MetadataTags
        title={"Tin Mới, Thông Tin, Kiến Thức Về Nhựa Long Thành | Longthanhplastic.com.vn"}
        notIndex={locale === "en"}
        desContent="Tổng hợp tin tức về công ty Longthanh. Những thông tin, kiến thức về các sản phẩm nhựa long thành."
      />
      <main>
        <Container>
          <Box marginBottom="116px">
            <Breadcrumb>
              <BreadcrumbItem
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
              >
                <a href={concatUrls(WEB_DOMAIN, "/")}>
                  <BreadcrumbLink itemscope="" itemtype="http://schema.org/Thing" itemprop="item">
                    <span itemprop={t("homePage")}>{t("homePage")}</span>
                    <meta itemprop="url" content={concatUrls(WEB_DOMAIN, "/")}></meta>
                  </BreadcrumbLink>
                </a>
                <meta itemprop="position" content="1"></meta>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a
                  href={addTrailingSlash(concatUrls(WEB_DOMAIN, ROUTE_CATEGORY_NEW(locale)))}
                  passHref
                  shallow
                >
                  <BreadcrumbLink>{t("news")}</BreadcrumbLink>
                </a>
              </BreadcrumbItem>
            </Breadcrumb>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(6, 1fr)",
              }}
              gap={6}
              gridGap={{
                base: 0,
                md: 7,
                xl: "30px",
              }}
            >
              <GridItem colSpan={[5, 5, 5, 4, 4]} marginBottom={{ base: "32px", lg: "0px" }}>
                <ImageCategoryCarousel items={listFeature} />
                {!!(generalNews1.childrens || []).length && <Company items={generalNews1} />}
                {!!(generalNews2.childrens || []).length && <Journal items={generalNews2} />}
                {!!(generalNews3.childrens || []).length && <Blog items={generalNews3} />}
                {!!generalNews4.length &&
                  generalNews4.map((item, index) => (
                    <Box key={index}>
                      <Recruitment items={item} />
                    </Box>
                  ))}
              </GridItem>
              <GridItem
                colSpan={[5, 5, 5, 2, 2]}
                display={["none", "none", "none", "block", "block"]}
              >
                <Box marginTop="-54px">
                  <NewsHot />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </main>
    </div>
  );
}
export default Category;
