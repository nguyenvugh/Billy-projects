import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import Lodash from "lodash";
import { SlideHomePageI } from "src/pages";
import { MainSection } from "./interfaces";

const SlideHomePage = ({ data }: { data: MainSection }) => {
  return (
    <Box position={"relative"}>
      <Image
        src={data.bgThumnailUrl || "/img/mock/home-page/img_slide.svg"}
        w="100vw"
        minH={"70vh"}
      />
      <Flex
        minH={"30vh"}
        position={"absolute"}
        top={0}
        bottom={0}
        textAlign="center"
        color="rgba(255, 255, 255, 0.92)"
        flexDirection={"column"}
        justifyContent={"center"}
        height="100%"
      >
        <Box m={"auto"}>
          <Text
            fontWeight={"bold"}
            fontSize={{
              base: "15px",
              sm: "17px",
              md: "25px",
              lg: "50px",
              xl: "64px",
            }}
          >
            {data?.title}
          </Text>
          <Box w={{ base: "75%", md: "65%" }} m="auto">
            <Text
              fontSize={{
                base: "11px",
                sm: "12px",
                md: "14px",
                lg: "15px",
                xl: "16px",
              }}
              mx={"24px"}
              noOfLines={{ base: 2, md: 3 }}
            >
              {data.description}
            </Text>
            <Box>
              <Link href="/evaluate-cebi">
                <Button
                  bg="#61A533"
                  _hover={{
                    bg: "#61A533",
                  }}
                  fontSize={{
                    base: "11px",
                    sm: "13px",
                    md: "15px",
                    lg: "16px",
                    xl: "18px",
                  }}
                  height={"auto"}
                  px={{ base: "10px", sm: "15px", md: "17px", lg: "24px" }}
                  py={{ base: "7px", sm: "10px", md: "14px", lg: "16px" }}
                  my={{ base: "5px", sm: "10px", lg: "16px" }}
                >
                  {data.textBtn}
                </Button>
              </Link>
            </Box>
            <Link
              href="/introduce-evaluate-cebi"
              display="inline-block"
              fontSize={{ base: "11px", md: "14px" }}
            >
              {data.extraText}
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SlideHomePage;
