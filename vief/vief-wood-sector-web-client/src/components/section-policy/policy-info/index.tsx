import { ROUTE_ARTICLE_DETAIL } from "@/src/common/constants/routes.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { Article } from "@/src/common/interfaces/common.interface";
import { replacePathParams } from "@/src/common/lib/common.lib";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

type Props = {
  policy: Article;
};
export default function PolicyInfo({ policy }: Props) {
  const router = useViefRouter();

  function handleRoutePolicyPage(slug: string) {
    router.push(
      replacePathParams(ROUTE_ARTICLE_DETAIL["en"], {
        slug,
      })
    );
  }
  return (
    <Stack spacing={{ md: "32px", sm: "16px" }}>
      <Stack>
        <Text variant={{ md: "text20", sm: "text16" }} w="fit-content" borderBottom="1.5px solid #394160">
          Chính sách / Thông tin chính sách
        </Text>
        <Text variant={{ md: "text36", sm: "text28" }} w={{ md: "80%", sm: "full" }}>
          {policy.title}
        </Text>
      </Stack>

      <Stack direction={{ md: "row", sm: "column-reverse" }} spacing={{ md: "64px", sm: "16px" }}>
        <Stack w={{ md: "35%", sm: "100%" }} spacing={{ sm: "16px", md: "32px" }}>
          <Box
            color="text"
            fontWeight={500}
            fontSize="14px"
            textAlign="justify"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
          <Box>
            <Button
              w="128px"
              variant="primary"
              rightIcon={<BsArrowRight />}
              onClick={() => handleRoutePolicyPage(policy.slug)}
            >
              Xem thêm
            </Button>
          </Box>
        </Stack>
        <Box
          w={{ md: "65%", sm: "full" }}
          h={{ md: "450px", sm: "230px" }}
          borderRadius="16px"
          position="relative"
          overflow="hidden"
        >
          <Image src={policy.thumbnail.url} alt="" priority layout="fill" />
        </Box>
      </Stack>
    </Stack>
  );
}
