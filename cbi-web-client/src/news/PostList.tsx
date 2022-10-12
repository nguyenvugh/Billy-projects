import ItemNewFlex from "@cbi/components/news/ItemNewFlex";
import Pagination from "@cbi/components/pagination";
import { Article } from "@cbi/services/article/article.interface";
import { Box, Text } from "@chakra-ui/react";
import { List } from "src/common/interfaces/common.interface";
type PostProps = {
  listArticle: List<Article>;
  cateTitle: string;
  onChangePage: (page: number) => void;
  currentPage: number;
};
function Post({
  listArticle,
  cateTitle,
  onChangePage,
  currentPage,
}: PostProps) {
  const articles = listArticle.results;
  const total = listArticle.total;
  return (
    <Box>
      <Text
        color="#1A202C"
        fontSize={{ base: "24px", md: "28px", xl: "36px" }}
        fontWeight={700}
        textTransform="uppercase"
        marginBottom="30px"
        maxWidth="700px"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {cateTitle}
      </Text>
      {articles.map((article, index) => {
        return (
          <Box
            marginBottom={index === articles.length - 1 ? "0" : "24px"}
            key={index}
          >
            <ItemNewFlex
              cateId={article.articleCategory.id}
              article={article}
              width={["164px", "371px", "164px", "371px"]}
              height={["88px", "208px", "88px", "208px"]}
              spacing={["16px", "20px", "36px"]}
              showDescription={true}
              noOfLines={2}
            />
          </Box>
        );
      })}
      {total > 0 && (
        <Box marginTop="59px">
          <Pagination
            current={currentPage}
            total={total}
            onChangePage={onChangePage}
            size={6}
          />
        </Box>
      )}
    </Box>
  );
}
export default Post;
