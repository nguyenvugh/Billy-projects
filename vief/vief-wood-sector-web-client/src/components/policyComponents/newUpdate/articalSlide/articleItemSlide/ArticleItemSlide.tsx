import { ROUTE_ARTICLE_DETAIL } from "@/src/common/constants/routes.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { Article } from "@/src/common/interfaces/common.interface";
import { replacePathParams } from "@/src/common/lib/common.lib";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

type Props = {
  article: Article;
};
const ArticleItemSlide = ({ article }: Props) => {
  const router = useViefRouter();

  function handleRedirectArticleDetail() {
    router.push(replacePathParams(ROUTE_ARTICLE_DETAIL["en"], { slug: article.slug }));
  }
  return (
    <>
      <Stack
        direction={{ md: "row", sm: "column" }}
        spacing={{ md: "64px", sm: "16px" }}
        alignItems={"center"}
        w="full"
      >
        <Box
          w={{ md: "592px", sm: "343px" }}
          h={{ md: "444px", sm: "257.25px" }}
          borderRadius="12px"
          pos="relative"
          overflow="hidden"
        >
          <Image
            src={article?.thumbnail?.url}
            loader={() => {
              return article?.thumbnail?.url;
            }}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </Box>
        <Stack w={{ md: "592px", sm: "343px" }} spacing={{ md: "32px", sm: "16px" }}>
          <Stack spacing="16px">
            <Text variant={{ md: "text36", sm: "text28" }} lineHeight={{ base: "none", sm: "42px" }}>
              {article?.title}
            </Text>
          </Stack>
          <Text variant="text14" textAlign={"justify"}>
            {article?.shortDesc}
          </Text>
          <Button w="max-content" variant="primary" onClick={handleRedirectArticleDetail}>
            Xem thêm
            <ArrowForwardIcon boxSize={"20px"} />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default ArticleItemSlide;
