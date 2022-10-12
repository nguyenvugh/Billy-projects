import { AspectRatio, Box, Grid, Stack, Text } from "@chakra-ui/react";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { getValidSlug } from "@ltp/utils/index";
import { ROUTE_CATEGORY_SLUG } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import PropType from "prop-types";
import Image from "next/image";

export default function TopProductCategories({ categories }) {
  const { t, locale } = useTranslation();

  if (!Array.isArray(categories) || categories.length === 0) return null;
  return (
    <Box pt={{ base: 5, md: 10 }} pb={{ base: 5, md: 10 }} bgColor="#ffffff">
      <Container>
        <Box textAlign="center">
          <Text as="h2" fontSize={{ base: 16, md: 26 }} fontWeight={700} color="#2D3748">
            {t("topCategory")}
          </Text>
          <Text fontSize={{ base: 12, md: 18 }} fontWeight={400} color="#718096">
            {t("popularCategory")}
          </Text>
        </Box>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={6}
          mt={{ base: 2, md: 6 }}
          sx={{ "a:hover": { textDecor: "underline" } }}
        >
          {categories.map((item) => (
            <Box
              key={item?.id}
              role="group"
              p={{ base: 2, md: 6 }}
              w="full"
              zIndex={1}
              align="center"
            >
              <a href={addTrailingSlash(ROUTE_CATEGORY_SLUG(locale, getValidSlug(item)))}>
                {/* <AspectRatio ratio={1}> */}
                <Box borderRadius="50%" overflow="hidden">
                  <Image
                    loader={() => {
                      return item?.image?.url;
                    }}
                    src={item?.image?.url}
                    height="185px"
                    width="auto"
                    layout="responsive"
                  />
                </Box>

                {/* </AspectRatio> */}
              </a>
              <Stack pt={5} align="center">
                <a href={addTrailingSlash(ROUTE_CATEGORY_SLUG(locale, getValidSlug(item)))}>
                  <Text as="h3" fontSize={{ base: 14, md: 20 }} color="#585b61">
                    {item?.name}
                  </Text>
                </a>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

TopProductCategories.propTypes = {
  categories: PropType.array,
  onClickCategory: PropType.func,
};

TopProductCategories.defaultProps = {
  categories: [],
  onClickCategory: () => {},
};
