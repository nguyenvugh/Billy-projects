import ItemNew from "@cbi/components/news/ItemNew";
import ItemNewFlex from "@cbi/components/news/ItemNewFlex";
import TitlePanel from "@cbi/components/title-panel";
import { ArticleByCategory } from "@cbi/services/article/article.interface";
import { Box, Grid, GridItem } from "@chakra-ui/react";
type JournalProps = {
  articleByCate: ArticleByCategory;
};
function Journal({ articleByCate }: JournalProps) {
  const { articles, id: cateId, name: cateTitle } = articleByCate;
  const mainArticle = articles[0];
  const childrenArticle = articles.filter((_, index) => index > 0);
  if (articles.length === 0) {
    return null;
  }
  return (
    <Box>
      <TitlePanel
        title={cateTitle}
        viewAll={true}
        marginTop="60px"
        textTransform="uppercase"
        href={`/news?categoryId=${cateId}&cateTitle=${cateTitle}`}
      />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(6, 1fr)",
        }}
        gap={6}
        gridGap={{ base: 0, md: 5, xl: "31px" }}
      >
        <GridItem
          colSpan={[0, 6, 6, 3, 3]}
          display={["none", "block"]}
          paddingBottom={["0", "16px", "16px", "0"]}
        >
          <ItemNew
            cateId={cateId}
            article={mainArticle}
            showDescription={true}
            width={"100%"}
            height={"205px"}
            noOfLines={2}
          />
        </GridItem>
        <GridItem
          colSpan={[6, 6, 6, 3, 3]}
          display={["none", "block", "block", "block", "block", "block"]}
        >
          {childrenArticle.map((item, index) => {
            return (
              <Box marginBottom="16px" key={index}>
                <ItemNewFlex
                  cateId={cateId}
                  article={item}
                  width={"120px"}
                  height={"88px"}
                  spacing="16px"
                  styleName={{ fontSize: "14px" }}
                  noOfLines={2}
                />
              </Box>
            );
          })}
        </GridItem>
        <GridItem display={["block", "none", "none", "none", "none", "none"]}>
          {childrenArticle.map((item, index) => {
            return (
              <Box key={index} marginBottom={index === 4 ? "0" : "16px"}>
                <ItemNewFlex
                  article={item}
                  cateId={cateId}
                  width="164px"
                  height="88px"
                  spacing="16px"
                  styleName={{ fontSize: "14px" }}
                  noOfLines={2}
                />
              </Box>
            );
          })}
        </GridItem>
      </Grid>
    </Box>
  );
}
Journal.defaultProps = {
  items: [],
};
export default Journal;
