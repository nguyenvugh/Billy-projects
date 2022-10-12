import { Box, HStack, Text } from "@chakra-ui/react";
import MenuHover from "@ltp/components/MenuHover";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_PRIVACY, ROUTE_QUESTION } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { RiArrowDownSFill, RiQuestionFill } from "react-icons/ri";

export default function CustomerSupport() {
  const { t, locale } = useTranslation();
  const CUSTOMER_SUPPORT_LINKS = [
    {
      path: addTrailingSlash(ROUTE_QUESTION(locale)),
      text: "Câu hỏi thường gặp",
      textEn: "FAQs",
    },
    {
      path: addTrailingSlash(ROUTE_PRIVACY(locale)),
      text: "Thông tin chính sách",
      textEn: "Policies",
    },
  ];
  return (
    <MenuHover
      renderTrigger={() => (
        <Box
          bg="transparent"
          fontWeight="normal"
          fontSize={14}
          mr={4}
          ml={4}
          variant="link"
          color="#ffffff"
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
        >
          <HStack>
            <RiQuestionFill />
            <Text fontSize={14}>{t("customerSupport")}</Text>
            <RiArrowDownSFill />
          </HStack>
        </Box>
      )}
    >
      {CUSTOMER_SUPPORT_LINKS.map((item, index) => (
        <Text key={index} color="#071133" fontSize={14} textAlign="center">
          <a passHref shallow href={item.path}>
            <Box
              color="black"
              display="block"
              px={6}
              py={3}
              _hover={{ textDecoration: "none", color: "#007BFF" }}
            >
              {locale === "vi" ? item.text : item.textEn}
            </Box>
          </a>
        </Text>
      ))}
    </MenuHover>
  );
}
