import { Box, Flex, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { addTrailingSlash } from "@ltp/utils/validate-url";

export default function ProductRelate(props) {
  const { t } = useTranslation();
  const {
    title,
    viewAll,
    marginTop = "30px",
    textTransform = "",
    href = "#",
    seeMore,
    heading = "",
  } = props;
  const onClick = () => {
    seeMore instanceof Function && seeMore();
  };

  return (
    <Box marginTop={marginTop}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        sx={{ "a:hover": { textDecoration: "underline" } }}
      >
        <Text
          as={heading}
          color="#2154FF"
          fontSize={{ base: "18px", md: "20px", xl: "24px" }}
          fontWeight="bold"
          textTransform={textTransform}
        >
          {title}
        </Text>
        {!!viewAll && (
          <a href={addTrailingSlash(href)}>
            <Box color="#2154FF" fontSize="14px" onClick={onClick}>
              {t("viewAll")}
            </Box>
          </a>
        )}
      </Flex>
      <Box height="2px" background="#BCCCFF" margin="16px 0 24px" position="relative">
        <Box
          position="absolute"
          top={0}
          bottom="0"
          left="0"
          height="100%"
          width={{ base: "25%", lg: "303px" }}
          background="#2154FF"
        />
      </Box>
    </Box>
  );
}
