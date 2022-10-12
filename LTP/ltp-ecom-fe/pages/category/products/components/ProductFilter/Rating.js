import { Image } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import useTranslation from "@ltp/hooks/useTranslation";

export default function Rating({ rate }) {
  const { t } = useTranslation();
  const arr = [];
  for (let i = 0; i < rate; i++) {
    arr.push(i + 1);
  }
  const renderItemRating = (item, checkUp) => (
    <Box display="flex" justifyContent="flex-start">
      <Box display="flex">
        {arr.map((e, index) => {
          if (e <= item) {
            return <Image key={index} src="/imgs/mock/products/Star.svg" alt="Star" title="Star" />;
          }
          return (
            <Image key={index} src="/imgs/mock/products/unStar.svg" alt="Unstar" title="Unstar" />
          );
        })}
      </Box>
      <Text color="#071133" marginLeft="10px" fontSize="14px">
        {`${t("from")} ${item}.0 ${!checkUp ? t("above") : ""}`}
      </Text>
    </Box>
  );
  return (
    <Box margin="16px 0" display="flex" flexDirection="column-reverse">
      {arr.map((item, index) => (
        <Box key={index}>{renderItemRating(item, item === arr.length)}</Box>
      ))}
    </Box>
  );
}
