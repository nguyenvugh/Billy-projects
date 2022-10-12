import { useLanguageContext } from "@cbi/context/LangContext";
import { Article } from "@cbi/services/article/article.interface";
import { DETAIL_MOCK } from "@cbi/services/article/detaildata.mock";
import styles from "@cbi/styles/Post.module.scss";
import { replaceOembedVideo } from "@cbi/utils/index";
import { formatDate } from "@cbi/utils/date";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function NewsDetail({ detailArticle }: { detailArticle: Article }) {
  const router = useRouter();
  const articleId = router.query.id || "1";

  const dateFormatted = detailArticle?.publishAt
    ? formatDate(detailArticle?.publishAt)
    : "";

  useEffect(() => {
    replaceOembedVideo();
  });
  return (
    <Box>
      <Text
        color="#071133"
        fontWeight="bold"
        fontSize={{ base: "22px", md: "26px", xl: "28px" }}
      >
        {detailArticle?.translates?.[0].title}
      </Text>
      <HStack
        color="#718096"
        fontSize="12px"
        fontWeight="500"
        padding="18px 0 0px"
      >
        <Text mb="10" fontSize="16px">
          {dateFormatted}
        </Text>
      </HStack>
      <Box>
        <Box fontSize="18px">
          <Text>{detailArticle?.translates?.[0].description}</Text>
        </Box>
        <div className="post_module_detail">
          <div
            className={styles.docs}
            dangerouslySetInnerHTML={{
              __html: detailArticle?.translates?.[0].content || "",
            }}
          ></div>
        </div>
        <Box textAlign="center">
          <Image
            src="/imgs/mock/category-news/uong-nuoc-dua.jpg"
            alt=""
            margin="24px auto 10px"
          />
        </Box>
      </Box>
      <Flex
        alignItems={"center"}
        justifyContent={{ base: "initial", md: "space-between" }}
        display={{ base: "block", md: "flex" }}
        pt="16px"
        mt="40px"
        borderTop="1px solid #E2E8F0"
      >
        <Text
          color="#000000"
          fontWeight="600"
          fontSize="16px"
          textAlign="right"
        >
          {detailArticle?.authorName}
        </Text>
        <HStack spacing={"8px"}>
          <Image src="/img/global/ic_fb_newsdetail.svg" />
          <Image src="/img/global/ic_youtube_newsdetail.svg" />
          <Image src="/img/global/ic_inta_newsdetail.svg" />
        </HStack>
      </Flex>
    </Box>
  );
}
export default NewsDetail;
