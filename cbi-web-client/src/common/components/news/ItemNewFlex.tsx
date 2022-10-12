import { Article } from "@cbi/services/article/article.interface";
import { formatRouterNewsDetail, toImageEndoint } from "@cbi/utils/index";
import { Box, ChakraProps, HStack, Image, Link, Text } from "@chakra-ui/react";
import moment from "moment";
type ItemNewsProps = {
  article: Article;
  showDescription?: boolean;
  cateId?: string;
  styleName?: any;
  href?: any;
  spacing?: any;
} & ChakraProps;
export default function ItemNews(props: ItemNewsProps) {
  const image = toImageEndoint(props.article.thumbnail.key);
  const name = props.article.translates[0].title;
  const slug = props.article.translates[0].slug;
  const date = props.article.publishAt;
  const description = props.article.translates[0].description;
  const showDescription = props.showDescription || false;
  const styleName = props.styleName;
  const noOfLines = props.noOfLines || 2;
  const width = props.width;
  const height = props.height;
  const href = props.href || formatRouterNewsDetail(slug);
  const spacing = props.spacing;
  return (
    <Box display="flex">
      <Box minWidth={width} maxWidth={width} h={height}>
        <Link href={href}>
          <Image
            overflow="hidden"
            src={image}
            alt=""
            minWidth={width}
            maxWidth={width}
            h={height}
            maxH={"100%"}
            borderRadius="10px"
            objectFit="fill"
          />
        </Link>
      </Box>
      <Box paddingLeft={spacing || "16px"} wordBreak="break-word">
        <Text
          color="#071133"
          fontSize={{ base: "14px", md: "16px", xl: "18px" }}
          fontWeight="bold"
          textOverflow="ellipsis"
          noOfLines={noOfLines}
          style={styleName}
        >
          <Link href={href}>{name}</Link>
        </Text>
        {showDescription && (
          <Text
            color="#071133"
            fontSize={{ base: "12px", md: "13px", xl: "14px" }}
            noOfLines={3}
          >
            {description}
          </Text>
        )}
        <HStack
          color="#718096"
          fontSize="12px"
          fontWeight="500"
          padding="10px 0"
        >
          <Text fontSize={{ base: "12px", md: "13px", xl: "14px" }}>
            {date && moment(date).format("DD/MM/yyyy")}
          </Text>
        </HStack>
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
