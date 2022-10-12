import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Grid, Image, Text, Icon } from "@chakra-ui/react";
import Container from "@cbi/components/container";
import { BsFillCircleFill } from "react-icons/bs";
const participants = [
  "Khởi nghiệp",
  "Doanh nghiệp vừa và nhỏ",
  "Công ty lớn ( tư nhân hoặc quốc gia)",
  "Công ty đa quốc gia",
];
const Participants = (props: any) => {
  return (
    <Box bg="#F7FAFC" pt="62px" pb="82px">
      <Container>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          <Box>
            <Text
              color="rgba(0, 0, 0, 0.8)"
              fontSize={{ base: "20px", md: "30px", lg: "36px" }}
              fontWeight="bold"
              mb="25px"
            >
              Thành phần tham gia CEBI
            </Text>
            <Text fontWeight={500} pb="16px" fontSize={{ base: "14px", lg: "16px" }}>
              Tất cả các lĩnh vực, cấp độ và quy mô của các công ty kinh doanh tại Việt Nam và mong
              muốn cải thiện khả năng giảm nhẹ và thích ứng với biến đổi khí hậu.
            </Text>
            {participants.map((item) => {
              return (
                <Flex
                  key={item}
                  alignItems="center"
                  fontWeight={600}
                  fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                >
                  <Icon as={BsFillCircleFill} w="8px" h="8px" color={"#61A533"} />
                  <Text mb="10px" ml="10px">
                    {item}
                  </Text>
                </Flex>
              );
            })}
          </Box>
          <Box textAlign={{ base: "center", md: "right" }} mb={{ base: "50px", sm: "70px", md: 0 }}>
            <Box position="relative" display={"inline-block"}>
              <Image
                src="/img/global/ic_participants_CBI.svg"
                filter="blur(8px)"
                w={{ base: "90vw", sm: "auto" }}
              />
              <Image
                src="/img/global/ic_participants_CBI.svg"
                position={"absolute"}
                right={{ base: "7%", md: "86px" }}
                top={{ base: "10%", md: "86px" }}
              />
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

Participants.propTypes = {};

export default Participants;
