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
export default function SectionCompanyResearch({ article }: Props) {
  const router = useViefRouter();

  function handleRoutePolicyPage(slug: string) {
    router.push(
      replacePathParams(ROUTE_ARTICLE_DETAIL["en"], {
        slug,
      })
    );
  }
  return (
    <VStack spacing={{ md: "32px", sm: "16px" }}>
      <Stack alignItems={{ sm: "flex-start", md: "flex-end" }} w="full">
        <Box>
          <Text
            variant="text20"
            w="fit-content"
            borderBottom="1.5px solid #394160"
            display={{ md: "flex", sm: "none" }}
          >
            Chuyện doanh nghiệp / Nghiên cứu điển hình
          </Text>
          {/* tilte on mobile */}
          <Text
            variant="text16"
            w="fit-content"
            borderBottom="1.5px solid #394160"
            display={{ md: "none", sm: "flex" }}
          >
            Chuyện doanh nghiệp / Nghiên cứu
          </Text>
        </Box>
        <Text
          variant={{ md: "text36", sm: "text28" }}
          w={{ base: "80%", sm: "full" }}
          textAlign={{ sm: "start", base: "end" }}
        >
          {article.title}
        </Text>
      </Stack>

      <Stack direction={{ md: "row", sm: "column" }} spacing={{ md: "64px", sm: "16px" }} w="full">
        <Box
          w={{ md: "65%", sm: "full" }}
          h={{ md: "450px", sm: "230px" }}
          borderRadius="16px"
          position="relative"
          overflow="hidden"
        >
          <Image src={article.thumbnail.url} alt="" priority layout="fill" />
        </Box>
        <Stack w={{ md: "35%", sm: "full" }} spacing={{ md: "32px", sm: "16px" }}>
          <Box
            fontSize="14px"
            fontWeight={500}
            color="text"
            textAlign="justify"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Box>
            <Button variant="primary" rightIcon={<BsArrowRight />} onClick={() => handleRoutePolicyPage(article.slug)}>
              Xem thêm
            </Button>
          </Box>
        </Stack>
      </Stack>
    </VStack>
  );
}
