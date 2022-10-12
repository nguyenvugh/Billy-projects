import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { getNewsHot } from "@ltp/services/news";
import { ROUTE_BlOG } from "@ltp/utils/constant";
import { getTranslateArray, getValidSlug } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import { useEffect, useState } from "react";

function NewsHot() {
  const { t, locale } = useTranslation();
  const [listNews, setListNews] = useState([]);

  const [newsTrans, setNewsTrans] = useState([]);
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
    let childrensNews = transformObjTran(listNews, locale);
    childrensNews = Lodash.reject(childrensNews, (i) => _.isNil(i?.id));
    setNewsTrans(childrensNews);
  }, [locale, JSON.stringify(listNews)]);
  useEffect(() => {
    const getNews = async () => {
      const res = await getNewsHot();
      setListNews(res.data.data || []);
    };
    getNews();
  }, [locale]);
  function handleRedirectDetail(link) {
    window.location.href = link;
  }
  const renderListItem = (item) => {
    const image = Lodash.get(item, "thumbnail_obj.url", "");
    const date = item.scheduled_at ? new Date(item.scheduled_at) : new Date(item.created_at);
    const now = new Date();
    const hour = now - date;
    let time = "";
    if (hour >= 31536000000) {
      time = `${Math.round(+hour / 31536000000)} ${t("yearAgo")}`;
    } else if (+hour < 31536000000 && +hour >= 2592000000) {
      time = `${Math.round(+hour / 2592000000)} ${t("monthAgo")}`;
    } else if (+hour < 2592000000 && +hour >= 86400000) {
      time = `${Math.round(+hour / 86400000)} ${t("dayAgo")}`;
    } else if (+hour < 86400000 && +hour >= 3600000) {
      time = `${Math.round(+hour / 3600000)} ${t("hourAgo")}`;
    } else if (+hour < 3600000) {
      time = `${Math.round(+hour / 60000)} ${t("minAgo")}`;
    }
    const detailItemLink = addTrailingSlash(ROUTE_BlOG(locale, getValidSlug(item)));
    return (
      <Flex alignItems="flex-start" marginBottom="20px" cursor="pointer">
        <Box maxWidth="120px !important" minWidth="120px !important" maxH={88}>
          <Image
            onClick={() => handleRedirectDetail(detailItemLink)}
            src={image}
            maxWidth="120px !important"
            minWidth="120px !important"
            maxH="88px"
            objectFit="cover"
          />
        </Box>
        <Box paddingLeft="16px" width="calc(100% - 120px)">
          <Text
            onClick={() => handleRedirectDetail(detailItemLink)}
            as="h5"
            color="#71133"
            fontSize="14px"
            fontWeight="500"
            textOverflow="ellipsis"
            overflow="hidden"
            maxHeight="42px"
            _hover={{
              textDecoration: "underline",
            }}
          >
            {item.name}
          </Text>
          <Text color="#718096" fontSize="12px" paddingTop="8px">
            {time}
          </Text>
        </Box>
      </Flex>
    );
  };
  if (newsTrans.length === 0) return <></>;
  return (
    <Box>
      <Text as="h3" fontSize="16px" color="#071133" lineHeight="20px" fontWeight="bold">
        {t("news")}
      </Text>
      <Box margin="8px 0 24px" background="#E2E8F0" height="2px" width="100%">
        <Box background="#F70D28" width="20%" height="100%" />
      </Box>
      {!!newsTrans.length &&
        newsTrans.map((item, index) => <Box key={index}>{renderListItem(item)}</Box>)}
    </Box>
  );
}
export default NewsHot;
