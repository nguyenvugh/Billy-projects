import { ArticleItem } from "@/src/common/components/articleItem";
import { Pagination } from "@/src/common/components/pagination";
import { LANG } from "@/src/common/constants/common.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { Article, Category, Lang, ListResponse } from "@/src/common/interfaces/common.interface";
import { toTotalPage } from "@/src/common/lib/common.lib";
import { getListArticleService } from "@/src/common/services/common.services";
import { Box, Button, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ARTICLE_POLICY_SIZE, getParamSearchPolicy } from "../../section-policy/constant";
import { PolicyPageProps } from "../interfaces";

export const InfoPolicy = ({ articleData, categories }: Pick<PolicyPageProps, "articleData" | "categories">) => {
  const { locale } = useViefRouter();
  const lang = (locale || LANG.vi) as Lang;

  const [selectedCate, setSelectedCate] = useState<Category | null>(categories[0] || null);
  const [listArticleData, setListArticleData] = useState<ListResponse<Article>>(articleData);

  const [currentPage, setCurrentPage] = useState(1);

  async function handlePageChange(page: number) {
    const listData = await getListArticleService(getParamSearchPolicy({ page, size: ARTICLE_POLICY_SIZE, lang }));
    setListArticleData(listData);
    setCurrentPage(page);
  }

  async function handleCateChange(cate: Category) {
    const listData = await getListArticleService(
      getParamSearchPolicy({
        page: 1,
        size: ARTICLE_POLICY_SIZE,
        slugCategory: cate.slug,
        lang,
      })
    );
    setListArticleData(listData);
    setCurrentPage(1);
    setSelectedCate(cate);
  }

  return (
    <Stack spacing={{ md: "32px", sm: "16px" }}>
      <Text variant="text28">Thông tin chính sách</Text>

      <HStack spacing={{ md: "32px", sm: "16px" }}>
        {categories.map((cate) => {
          const isSelectedCate = cate.id === selectedCate?.id;
          const btnVariant = isSelectedCate ? "primary" : "ghost";

          return (
            <Button
              key={cate.id}
              variant={btnVariant}
              minW="140px"
              h="43px"
              onClick={() => {
                handleCateChange(cate);
              }}
            >
              <Text w="full">{cate.name}</Text>
            </Button>
          );
        })}
      </HStack>
      <Box>
        <Stack spacing="32px" alignItems="start" pt={"32px"}>
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
            {listArticleData.data.map((article, index) => {
              return (
                <GridItem key={index}>
                  <ArticleItem article={article} />
                </GridItem>
              );
            })}
          </Grid>
          <Box display="flex" justifyContent="center" w="full">
            <Pagination
              currentPage={currentPage}
              totalPages={toTotalPage(listArticleData.total, ARTICLE_POLICY_SIZE)}
              onPageChange={(page) => handlePageChange(page)}
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
