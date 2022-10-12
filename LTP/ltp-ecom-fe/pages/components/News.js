import { Box, Button, Link as LinkUI, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_BlOG, ROUTE_CATEGORY_NEW } from "@ltp/utils/constant";
import { getValidSlug } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import PropType from "prop-types";
import Image from "next/image";

export default function News({ items }) {
  const { t, locale } = useTranslation();
  return (
    <Box mt={{ base: 5, md: 16 }}>
      <Container>
        <Box align="center">
          <Text as="h2" fontSize={{ base: 16, md: 26 }} fontWeight={700} color="#2D3748">
            {t("latestNews")}
          </Text>
          <Text fontSize={{ base: 14, md: 18 }} fontWeight={400} color="#2D3748">
            {t("discoverLatest")}
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="16px" justifyContent="center">
          {Array.isArray(items) &&
            items.map((item) => (
              <Box key={item.id} role="group" p={{ base: 2, md: 6 }} w="full" zIndex={1}>
                <a
                  href={addTrailingSlash(ROUTE_BlOG(locale, getValidSlug(item)))}
                  w="100%"
                  h="100%"
                >
                  <Image
                    src={item?.thumbnail_obj?.url}
                    loader={() => {
                      return item?.thumbnail_obj?.url;
                    }}
                    height="auto"
                    width="auto"
                    layout="responsive"
                  />
                </a>

                <Stack pt={5}>
                  <a href={addTrailingSlash(ROUTE_BlOG(locale, getValidSlug(item)))}>
                    <Text fontSize={16} color="#2D3748" fontWeight={500}>
                      {item?.name}
                    </Text>
                  </a>
                  <Text fontSize={12} color="#2D3748" fontWeight={400}>
                    {item?.desc}
                  </Text>
                </Stack>
              </Box>
            ))}
        </SimpleGrid>
        <Box mt={8} mb={8} align="center">
          <a href={addTrailingSlash(ROUTE_CATEGORY_NEW(locale))}>
            <Button
              as={LinkUI}
              borderWidth="1px"
              borderColor="#FF0000"
              borderRadius={4}
              textTransform="uppercase"
              color="rgba(255, 0, 0, 1)"
              bg="transparent"
              fontWeight={400}
              _hover={{
                textDecoration: "none",
              }}
            >
              {t("viewAll")}
            </Button>
          </a>
        </Box>
      </Container>
    </Box>
  );
}

News.propTypes = {
  items: PropType.array,
};

News.defaultProps = {
  items: [],
};
