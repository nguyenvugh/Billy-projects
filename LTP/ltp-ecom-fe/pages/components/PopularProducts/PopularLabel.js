import { Box } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";

const PopularLabel = ({ ...rest }) => {
  const { t } = useTranslation();
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      bgColor="#2154FF"
      textTransform="uppercase"
      borderRadius="0 20px 20px 0"
      padding={{ base: "2px 14px 2px 10px", md: "6px 32px 6px 12px" }}
      fontSize={{ base: "14px", md: "18px" }}
      fontWeight={700}
      lineHeight="1.5"
      color="#ffffff"
      {...rest}
    >
      {t("featureLowercase")}
    </Box>
  );
};

export default PopularLabel;
