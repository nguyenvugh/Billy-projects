import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { formatPrice } from "@ltp/utils/validate";
import { useState } from "react";
import useTranslation from "@ltp/hooks/useTranslation";
import WrapperFilter from "./WrapperFilter";

const FilterPrice = ({ onChange }) => {
  const { t } = useTranslation();
  const [price_from, setPriceFrom] = useState("");
  const [price_to, setPriceTo] = useState("");

  const onSubmit = () => {
    const from = parseInt(price_from.replace(/[^0-9]/g, "")) || undefined;
    const to = parseInt(price_to.replace(/[^0-9]/g, "")) || undefined;
    if (from > to) {
      setPriceFrom(price_to);
      setPriceTo(price_from);
      onChange({ price_from: to, price_to: from });
    } else {
      onChange({ price_from: from, price_to: to });
    }
  };

  return (
    <WrapperFilter title={t("price")}>
      <HStack my={4} spacing="5px">
        <Input
          border="1px solid #BCCCFF"
          placeholder={`đ ${t("FROM")}`}
          padding="7px"
          value={price_from}
          onChange={(e) => setPriceFrom(formatPrice(e.target.value.substring(0, 15)))}
        />
        <Box height="1px" width="15px" bg="#2154FF" />
        <Input
          border="1px solid #BCCCFF"
          placeholder={`đ ${t("TO")}`}
          padding="7px"
          value={price_to}
          onChange={(e) => setPriceTo(formatPrice(e.target.value.substring(0, 15)))}
        />
      </HStack>
      <Button
        background="#2154FF"
        mb={4}
        align="center"
        width="100%"
        fontSize="16px"
        color="#FFFFFF"
        margin="16px 0"
        _hover={{ bg: "#2154FF" }}
        _focus={{ bg: "#2154FF" }}
        onClick={onSubmit}
      >
        {t("apply")}
      </Button>
    </WrapperFilter>
  );
};

export default FilterPrice;
