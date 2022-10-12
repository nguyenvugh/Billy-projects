import { ArticleItem } from "@/src/common/components/articleItem";
import { Pagination } from "@/src/common/components/pagination";
import { LANG } from "@/src/common/constants/common.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { Article, Category, Lang, ListResponse } from "@/src/common/interfaces/common.interface";
import { toTotalPage } from "@/src/common/lib/common.lib";
import { getListArticleService } from "@/src/common/services/common.services";
import { EnterprisePageProps } from "@/src/pages/enterprise-story";
import { Box, Button, Grid, GridItem, HStack, Img, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ARTICLE_ENTERPRISE_SIZE, getParamSearchEnterprise } from "../constants";

function MainArticles({ articleData, categories }: EnterprisePageProps) {
  const { locale } = useViefRouter();
  const lang = (locale || LANG.vi) as Lang;

  const [params, setParams] = useState(
    getParamSearchEnterprise({
      page: 1,
      size: ARTICLE_ENTERPRISE_SIZE,
      lang,
      isFeature: -1,
      slugCategory: categories[0]?.slug,
    })
  );
  const [listArticleData, setListArticleData] = useState<ListResponse<Article>>(articleData);
  const { data, total } = listArticleData;
  const totalPage = toTotalPage(total, ARTICLE_ENTERPRISE_SIZE);
  const [thumbnailArticle, ...listArticle] = data;
  const selectedCate = categories.find((cate) => cate.slug === params.slugCategory);

  async function handlePageChange(page: number) {
    const listData = await getListArticleService({ ...params, page });
    setListArticleData(listData);
    setParams({ ...params, page });
  }

  async function handleCateChange(cate: Category) {
    const newParams = {
      ...params,
      page: 1,
      slugCategory: cate.slug,
    };
    const listData = await getListArticleService(newParams);
    setListArticleData(listData);
    setParams(newParams);
  }
  return (
    <VStack alignItems="flex-start" spacing="32px" w="full">
      <Text variant={{ base: "text28", sm: "text24" }}>Bài viết</Text>
      <HStack spacing="32px">
        {categories.map((cate) => {
          const isSelected = cate.id === selectedCate?.id;
          return (
            <Button key={cate.id} variant={isSelected ? "primary" : ""} onClick={() => handleCateChange(cate)}>
              {cate.name}
            </Button>
          );
        })}
      </HStack>

      {thumbnailArticle && (
        <Stack height={{ base: "444px", sm: "unset" }} flexDir={{ sm: "column-reverse", base: "row" }} w="full">
          <VStack
            alignItems="flex-start"
            justifyContent="space-between"
            w={{ base: "50%", sm: "full" }}
            h="full"
            pt={{ base: "35px", sm: "16px" }}
            pr={{ base: "64px", sm: "unset" }}
          >
            <Text variant={{ base: "text36", sm: "text28" }} className="text-3-line">
              {thumbnailArticle.title}
            </Text>
            <Text variant="text14" className="text-5-line">
              {thumbnailArticle.shortDesc}
            </Text>
          </VStack>
          <Box w={{ base: "50%", sm: "full" }} h={{ base: "full", sm: "257px" }} overflow="hidden">
            <Img src={thumbnailArticle.thumbnail.url} w="full" h="full" borderRadius="12px" />
          </Box>
        </Stack>
      )}

      <Grid templateColumns={{ sm: "repeat(2, 1fr)", base: "repeat(3, 1fr)" }} gap={{ base: 6, sm: 4 }}>
        {listArticle.map((article, index) => {
          return (
            <GridItem key={index}>
              <ArticleItem article={article} />
            </GridItem>
          );
        })}
      </Grid>
      {total && (
        <Box display="flex" justifyContent="center" w="full">
          <Pagination
            currentPage={params.page || 1}
            totalPages={totalPage}
            onPageChange={(page) => handlePageChange(page)}
          />
        </Box>
      )}
    </VStack>
  );
}

export { MainArticles };
