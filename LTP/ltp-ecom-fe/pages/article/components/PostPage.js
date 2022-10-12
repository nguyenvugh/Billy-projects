import { Box, BreadcrumbItem, BreadcrumbLink, Grid, GridItem } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import NewsHot from "@ltp/components/News/NewsHot";
import useTranslation from "@ltp/hooks/useTranslation";
import { getValidSlug } from "@ltp/utils/index";
import { ROUTE_ARITLCE, ROUTE_CATEGORY_NEW, WEB_DOMAIN } from "@ltp/utils/constant";
import { addTrailingSlash, concatUrls } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { MetadataTags } from "SEOs/meta-tag/index";
import PostDetail from "./PostDetail";
import PostRelate from "./PostRelate";

export const PostPage = ({ news, related, hot }) => {
  const router = useRouter();
  const { t, locale: language } = useTranslation();
  const data_detail = useMemo(() => {
    const translates_header = Lodash.get(news, "translates", []);
    const data = translates_header.reduce((obj, item) => {
      if (item.language_code === language) {
        return {
          ...obj,
          [item.language_field]: item.language_value,
        };
      }
      return obj;
    }, {});
    return data;
  }, [language, JSON.stringify(news)]);

  return (
    <div>
      <MetadataTags
        title={data_detail?.title_seo || data_detail?.name}
        desContent={data_detail.description_seo || data_detail?.name}
        notIndex={language === "en"}
      />
      <main>
        <Box px={{ base: 5, md: 40 }} marginBottom="116px">
          <Box
            color="#7B8794"
            margin={["32px 0", "32px 0", "32px 0", "32px 0", "32px 35% 32px 0"]}
            fontSize="12px"
            fontWeight="600"
          >
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
                <a href={addTrailingSlash(ROUTE_CATEGORY_NEW(language))} passHref shallow>
                  <BreadcrumbLink>{t("news")}</BreadcrumbLink>
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
                isCurrentPage
              >
                <a
                  href={concatUrls(WEB_DOMAIN, ROUTE_ARITLCE(language, getValidSlug(data_detail)))}
                >
                  <BreadcrumbLink itemtype="https://schema.org/Thing" itemprop="item">
                    <span itemprop={data_detail?.name}>{data_detail?.name}</span>
                  </BreadcrumbLink>
                </a>
                <meta itemprop="position" content="2"></meta>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
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
              <PostDetail
                item={{
                  title: data_detail?.name,
                  description: data_detail?.description,
                  content: data_detail?.content,
                  date: news?.scheduled_at || news?.created_at,
                  writer: news?.author,
                  image: news?.thumbnail_obj?.url,
                }}
              />
              <Box width="100%" height="1px" background="#818181" margin="55px 0 49px" />
              <PostRelate items={related} />
            </GridItem>
            <GridItem
              colSpan={[5, 5, 5, 2, 2]}
              display={["none", "none", "none", "block", "block"]}
            >
              <Box marginTop="-54px">
                <NewsHot items={hot} />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default PostPage;
