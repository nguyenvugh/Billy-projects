import { Article } from "@cbi/services/article/article.interface";
import { formatRouterNewsDetail, toImageEndoint } from "@cbi/utils/index";
import { Box, Button, Grid, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const DESCRIPTITON =
  "<b>CEBI</b> là một hệ thống đăng ký tự nguyện dựa trên web, được phát triển bởi Chương trình Phát triển Liên Hợp Quốc (UNDP).";
const NewEvents = ({ articles }: { articles: Article[] }) => {
  return (
    <Box
      mt={{ base: "50px", md: "70px", lg: "98px" }}
      mb={{ base: "50px", md: "70px", lg: "98px" }}
    >
      <Box textAlign={"center"}>
        <Text
          fontWeight={"bold"}
          color={"#61A533"}
          fontSize={{ base: "12px", sm: "15px", md: "18px", lg: "20px" }}
        >
          TIN TỨC - SỰ KIỆN
        </Text>
        <Text
          fontWeight={"bold"}
          color={"#2D3748"}
          fontSize={{
            base: "18px",
            sm: "20px",
            md: "25px",
            lg: "35px",
            xl: "44px",
          }}
          pt={{ base: "7px", md: "10px", lg: "12px" }}
          pb={{ base: "14px", md: "17px", lg: "20px" }}
        >
          Bản tin CEBI
        </Text>
        <Text
          color={"#2D3748"}
          fontSize={{
            base: "12px",
            sm: "13px",
            md: "14px",
            lg: "15px",
            xl: "16px",
          }}
          w={{ base: "100%", sm: "50%" }}
          m="auto"
          dangerouslySetInnerHTML={{ __html: DESCRIPTITON }}
        />
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        gap={"20px"}
        py={{ base: "20px", md: "35px", lg: "44px" }}
      >
        {(articles || []).map((item) => (
          <Box
            key={item.translates[0].title}
            fontSize={{ base: "12px", md: "14px" }}
            border="1px solid #E2E8F0"
            boxShadow={" 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);"}
            borderRadius="12px"
          >
            <Image
              display={"block"}
              src={toImageEndoint(item.thumbnail.key)}
              margin="auto"
              borderTopRightRadius="12px"
              borderTopLeftRadius="12px"
              minW={"100%"}
              maxW={"100%"}
              maxH="178px"
              w="full"
              h="full"
              objectFit="fill"
            />
            <Box
              pb={{ base: "17px", sm: "25px", md: "32px" }}
              px={{ base: "17px", sm: "25px", md: "32px" }}
              pt={{ base: "10px", sm: "17", md: "23px" }}
            >
              <Text
                textTransform={"uppercase"}
                color={"#61A533"}
                pb={{ base: "5px", md: "8px" }}
                fontWeight="600"
                fontSize={{
                  base: "10px",
                  md: "11px",
                  xl: "12px",
                }}
              >
                {item.articleCategory.translates[0].name}
              </Text>
              <NextLink href={formatRouterNewsDetail(item.translates[0].slug)}>
                <Link
                  color={"#2D3748"}
                  pb={{ base: "5px", md: "8px" }}
                  fontWeight="bold"
                  fontSize={{
                    base: "11px",
                    sm: "13px",
                    md: "15px",
                    lg: "16px",
                    xl: "18px",
                  }}
                  overflowWrap="anywhere"
                >
                  {item.translates[0].title}
                </Link>
              </NextLink>
              <Text color="#4A5568" fontSize={{ base: "10px", md: "12px", lg: "14px" }}>
                {item.translates[0].description}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
      <Box textAlign={"center"}>
        <Button
          bg="#61A533"
          borderRadius="6px"
          fontSize={{
            base: "11px",
            sm: "13px",
            md: "15px",
            lg: "16px",
            xl: "18px",
          }}
          color="#FFFFFF"
          height={"auto"}
          py={{ base: "7px", lg: "10px" }}
          px={{ base: "15px", md: "20px", lg: "32px" }}
          as={Link}
          _hover={{
            bg: "#61A533",
          }}
          _active={{
            bg: "#61A533",
          }}
          href="/article"
        >
          Xem tất cả tin
        </Button>
      </Box>
    </Box>
  );
};
NewEvents.defaultProps = {
  data: {},
};
export default NewEvents;
