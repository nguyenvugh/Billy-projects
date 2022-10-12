import { Box, Button, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import Lodash from "lodash";
import { EvaluateCBII } from "src/pages";
import { IntroduceSection } from "../slide-homepage/interfaces";

const EvaluateCBI = ({ data }: { data: IntroduceSection }) => {
  return (
    <Box
      mt={{ base: "50px", md: "70px", lg: "98px" }}
      mb={{ base: "50px", md: "70px", lg: "98px" }}
    >
      <Box textAlign={"center"}>
        {/* <Text
          fontWeight={"bold"}
          color={"#61A533"}
          fontSize={{ base: "12px", sm: "15px", md: "18px", lg: "20px" }}
        >
          CHỈ SỐ KHÍ HẬU DOANH NGHIỆP
        </Text> */}
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
          {data.title}
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
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        gap={"20px"}
        py={{ base: "20px", md: "35px", lg: "44px" }}
      >
        {(data.items || []).map((item) => (
          <Box
            key={item.title}
            fontSize={{ base: "12px", md: "14px" }}
            p={"20px"}
            border="1px solid #E2E8F0"
            boxShadow={" 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);"}
            borderRadius="12px"
            textAlign={"center"}
          >
            <Flex w="52px" margin="auto" h="52px" bg="#61A533" borderRadius={"50%"}>
              <Image display={"block"} src={item.iconUrl} margin="auto" />
            </Flex>
            <Text
              color={"#2D3748"}
              pt={{ base: "10px", md: "16px" }}
              pb={{ base: "5px", md: "8px" }}
              fontWeight="bold"
            >
              {item.title}
            </Text>
            <Text color="#4A5568">{item.description}</Text>
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
          href="/introduce-evaluate-cebi"
        >
          {data.textBtn}
        </Button>
      </Box>
    </Box>
  );
};
EvaluateCBI.defaultProps = {
  data: {},
};
export default EvaluateCBI;
