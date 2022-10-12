import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ItemNews from "@ltp/components/News/ItemNew";
import useTranslation from "@ltp/hooks/useTranslation";
import Lodash from "lodash";
import { useMemo } from "react";

function PostRelate({ items }) {
  const { t, locale: language } = useTranslation();
  const data_detail = useMemo(() => {
    const data = items.map((el) => {
      const translates = Lodash.get(el, "translates", []);
      const item_translate = translates.reduce((obj, item) => {
        if (item.language_code === language) {
          return {
            ...obj,
            [item.language_field]: item.language_value,
          };
        }
        return obj;
      }, {});
      return {
        ...el,
        ...item_translate,
      };
    });
    return data;
  }, [language, JSON.stringify(items)]);
  return (
    <Box>
      <Text
        color="#2154FF"
        fontWeight="bold"
        marginBottom={{ base: "25px", md: "28px", xl: "34px" }}
        textTransform="uppercase"
        fontSize={{ base: "24px", md: "28px", xl: "36px" }}
      >
        {t("relatedPosts")}
      </Text>
      <SimpleGrid columns={[1, 1, 3]} spacing="21px" justifyContent="center" display="grid">
        {data_detail.map((item, index) => (
          <Box key={index} display={index >= 3 && "none"}>
            <ItemNews
              {...item}
              key={index}
              width="100%"
              height={["193px", "193px", "160px"]}
              noOfLines={3}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
PostRelate.defaultProps = {
  items: [],
};
export default PostRelate;
