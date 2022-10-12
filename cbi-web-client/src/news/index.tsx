import Breadcrumb from "@cbi/components/breadcrumb";
import Container from "@cbi/components/container";
import NewsHot from "@cbi/components/news/NewsHot";
import { LIST_RESPONSE_DEFAULT } from "@cbi/constants/index";
import { getArticle } from "@cbi/services/article";
import { CategoryPageProps } from "@cbi/services/article/article.interface";
import { toTitleCase } from "@cbi/utils/index";
import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Text,
  Link as LinkUI,
  Flex,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import PostList from "./PostList";
import Lodash from "lodash";
function Category({ articlesByCateId, hotnewArticle }: CategoryPageProps) {
  const [articles, setAraticles] = useState(LIST_RESPONSE_DEFAULT);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { categoryId, cateTitle, textSearch } = router.query;
  const transformedCateId = categoryId ? categoryId + "" : "";
  const transformedCateTitle = cateTitle ? cateTitle + "" : "";
  const searchText = Lodash.get(router, "query.textSearch", "");
  useEffect(() => {
    setAraticles(articlesByCateId);
  }, []);

  useEffect(() => {
    onChangePage(1);
  }, [categoryId, textSearch]);
  const onChangePage = async (page: number) => {
    setPage(page);
    let params = {
      limit: 6,
      page,
      searchText,
    };
    if (transformedCateId) {
      params = Object.assign(params, { idCategory: transformedCateId });
    }
    const newArticle = (await getArticle(params)).data;
    setAraticles(newArticle);
  };

  return (
    <div>
      <Head>
        <title>{toTitleCase(transformedCateTitle)}</title>
        <meta name="description" content="CEBI-web" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container>
          <Box marginBottom="116px">
            {searchText !== "" ? (
              <Text
                color="#7B8794"
                fontSize={"12px"}
                py="36px"
                fontWeight={600}
              >
                <Link href="/article">Tin tức - sự kiện</Link>
              </Text>
            ) : (
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link href="/article" passHref shallow>
                    <BreadcrumbLink>Tin tức - sự kiện</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <Text>{toTitleCase(cateTitle ? cateTitle + "" : "")}</Text>
                </BreadcrumbItem>
              </Breadcrumb>
            )}
            <Box marginTop={searchText !== "" ? 25 : 50}>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "1fr 285px",
                }}
                gap={{ base: "32px", md: "52px", lg: "64px" }}
              >
                <GridItem marginBottom={{ base: "32px", lg: "0px" }}>
                  {searchText !== "" && (
                    <Box>
                      <Text fontSize={{ base: "12px", md: "14px", lg: "16px" }}>
                        {`Kết quả tìm kiếm cho "${searchText}": (${articles.total} Tin tức - sự kiện)`}
                      </Text>
                      {articles.total === 0 && (
                        <Flex
                          flexWrap="wrap"
                          color="#61A533"
                          bg="#FFFAEE"
                          alignItems="center"
                          padding="15px 35px"
                          marginTop="35px"
                          border="1px solid rgba(97, 165, 51, 0.15)"
                        >
                          <Image src="/imgs/mock/products/info.svg" alt="" />
                          <Text pl="20px">
                            Chúng tôi không tìm thấy từ khóa
                          </Text>
                        </Flex>
                      )}
                    </Box>
                  )}
                  <PostList
                    onChangePage={onChangePage}
                    currentPage={page}
                    cateTitle={transformedCateTitle}
                    listArticle={articles}
                  />
                </GridItem>
                <GridItem display={["none", "none", "none", "block", "block"]}>
                  <Box>
                    <NewsHot hotnewArticle={hotnewArticle} />
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

export default Category;
