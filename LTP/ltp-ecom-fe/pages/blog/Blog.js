import { Box } from "@chakra-ui/react";
import ItemNewFlex from "@ltp/components/News/ItemNewFlex";
import TitlePanel from "@ltp/components/TitlePanel";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_BlOG, ROUTE_NEWS } from "@ltp/utils/constant";
import { getTranslateArray, getValidSlug } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import { useEffect, useState } from "react";

export default function Blog({ items }) {
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
      {!!itemNews.length &&
        itemNews.map((item, index) => {
          if (index < 3) {
            return (
              <a key={index} href={addTrailingSlash(ROUTE_BlOG(language, item.slug))}>
                <Box marginBottom={index === 2 ? "0" : "24px"}>
                  <ItemNewFlex
                    {...item}
                    width={["164px", "378px", "164px", "378px"]}
                    height={["88px", "233px", "88px", "233px"]}
                    spacing="16px"
                    showDescription
                    noOfLines={2}
                  />
                </Box>
              </a>
            );
          }
          return null;
        })}
    </Box>
  );
}
Blog.defaultProps = {
  items: [],
};
