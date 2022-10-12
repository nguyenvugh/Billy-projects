import { ROUTE_ARTICLE_DETAIL } from "@/src/common/constants/routes.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { Article } from "@/src/common/interfaces/common.interface";
import { replacePathParams } from "@/src/common/lib/common.lib";
import { BsArrowRight } from "react-icons/bs";

import { Box, Button, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

type Props = {
  article: Article;
};
export default function SectionCompanyStory({ article }: Props) {
  const router = useViefRouter();

  function handleRoutePolicyPage(slug: string) {
    router.push(
      replacePathParams(ROUTE_ARTICLE_DETAIL["en"], {
        slug,
      })
    );
  }
  return (
    <>
      {/* Display on desktop */}
      <Stack direction="row" w="full" display={{ md: "flex", sm: "none" }} spacing="32px">
        <VStack w={{ md: "50%", sm: "100%" }} align="start" spacing={"32px"}>
          <Stack spacing={"16px"}>
            <Text variant={{ md: "text20", sm: "text16" }} w="fit-content" borderBottom="1.5px solid #394160">
              Chuyện doanh nghiệp / Câu chuyện
            </Text>
            <Text variant={{ md: "text36", sm: "text28" }} w={"100%"} textAlign={"start"}>
              {article.title}
            </Text>
          </Stack>
          <Box
            fontSize="text14"
            fontWeight="500"
            color="text"
            textAlign="justify"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Button
            size="md"
            variant="primary"
            rightIcon={<BsArrowRight />}
            onClick={() => handleRoutePolicyPage(article.slug)}
          >
            Xem thêm
          </Button>
        </VStack>
        <Box
          w={{ md: "50%", sm: "100%" }}
          h={{ md: "444px", sm: "250px" }}
          borderRadius="16px"
          position="relative"
          overflow="hidden"
        >
          <Image src={article.thumbnail.url} alt="" priority layout="fill" />
        </Box>
      </Stack>
      {/* Display on mobile  */}

      <Stack w="100%" spacing={"8px"} direction="column" display={{ sm: "flex", md: "none" }}>
        <Stack spacing="8px">
          <Text variant="text16" w="fit-content" borderBottom="1.5px solid #394160">
            Chuyện doanh nghiệp /Câu chuyện
          </Text>
          <Text variant="text28" w={"100%"} textAlign={"start"}>
            {article.title}
          </Text>
        </Stack>
        <Box
          w={{ md: "50%", sm: "100%" }}
          h={{ md: "444px", sm: "250px" }}
          borderRadius="16px"
          position="relative"
          overflow="hidden"
        >
          <Image src={article.thumbnail.url} alt="" priority layout="fill" />
        </Box>
        <Box
          fontSize="text14"
          fontWeight="500"
          color="text"
          textAlign="justify"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <Button
          size="md"
          variant="primary"
          rightIcon={<BsArrowRight />}
          onClick={() => handleRoutePolicyPage(article.slug)}
        >
          Xem thêm
        </Button>
      </Stack>
    </>
  );
}
