import { Article } from "@cbi/services/article/article.interface";
import { formatDate } from "@cbi/utils/date";
import { formatRouterNewsDetail, toImageEndoint } from "@cbi/utils/index";
import { Box, ChakraProps, HStack, Image, Link, Text } from "@chakra-ui/react";
type ItemNewsProps = {
  article: Article;
  showDescription?: boolean;
  cateId: string;
} & ChakraProps;
export default function ItemNews({
  article,
  showDescription,
  cateId,
  width,
  height,
  maxH,
  noOfLines,
}: ItemNewsProps) {
  const id = article?.id;
  const image = toImageEndoint(article.thumbnail.key);
  const name = article.translates[0].title;
  const slug = article.translates[0].slug;
  const date = article.publishAt;
  const description = article.description;
  return (
    <Box>
      <Box minWidth={width} maxWidth={width} height={height} maxH={maxH}>
        <Link href={formatRouterNewsDetail(slug)}>
          <Image
            src={image}
            alt=""
            minWidth={width}
            maxWidth={width}
            maxH={"100%"}
            height="100%"
            borderRadius="6px"
            objectFit="fill"
          />
        </Link>
      </Box>
      <Box paddingTop="8px">
        <Text
          color="#071133"
          fontSize={{ base: "14px", md: "16px", xl: "18px" }}
          fontWeight="bold"
          textOverflow="ellipsis"
          noOfLines={noOfLines}
        >
          <Link href={formatRouterNewsDetail(slug)}>{name}</Link>
        </Text>
        <HStack
          color="#718096"
          fontSize="12px"
          fontWeight="500"
          padding="10px 0"
        >
          {/* <Image
            src="/imgs/mock/category/clockRed.svg"
            alt=""
            width="14px !important"
            height="14px"
          /> */}
        </HStack>
        {showDescription && (
          <Text color="#071133" fontSize="14px" noOfLines={3}>
            {description}
          </Text>
        )}
        <Text
          fontSize={{ base: "12px", md: "13px", xl: "14px" }}
          mt="16px"
          color="#718096"
        >
          {date && formatDate(date)}
        </Text>
      </Box>
    </Box>
  );
}
ItemNews.defaultProps = {
  article: {
    image: "",
    name: "",
    description: "",
    key: "",
    language_value: "",
    createdAt: "",
    thumbnail: { key: "" },
    translates: [{ title: "", slug: "" }],
  },
};
