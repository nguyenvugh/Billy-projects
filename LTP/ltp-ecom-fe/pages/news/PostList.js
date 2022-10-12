import { Box, Text } from "@chakra-ui/react";
import ItemNewFlex from "@ltp/components/News/ItemNewFlex";
import Pagination from "@ltp/components/Pagination";
import useTranslation from "@ltp/hooks/useTranslation";
import { getTranslateArray } from "@ltp/utils/index";
import Lodash from "lodash";
import { useEffect, useState } from "react";

function Post({ items = [], titleHeader, current, total, onChangePage, size }) {
  const { locale: language } = useTranslation();
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
      return { ...objTrans, ...obj };
    });
    return listChilds;
  };
  useEffect(() => {
    const childrensNews = transformObjTran(items, language);
    setItemNews(childrensNews);
  }, [items]);

  return (
    <Box>
      <Text
        as="h2"
        color="#2154FF"
        fontSize={{ base: "24px", md: "28px", xl: "36px" }}
        fontWeight="bold"
        textTransform="uppercase"
      >
        {titleHeader.name}
      </Text>
      <Text color="#53585C" fontSize="16px" padding="16px 0 24px">
        {`Tổng hợp tin tức về ${(titleHeader.name || "").toLowerCase()}`}
      </Text>
      {!!itemNews.length &&
        itemNews.map((item, index) => (
          <Box marginBottom={index === items.length - 1 ? "0" : "24px"} key={index}>
            <ItemNewFlex
              {...item}
              width={["164px", "371px", "164px", "371px"]}
              height={["88px", "208px", "88px", "208px"]}
              spacing={["16px", "20px", "36px"]}
              showDescription
              noOfLines={2}
            />
          </Box>
        ))}
      <Box marginTop="59px">
        <Pagination current={current} total={total} onChangePage={onChangePage} size={size} />
      </Box>
    </Box>
  );
}
export default Post;
