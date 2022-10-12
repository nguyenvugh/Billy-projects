import { Article } from "@cbi/services/article/article.interface";
import { formatDate } from "@cbi/utils/date";
import { formatRouterNewsDetail, toImageEndoint } from "@cbi/utils/index";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import Lodash from "lodash";
type NewsHotProps = {
  hotnewArticle: Article[];
};
function NewsHot({ hotnewArticle }: NewsHotProps) {
  const renderListItem = (article: Article) => {
    const date = formatDate(article.publishAt);
    return (
      <Box marginBottom="20px" cursor="pointer">
        <Box>
          <Link href={formatRouterNewsDetail(article.translates[0].slug)}>
            <Image
              src={toImageEndoint(article.thumbnail.key)}
              alt=""
              minW="100%"
              maxW="100%"
              h="195px"
              objectFit="fill"
              borderRadius="10px"
            />
          </Link>
          <Link href={formatRouterNewsDetail(article.translates[0].slug)}>
            <Text
              color="#2D3748"
              fontSize="18px"
              fontWeight="700"
              textOverflow="ellipsis"
              overflow="hidden"
              maxHeight="56px"
              mt="5"
            >
              {article.translates[0].title}
            </Text>
          </Link>
          <Text
            color="#4A5568"
            fontSize="14px"
            paddingTop="8px"
            fontWeight={500}
          >
            {/* {time} */}
            <span>{date}</span>
          </Text>
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      <Text
        fontSize="24px"
        color="#1A202C"
        lineHeight="28px"
        fontWeight={700}
        marginBottom="30px"
      >
        Tin mới nhất
      </Text>
      {(hotnewArticle || []).map((article, index) => {
        return <Box key={index}>{renderListItem(article)}</Box>;
      })}
    </Box>
  );
}
export default NewsHot;
