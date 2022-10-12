import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import Lodash from "lodash";
import { IntroduceHomePageI } from "src/pages";
import Container from "@cbi/components/container";

const IntroduceHomePage = ({ data }: { data: IntroduceHomePageI }) => {
  return (
    <Box
      bg="#F7FAFC"
      pt={{ base: "50px", md: "70px", lg: "98px" }}
      pb={{ base: "35px", md: "45px", lg: "59px" }}
    >
      <Container>
        <Box display={{ base: "block", md: "flex" }}>
          <Box w={{ base: "100%", md: "47%" }}>
            <Text
              fontWeight={"bold"}
              color={"#61A533"}
              fontSize={{ base: "12px", md: "18px", lg: "20px" }}
            >
              GIỚI THIỆU
            </Text>
            <Text
              fontWeight={"bold"}
              fontSize={{
                base: "18px",
                sm: "20px",
                md: "25px",
                lg: "35px",
                xl: "44px",
              }}
              color="#2D3748"
              py={{ base: "3px", md: "13px", lg: "16px", xl: "20px" }}
            >
              {data?.title}
            </Text>
            <Text
              fontSize={{
                base: "12px",
                md: "14px",
                lg: "15px",
                xl: "16px",
              }}
              pr={{ base: 0, md: "10%" }}
              color="#718096"
              noOfLines={4}
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
            <Link href="/introduce">
              <Button
                display={{ base: "none", md: "inline-block" }}
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
                py={{ base: "5px", sm: "7px", lg: "10px" }}
                px={{ base: "7px", sm: "15px", md: "20px", lg: "32px" }}
                my={{ base: "5px", sm: "10px", lg: "16px" }}
                _hover={{
                  bg: "#61A533",
                }}
                _active={{
                  bg: "#61A533",
                }}
              >
                Tìm hiểu thêm
              </Button>
            </Link>
          </Box>
          <Box w={{ base: "100%", md: "53%" }} mt={{ base: "10px", md: 0 }}>
            <Image
              src={data?.image}
              borderRadius="10px"
              maxW={"100%"}
              w="100%"
            />
          </Box>
        </Box>
        <Box textAlign={"center"}>
          <Button
            display={{ base: "inline-block", md: "none" }}
            href={Lodash.get(data, "href", "")}
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
            my={{ base: "5px", sm: "10px", lg: "16px" }}
            _hover={{
              bg: "#61A533",
            }}
            _active={{
              bg: "#61A533",
            }}
          >
            Tìm hiểu thêm
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default IntroduceHomePage;
