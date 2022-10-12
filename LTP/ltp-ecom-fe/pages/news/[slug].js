import { Box, BreadcrumbItem, BreadcrumbLink, Grid, GridItem } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import { useAppUserContext } from "@ltp/components/context/auth";
import NewsHot from "@ltp/components/News/NewsHot";
import { LANG_VI } from "@ltp/constants/languages";
import useTranslation from "@ltp/hooks/useTranslation";
import { getCategoryNewsOtherSlugUrl, getCategoryNewsSlug } from "@ltp/services/news";
import { ROUTE_CATEGORY_NEW, ROUTE_NEWS, WEB_DOMAIN } from "@ltp/utils/constant";
import { toTitleCase } from "@ltp/utils/index";
import { getDataRedirect } from "@ltp/utils/redirect.utils";
import { addTrailingSlash, concatUrls } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import Custom404 from "pages/404";
import { useEffect, useMemo, useState } from "react";
import PostList from "./PostList";
import PostRelate from "./PostRelate";

function Category(props) {
  const router = useRouter();
  const { setOnLanguageChange } = useAppUserContext();
  const { t, locale: language } = useTranslation();
  const limit = 20;
  const [page, setPage] = useState(router.query?.page || 1);
  const [listNewsProps, setListNewsProps] = useState(props.listNewsProps);
  const [categoryNews, setCategoryNews] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [categoryFeature, setCategoryFeature] = useState([]);

  async function handleOtherLangNews(other_lang) {
    const newSlug = await getCategoryNewsOtherSlugUrl({
      slug: props.slug,
      other_lang,
    });
    const newRoute = addTrailingSlash(ROUTE_NEWS(other_lang, newSlug));
    window.location.href = newRoute;
  }

  useEffect(() => {
    setOnLanguageChange(() => handleOtherLangNews);
  }, []);

  useEffect(() => {
    if (props.slug) {
      getNews();
    }
  }, [props.slug, JSON.stringify(listNewsProps), page]);
  useEffect(() => {
    setListNewsProps(props.listNewsProps);
  }, [JSON.stringify(props.listNewsProps)]);
  const getNews = async () => {
    try {
      const data = listNewsProps || {};
      const feature = Lodash.get(data, "features", []);
      const listNews = Lodash.get(data, "children.data", []);
      const total = Lodash.get(data, "children.totalRecords", []);
      setCategoryFeature(feature);
      setCategoryNews(listNews);
      setTotalNews(total);
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }
  };
  const data_header = useMemo(() => {
    const translates_header = Lodash.get(props.listNewsProps, "translates", []);
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
  }, [language, page, JSON.stringify(props.listNewsProps)]);
  useEffect(() => {
    if (router.query?.page) {
      setPage(router.query?.page);
      (async function () {
        const res = await getCategoryNewsSlug(props.slug, {
          lang: language,
          page: router.query?.page,
          limit: 20,
        });
        setListNewsProps(res.data || {});
      })();
    }
  }, [router.query?.page]);
  const onChangePage = async (page) => {
    // const res = await getCategoryNewsSlug(props.slug, {
    //   lang: language,
    //   page,
    //   limit: 20,
    // });
    // setListNewsProps(res.data || {});
    if (page > 1) window.location.href = `${ROUTE_NEWS(language, props.slug)}/?page=${page}`;
    else window.location.href = ROUTE_NEWS(language, props.slug);
  };
  if (props.statusCode === 404) {
    return <Custom404 />;
  }
  return (
    <div>
      <Head>
        <title>{toTitleCase(data_header.name || "")}</title>
        <meta name="description" content="LTP-ecommerce" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container>
          <Box marginBottom="116px">
            <Breadcrumb>
              <BreadcrumbItem
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
              >
                <a
                  itemscope=""
                  itemtype="https://schema.org/Thing"
                  itemprop="item"
                  href={concatUrls(WEB_DOMAIN, "/")}
                >
                  <BreadcrumbLink>
                    <span itemprop={t("homePage")}>{t("homePage")}</span>
                    <meta itemprop="url" content={concatUrls(WEB_DOMAIN, "/")}></meta>
                  </BreadcrumbLink>
                </a>
                <meta itemprop="position" content="1"></meta>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href={addTrailingSlash(concatUrls(WEB_DOMAIN, ROUTE_CATEGORY_NEW(language)))}>
                  <BreadcrumbLink>{t("news")}</BreadcrumbLink>
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
                isCurrentPage
              >
                <BreadcrumbLink>
                  <span itemprop={toTitleCase(data_header.name || "")}>
                    {toTitleCase(data_header.name || "")}
                  </span>
                </BreadcrumbLink>
                <meta itemprop="position" content="2"></meta>
              </BreadcrumbItem>
            </Breadcrumb>
            {categoryFeature.length > 0 && <PostRelate items={categoryFeature} />}
            <Box marginTop="50">
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
                  <PostList
                    items={categoryNews}
                    titleHeader={data_header}
                    current={page}
                    total={totalNews}
                    onChangePage={onChangePage}
                    size={limit}
                  />
                </GridItem>
                <GridItem
                  colSpan={[5, 5, 5, 2, 2]}
                  display={["none", "none", "none", "block", "block"]}
                >
                  <Box>
                    <NewsHot />
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Container>
      </main>
    </div>
  );
}
export const getServerSideProps = async ({ params, locale, res }) => {
  try {
    const { slug = "" } = params;
    const detail = await getCategoryNewsSlug(slug, {
      lang: locale,
      page: 1,
      limit: 20,
    });
    const dataByStatusCode = detail?.data;

    const { isRedirect, dataRedirect, statusCode } = getDataRedirect(
      detail?.code,
      ROUTE_NEWS(locale, dataByStatusCode),
      ROUTE_NEWS(LANG_VI, slug),
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
        listNewsProps: dataByStatusCode || {},
        statusCode,
      },
    };
  } catch (e) {
    res.statusCode = 404;
    return { props: { listNewsProps: {} } };
  }
};
export default Category;
