import { Box, Grid, GridItem } from "@chakra-ui/react";
import TitlePanel from "@ltp/components/TitlePanel";
import ItemNew from "@ltp/components/News/ItemNew";
import ItemNewFlex from "@ltp/components/News/ItemNewFlex";
import Lodash from "lodash";
import { useEffect, useState } from "react";
import { getTranslateArray, getValidSlug } from "@ltp/utils/index";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_NEWS } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";

function Journal({ items }) {
  const { locale: language } = useTranslation();
  const [titleHeader, settitleHeader] = useState({});
  const [itemNews, setItemNews] = useState([]);
  const transformObjTran = (listTrans, lang) => {
    const listChilds = Lodash.map(listTrans, (obj) => {
      const translates = Lodash.get(obj, "translates", []);
      const arrayTrans = getTranslateArray(translates, lang);
      const objTrans = arrayTrans.reduce(
        (obj, item) => ({
          ...obj,
          [item.language_field]: item.language_value,
        }),
        {},
      );
      const slug = getValidSlug(objTrans);
      if (slug) return { ...objTrans, ...obj, slug: slug };
    });
    return listChilds;
  };
  useEffect(() => {
    let itemHeader = Lodash.get(items, "translates", []);
    itemHeader = itemHeader.reduce(
      (obj, item) => ({
        ...obj,
        [item.language_field]: item.language_value,
      }),
      {},
    );
    settitleHeader({ ...itemHeader });
    let childrensNews = Lodash.get(items, "childrens", []);
    childrensNews = transformObjTran(childrensNews, language);
    childrensNews = Lodash.reject(childrensNews, (i) => _.isNil(i?.id));
    setItemNews(childrensNews);
  }, [language, JSON.stringify(items)]);
  const itemNew1 = Lodash.get(itemNews, "[0]", {});
  const itemNewChild = itemNews.slice(1);
  if (itemNews.length === 0) return <></>;
  return (
    <Box>
      <TitlePanel
        title={titleHeader.name}
        viewAll
        marginTop="60px"
        textTransform="uppercase"
        href={addTrailingSlash(ROUTE_NEWS(language, getValidSlug(titleHeader)))}
        heading="h2"
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
          <ItemNew {...itemNew1} showDescription width="100%" height="205px" noOfLines={2} />
        </GridItem>
        <GridItem
          colSpan={[6, 6, 6, 3, 3]}
          display={["none", "block", "block", "block", "block", "block"]}
        >
          {!!itemNewChild.length &&
            itemNewChild.map((item, index) => {
              if (index < 3) {
                return (
                  <Box marginBottom={index === 2 ? "0" : "16px"} key={index}>
                    <ItemNewFlex
                      {...item}
                      width="120px"
                      height="88px"
                      spacing="16px"
                      styleName={{ fontSize: "14px" }}
                      noOfLines={2}
                    />
                  </Box>
                );
              }
              return null;
            })}
        </GridItem>
        <GridItem display={["block", "none", "none", "none", "none", "none"]}>
          {!!itemNews.length &&
            itemNews.map((item, index) => {
              if (index < 4) {
                return (
                  <Box key={index} marginBottom={index === 4 ? "0" : "16px"}>
                    <ItemNewFlex
                      {...item}
                      key={index}
                      width="164px"
                      height="88px"
                      spacing="16px"
                      styleName={{ fontSize: "14px" }}
                      noOfLines={2}
                    />
                  </Box>
                );
              }
              return null;
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
