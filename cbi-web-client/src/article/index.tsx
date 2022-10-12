import NewsHot from "@cbi/components/news/NewsHot";
import Pagination from "@cbi/components/pagination";
import {
  Article,
  ArticleByCategory,
  ArticleProps,
} from "@cbi/services/article/article.interface";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Lodash from "lodash";
import Head from "next/head";
import { useEffect, useState } from "react";
import Container from "src/common/components/container";
import ImageCategoryCarousel from "./ImageCarousel";
import Journal from "./Journal";
const NUMBER_SIZE = 2;
function ArticlePage({
  articleByCate,
  hotnewArticle,
  slideArticle,
}: ArticleProps) {
  const articleByCateProps =
    articleByCate.filter((el) => el.articles?.length) || [];
  const [listArticle, setListArticle] = useState<ArticleByCategory[]>([]);
  // const { t } = useTranslation();
  const [current, setCurrentPage] = useState(1);
  useEffect(() => {
    const pageNumber = NUMBER_SIZE * current - NUMBER_SIZE;
    setListArticle(articleByCateProps.splice(pageNumber, pageNumber + 2));
  }, [articleByCate, current]);
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Head>
        {/* <title>{t("news")}</title> */}
        <title>News</title>
        <meta name="description" content="CEBI-web" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container>
          <Box marginBottom="116px">
            <Grid
              marginTop="60px"
              templateColumns={{
                base: "1fr",
                md: "1fr 285px",
              }}
              gap={{ base: "32px", md: "52px", xl: "64px" }}
            >
              <GridItem marginBottom={{ base: "32px", lg: "0px" }}>
                <ImageCategoryCarousel slideArticle={slideArticle} />
                {listArticle.length > 0 &&
                  listArticle.map((artCate) => (
                    <Journal articleByCate={artCate} />
                  ))}
              </GridItem>
              <GridItem display={["none", "none", "none", "block", "block"]}>
                <Box>
                  <NewsHot hotnewArticle={hotnewArticle} />
                </Box>
              </GridItem>
            </Grid>
          </Box>
          <Box
            marginTop={{ base: "35px", md: "59px" }}
            marginBottom={{ base: "50px", md: "80px" }}
          >
            <Pagination
              current={current}
              total={articleByCateProps.length}
              onChangePage={onChangePage}
              size={NUMBER_SIZE}
            />
          </Box>
        </Container>
      </main>
    </div>
  );
}
export default ArticlePage;
