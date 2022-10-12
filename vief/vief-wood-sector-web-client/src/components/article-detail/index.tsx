import { ArticleItem } from "@/src/common/components/articleItem";
import { HotNews } from "@/src/common/components/hot-news";
import { Pagination } from "@/src/common/components/pagination";
import { WebContainer } from "@/src/common/components/WebContainer";
import {
  Article,
  ListResponse,
} from "@/src/common/interfaces/common.interface";
import { toTotalPage } from "@/src/common/lib/common.lib";
import { getListArticleService } from "@/src/common/services/common.services";
import { Box, Grid, GridItem, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ArticleDetailProps } from "./interface";

function ArticleDetail({
  articleDetail,
  relateNews,
  extraNews,
  breadcrumb,
}: ArticleDetailProps) {
  const [articleData, setArticleData] =
    useState<ListResponse<Article>>(extraNews);
  const listArticle = articleData.data;
  const totalPages = toTotalPage(articleData.total, 6);

  const [currentPage, setCurrentPage] = useState(1);

  const article = articleDetail.article;
  const { title, content, author } = article;
  const category = articleDetail.category;

  async function handlePageChange(page: number) {
    const articleDataRes = await getListArticleService({
      page,
      size: 6,
      slugCategory: category.slug,
    });
    setArticleData(articleDataRes);
    setCurrentPage(page);
  }
  return (
    <WebContainer>
      <VStack alignItems="start" mt="32px" spacing="64px" mb="64px">
        <Box>{breadcrumb && breadcrumb}</Box>

        <Stack
          w="full"
          flexDir={{
            base: "row",
            sm: "column",
          }}
          justifyContent="space-between"
          alignItems="start"
        >
          <Box
            w={{
              base: "55%",
              sm: "100%",
            }}
          >
            <Text
              variant={{
                base: "text48",
                sm: "text28",
              }}
              color={{
                base: "green.primary",
                sm: "green.primary",
              }}
            >
              {title}
            </Text>
            <Text mt="32px" dangerouslySetInnerHTML={{ __html: content }} />
            <Text variant="text14" w="full" textAlign="end">
              {author}
            </Text>
          </Box>

          <Box
            w={{
              base: "35%",
              sm: "100%",
            }}
          >
            <HotNews articles={relateNews} label="TIN LIÊN QUAN" />
          </Box>
        </Stack>

        <VStack spacing="32px" alignItems="start">
          <Text variant="text28">Đọc thêm: {category.name}</Text>
          <Grid
            templateColumns={{
              sm: "repeat(2, 1fr)",
              base: "repeat(3, 1fr)",
            }}
            gap={{
              base: 6,
              sm: 4,
            }}
          >
            {listArticle.map((article, index) => {
              return (
                <GridItem key={index}>
                  <ArticleItem article={article} />
                </GridItem>
              );
            })}
          </Grid>
        </VStack>
        <Box display="flex" justifyContent="center" w="full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(page)}
          />
        </Box>
      </VStack>
    </WebContainer>
  );
}

export { ArticleDetail };
