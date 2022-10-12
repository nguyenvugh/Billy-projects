import { Box, Grid, GridItem, HStack, Image, Link, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_BlOG } from "@ltp/utils/constant";
import { getTranslateArray } from "@ltp/utils/index";
import Lodash from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";

function PostRelate({
  item,
  widthImage = "100%",
  heightImage = "100%",
  paddingContent,
  sizeContent,
}) {
  const { locale } = useTranslation();
  const image = Lodash.get(item, "thumbnail_obj.url", "");
  const date = item.scheduled_at || item.created_at || "";
  return (
    <Box position="relative" align="left" height={heightImage}>
      <Link href={item.id ? ROUTE_BlOG(locale, item.slug) : "#"}>
        <Box height={heightImage} maxH="700px">
          <Image src={image} width={widthImage} height={heightImage} objectFit="cover" />
        </Box>
      </Link>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        padding={paddingContent}
        color="#ffff"
        style={{
          backgroundImage: "linear-gradient(180deg, #00000033, #000000 100%)",
        }}
      >
        <Link href={ROUTE_BlOG(locale, item.slug)}>
          <Text
            color="#ffff"
            fontSize={sizeContent}
            fontWeight="bold"
            textOverflow="ellipsis"
            noOfLines={2}
            _active={{ borderColor: "transparent", boxShadow: "none" }}
          >
            {item.name}
          </Text>
        </Link>
        <HStack spacing="6px" justifyContent="flex-start" marginTop="10px">
          <Image
            src="/imgs/mock/category/clock.svg"
            alt="clock"
            title="clock"
            width="14px !important"
            height="14px"
          />
          <Text fontSize="12px" fontWeight="500">
            {date && moment(date).format("DD/MM/yyyy")}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}

export default function Post({ items }) {
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
  const item1 = Lodash.get(itemNews, "[0]", null);
  const item2 = Lodash.get(itemNews, "[1]", null);
  const item3 = Lodash.get(itemNews, "[2]", null);
  const item4 = Lodash.get(itemNews, "[3]", null);

  const colSpanItem1 = itemNews.length > 1 ? [4, 4, 4, 2, 2] : [4, 4, 4, 4, 4];
  const rowSpanItem2 = itemNews.length >= 2 ? 2 : 1;
  const colSpanItem34 = itemNews.length > 3 ? 1 : 2;
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={["0", "0", "0", "15px", "20px", "30px"]}
      margin={{ base: "30px -21px", md: 0 }}
    >
      <GridItem rowSpan={2} colSpan={colSpanItem1}>
        {item1 && (
          <PostRelate
            item={item1}
            widthImage="100%"
            heightImage={{ base: "250px", lg: "100%" }}
            paddingContent="0 24px 32px 24px"
            sizeContent="24px"
          />
        )}
      </GridItem>
      <GridItem colSpan={rowSpanItem2} display={["none", "none", "none", "block"]}>
        {item2 && (
          <PostRelate
            item={item2}
            widthImage="100%"
            heightImage={["160px", "180px", "200px", "249px"]}
            paddingContent="0 24px 12px 24px"
            sizeContent="18px"
          />
        )}
      </GridItem>
      <GridItem colSpan={colSpanItem34} display={["none", "none", "none", "block"]}>
        {item3 && (
          <PostRelate
            item={item3}
            widthImage="100%"
            heightImage={["160px", "180px", "200px", "249px"]}
            paddingContent="0 24px 26px 24px"
            sizeContent="18px"
          />
        )}
      </GridItem>
      <GridItem colSpan={colSpanItem34} display={["none", "none", "none", "block"]}>
        {item4 && (
          <PostRelate
            item={item4}
            widthImage="100%"
            heightImage={["160px", "180px", "200px", "249px"]}
            paddingContent="0 24px 26px 24px"
            sizeContent="18px"
          />
        )}
      </GridItem>
    </Grid>
  );
}
