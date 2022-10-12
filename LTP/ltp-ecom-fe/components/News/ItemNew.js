import { Box, HStack, Image, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_BlOG } from "@ltp/utils/constant";
import { formatDate } from "@ltp/utils/date";
import { getValidSlug } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";

export default function ItemNews(props) {
  const { locale } = useTranslation();
  const image = props.thumbnail_obj?.url || "";
  const { name } = props;
  const date = props.scheduled_at || props.date || "";
  const description = props.desc;
  const showDescription = props.showDescription || false;
  const noOfLines = props.noOfLines || 3;
  const { width } = props;
  const { height } = props;
  const maxH = props.maxHeight;
  const detailLink = addTrailingSlash(ROUTE_BlOG(locale, getValidSlug(props)));
  return (
    <Box>
      <Box minWidth={width} maxWidth={width} height={height} maxH={maxH}>
        <a href={detailLink}>
          <Image
            src={image}
            minWidth={width}
            maxWidth={width}
            maxH="100%"
            objectFit="cover !important"
          />
        </a>
      </Box>
      <Box paddingTop="8px">
        <Text
          as="h3"
          color="#071133"
          fontSize={{ base: "14px", md: "16px", xl: "18px" }}
          fontWeight="bold"
          textOverflow="ellipsis"
          noOfLines={noOfLines}
        >
          <a href={detailLink}>{name}</a>
        </Text>
        <HStack color="#718096" fontSize="12px" fontWeight="500" padding="10px 0">
          <Image src="/imgs/mock/category/clockRed.svg" width="14px !important" height="14px" />

          <Text fontSize={{ base: "12px", md: "13px", xl: "14px" }}>
            {date && formatDate(date)}
          </Text>
        </HStack>
        {showDescription && (
          <Text color="#071133" noOfLines={3} fontSize={{ base: "12px", md: "13px", xl: "14px" }}>
            {description}
          </Text>
        )}
      </Box>
    </Box>
  );
}
ItemNews.defaultProps = {
  image: "",
  name: "",
  date: "",
  description: "",
  desc: "",
  key: "",
  language_value: "",
  thumbnail_obj: { url: "" },
};
