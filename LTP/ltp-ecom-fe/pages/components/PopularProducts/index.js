import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_CATEGORY } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import Product1 from "./Product1";
import Product23 from "./Product23";
import Product4 from "./Product4";

export default function PopularProducts({ products, bgColor }) {
  const { t, locale } = useTranslation();
  const handleClickViewAll = () => {
    window.location.href = addTrailingSlash(ROUTE_CATEGORY(locale));
  };

  if (!Array.isArray(products) || products.length === 0) return null;
  const renderGrid = () => {
    switch (products.length) {
      case 1:
        return (
          <Box position="relative" paddingBottom="49%">
            <Grid
              position="absolute"
              w="100%"
              height="100%"
              gap={4}
              gridTemplateColumns="1fr"
              gridTemplateRows="1fr"
              gridTemplateAreas="'p1'"
            >
              <GridItem gridArea="p1">
                <Product1 product={products[0]} />
              </GridItem>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box position="relative" paddingBottom={{ base: "128%", md: "25%" }}>
            <Grid
              position="absolute"
              w="100%"
              height="100%"
              gap={4}
              gridTemplateColumns={{ base: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" }}
              gridTemplateRows={{ base: "minmax(0, 1fr) minmax(0, 1fr)", md: "1fr" }}
              gridTemplateAreas={{
                base: "'p1' 'p2'",
                md: "'p1 p2'",
              }}
            >
              <GridItem gridArea="p1">
                <Product1 product={products[0]} />
              </GridItem>
              <GridItem gridArea="p2">
                <Product1 product={products[1]} />
              </GridItem>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box position="relative" paddingBottom={["203%", "203%", "48%", "48%", "49%"]}>
            <Grid
              position="absolute"
              w="100%"
              height="100%"
              gap={4}
              gridTemplateColumns={{ base: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" }}
              gridTemplateRows={{
                base: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
                md: "minmax(0, 1fr) minmax(0, 1fr)",
              }}
              gridTemplateAreas={{
                base: "'p1' 'p2' 'p3' 'p3'",
                md: "'p1 p3' 'p2 p3'",
              }}
            >
              <GridItem gridArea="p1">
                <Product1 product={products[0]} />
              </GridItem>
              <GridItem gridArea="p2">
                <Product1 product={products[1]} />
              </GridItem>
              <GridItem gridArea="p3">
                <Product4 product={products[2]} />
              </GridItem>
            </Grid>
          </Box>
        );
      default:
        return (
          <Box
            position="relative"
            overflow="hidden"
            paddingBottom={["250%", "250%", "48%", "48%", "49%"]}
          >
            <Grid
              position="absolute"
              w="100%"
              height="100%"
              gap={4}
              gridTemplateColumns={{
                base: "minmax(0, 1fr) minmax(0, 1fr)",
                md: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
              }}
              gridTemplateRows={{
                base: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
                md: "minmax(0, 1fr) minmax(0, 1fr)",
              }}
              gridTemplateAreas={{
                base: "'p1 p1' 'p2 p3' 'p4 p4' 'p4 p4'",
                md: "'p1 p1 p4 p4' 'p2 p3 p4 p4'",
              }}
            >
              <GridItem gridArea="p1">
                <Product1 product={products[0]} />
              </GridItem>
              <GridItem gridArea="p2">
                <Product23 product={products[1]} />
              </GridItem>
              <GridItem gridArea="p3">
                <Product23 product={products[2]} />
              </GridItem>
              <GridItem gridArea="p4">
                <Product4 product={products[3]} />
              </GridItem>
            </Grid>
          </Box>
        );
    }
  };
  return (
    <Box bgColor={bgColor || "#F9F6F0"}>
      <Box position="relative">
        <Box
          zIndex={-10}
          position="absolute"
          bottom="0"
          width="100%"
          paddingBottom="25%"
          bgImg="url('/imgs/flash-sale-bg.svg')"
          bgRepeat="no-repeat"
          bgPosition="50% 0%"
          bgSize="cover"
        />
      </Box>
      <Box position="relative" pt={8} pb={{ base: 5, md: 10 }}>
        <Container>
          {renderGrid()}
          <Flex justify="center" marginTop="30">
            <Button
              paddingX="30px"
              justifySelf="center"
              bgColor="#ffffff"
              borderWidth="1px"
              borderColor="#2154FF"
              borderRadius={4}
              textTransform="uppercase"
              color="#2154FF"
              bg="transparent"
              fontWeight={400}
              onClick={handleClickViewAll}
            >
              {t("viewAll")}
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
