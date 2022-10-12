import { Box, SimpleGrid } from "@chakra-ui/react";
import ItemNew from "@ltp/components/News/ItemNew";
import ItemNewFlex from "@ltp/components/News/ItemNewFlex";
import TitlePanel from "@ltp/components/TitlePanel";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_NEWS } from "@ltp/utils/constant";
import { getTranslateArray, getValidSlug } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import { useEffect, useState } from "react";

export default function Company({ items }) {
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
    itemHeader = itemHeader.reduce((obj, item) => {
      if (item.language_code === language) {
        return {
          ...obj,
          [item.language_field]: item.language_value,
        };
      }
      return obj;
    }, {});
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
      {!!itemNews.length && (
        <>
          <Box display={["none", "none", "none", "block", "block", "block"]}>
            <ItemNewFlex
              {...itemNew1}
              width={["164px", "371px", "164px", "371px"]}
              height={["88px", "208px", "88px", "208px"]}
              spacing={["16px", "20px", "28.67px"]}
              showDescription
              noOfLines={2}
            />
          </Box>
          <SimpleGrid
            marginTop="24px"
            columns={3}
            spacing="35px"
            justifyContent="center"
            display={["none", "none", "none", "grid", "grid", "grid"]}
          >
            {!!itemNewChild.length &&
              itemNewChild.map((item, index) => {
                if (index < 3) {
                  return (
                    <Box key={index}>
                      <ItemNew {...item} width="100%" height="160px" noOfLines={3} />
                    </Box>
                  );
                }
                return null;
              })}
          </SimpleGrid>
          <SimpleGrid
            marginTop="24px"
            columns={3}
            spacing="24px"
            justifyContent="center"
            display={["none", "none", "grid", "none", "none", "none"]}
          >
            {!!itemNews.length &&
              itemNews.map((item, index) => {
                if (index < 3) {
                  return (
                    <Box key={index}>
                      <ItemNew {...item} width="100%" height="160px" noOfLines={3} />
                    </Box>
                  );
                }
                return null;
              })}
          </SimpleGrid>
          <SimpleGrid
            marginTop="24px"
            columns={2}
            spacing="24px"
            justifyContent="center"
            display={["grid", "grid", "none", "none", "none", "none"]}
          >
            {!!itemNews.length &&
              itemNews.map((item, index) => {
                if (index < 2) {
                  return (
                    <Box key={index}>
                      <ItemNew
                        {...item}
                        width="100%"
                        height={["auto", "160px", "160px", "160px", "160px"]}
                        maxHeight={{ base: "160px" }}
                        noOfLines={3}
                      />
                    </Box>
                  );
                }
                return null;
              })}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}
Company.defaultProps = {
  items: [],
};
