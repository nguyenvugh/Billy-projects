import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Text } from "@chakra-ui/layout";
import { getProductsCategory } from "@ltp/services/product-category";
import useTranslation from "@ltp/hooks/useTranslation";
import { useEffect } from "react";
import { urlProductsCategory } from "@ltp/services/urlAPI";

export default function CategoryFilter({ parentId, onChangeParams, paramSearch, type }) {
  const { locale } = useTranslation();
  const {
    data: { results },
    mutate,
  } = getProductsCategory({
    parent: parentId,
  });
  useEffect(() => {
    mutate(urlProductsCategory);
  }, [locale]);
  const onChangeCheckBox = (item, isFilter) => {
    onChangeParams(item, type, isFilter);
  };
  return results.map((item) => {
    const checked = paramSearch.category.some((el) => el.id === item.id);
    return (
      <Box padding="8px 0" key={item.id}>
        <Checkbox
          borderColor="#BCCCFF"
          value={item.id}
          onChange={(e) => {
            onChangeCheckBox(item, !!e.target.checked);
          }}
          isChecked={checked}
        >
          <Text color="#071133" fontSize="14px">
            {item.name}
          </Text>
        </Checkbox>
      </Box>
    );
  });
}
CategoryFilter.defaultProps = {
  parentId: null,
  paramSearch: { category: [] },
};
