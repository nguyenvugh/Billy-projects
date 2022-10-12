import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Lodash from "lodash";
import { LoyalCustomerI } from "src/pages";
import Container from "@cbi/components/container";
import { CommentorsSection } from "../slide-homepage/interfaces";

const LoyalCustomer = ({ data }: { data: CommentorsSection }) => {
  return (
    <Box
      bg="#F7FAFC"
      pt={{ base: "50px", md: "70px", lg: "98px" }}
      pb={{ base: "50px", md: "70px", lg: "98px" }}
    >
      <Container>
        <Box textAlign={"center"}>
          {/* <Text
            fontWeight={"bold"}
            color={"#61A533"}
            fontSize={{ base: "12px", sm: "15px", md: "18px", lg: "20px" }}
          >
            KHÁCH HÀNG THÂN THIẾT
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
        <SimpleGrid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          spacingX={"20px"}
          spacingY={{ base: "20px", md: "32px" }}
          py={{ base: "20px", md: "35px", lg: "44px" }}
        >
          {(data.comments || []).map((item) => (
            <Box
              bg="#FFFFFF"
              key={item.comment}
              fontSize={{ base: "12px", md: "14px" }}
              p={"20px"}
              border="1px solid #E2E8F0"
              boxShadow={
                "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
              }
              borderRadius="12px"
              position={"relative"}
            >
              <Flex justifyContent={"space-between"} alignItems="center">
                <Box pr="10%">
                  <Text
                    color={"#2D3748"}
                    pt={{ base: "10px", md: "16px" }}
                    pb={{ base: "5px", md: "8px" }}
                  >
                    {item.comment}
                  </Text>
                  <Text
                    color={"#2D3748"}
                    fontWeight="bold"
                    display={"inline-block"}
                  >
                    {item.commentorName}
                  </Text>
                  <Text color={"#2D3748"} display={"inline-block"}>
                    {` - ${item.position}`}
                  </Text>
                </Box>
                <Image
                  borderRadius={"50%"}
                  w="80px"
                  h="80px"
                  display={"block"}
                  src={item.avatarUrl}
                />
              </Flex>
              <Image
                display={"block"}
                src={"/img/global/ic_question_mark.svg"}
                position={"absolute"}
                top={-3}
                left={10}
              />
            </Box>
          ))}
        </SimpleGrid>
        <Box textAlign={"center"}>
          <Image
            display={"block"}
            src={"/img/global/ic_heart_customer.svg"}
            margin="auto"
          />
        </Box>
      </Container>
    </Box>
  );
};
LoyalCustomer.defaultProps = {
  data: {},
};
export default LoyalCustomer;
