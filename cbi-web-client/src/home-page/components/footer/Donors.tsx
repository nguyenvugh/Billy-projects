import Container from "@cbi/components/container";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { DonorsSection } from "../slide-homepage/interfaces";

const DonorsHomePage = ({ data }: { data: DonorsSection }) => {
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
            textTransform="uppercase"
          >
            Nhà Tài trợ
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
        <Box
          py={{ base: "20px", md: "35px", lg: "44px" }}
          __css={{
            ".react-multiple-carousel__arrow": {
              bg: "#61A533",
            },
            ".react-multi-carousel-list": {
              position: "initial",
            },
            ".react-multiple-carousel__arrow--left": {
              left: "calc(0% + 1px)",
            },
            ".react-multiple-carousel__arrow--right": {
              right: "calc(0% + 1px)",
            },
          }}
          position="relative"
        >
          <Grid templateColumns={".08fr 1fr .08fr"}>
            <Box />
            <Carousel
              ssr
              partialVisbile
              itemClass="image-item"
              responsive={responsive}
              infinite
            >
              {(data.donorAvatarUrls || []).map((logo) => (
                <Box key={logo} mx={"10px"}>
                  <Image src={logo} minW={"100%"} />
                </Box>
              ))}
            </Carousel>
            <Box />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
DonorsHomePage.defaultProps = {
  data: {},
};
export default DonorsHomePage;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
