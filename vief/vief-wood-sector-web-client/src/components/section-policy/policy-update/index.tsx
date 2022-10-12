import { PICTURE } from "@/src/common/constants/common.constant";
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
export default function PolicyUpdate({ policy }: Props) {
  const router = useViefRouter();

  function handleRoutePolicy(slug: string) {
    router.push(
      replacePathParams(ROUTE_ARTICLE_DETAIL["en"], {
        slug,
      })
    );
  }
  return (
    <>
      {/* Display on desktop */}
      <Stack
        direction={{ md: "row", sm: "column" }}
        spacing={{ md: "32px", sm: "16px" }}
        align="center"
        display={{ md: "flex", sm: "none" }}
      >
        <Box
          w={{ md: "50%", sm: "full" }}
          h={{ md: "450px", sm: "230px" }}
          position="relative"
          overflow="hidden"
          borderRadius="12px"
        >
          <Image src={policy.thumbnail.url} alt="" priority layout="fill" />
        </Box>
        <Stack w={{ md: "50%", sm: "full" }} spacing={{ md: "32px", sm: "16px" }}>
          <Stack spacing={{ md: "32px", sm: "16px" }}>
            <Text variant={{ md: "text20", sm: "text16" }} w="fit-content" borderBottom="1.5px solid #394160">
              Chính sách / Mới cập nhật
            </Text>
            <Text variant={{ md: "text36", sm: "text28" }} w={{ md: "80%", sm: "full" }}>
              {policy.title}
            </Text>
          </Stack>
          <Box
            fontSize="14px"
            fontWeight="500"
            color="text"
            textAlign="justify"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
          <Box>
            <Button
              w="128px"
              variant="primary"
              rightIcon={<BsArrowRight />}
              onClick={() => handleRoutePolicy(policy.slug)}
            >
              Xem thêm
            </Button>
          </Box>
        </Stack>
      </Stack>
      {/* Display on mobile */}
      <Stack spacing="8px" display={{ md: "none", sm: "flex" }}>
        <Stack spacing="8px">
          <Text variant="text16" w="fit-content" borderBottom="1.5px solid #394160">
            Chính sách / Mới cập nhật
          </Text>
          <Text variant="text28" w="full">
            {policy.title}
          </Text>
        </Stack>
        <Stack w="full" spacing="8px">
          <Box w="full" h="230px" position="relative" overflow="hidden" borderRadius="12px">
            <Image src={policy.thumbnail.url} alt="" priority layout="fill" />
          </Box>
          <Box
            fontSize="14px"
            fontWeight="500"
            color="text"
            textAlign="justify"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
          <Box>
            <Button
              w="128px"
              variant="primary"
              rightIcon={<BsArrowRight />}
              onClick={() => handleRoutePolicy(policy.slug)}
            >
              Xem thêm
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
