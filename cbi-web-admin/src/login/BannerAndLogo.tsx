import React from "react";
import { Box, Img, Text } from "@chakra-ui/react";
import leftBackgroundImage from "./image/banner login.png";
import Logo from "../common/assets/icons/logo.svg";

const BannerAndLogo = () => {
  return (
    <>
      <Box position="relative" bgColor="rgba(0, 0, 0, 0.7)" w="700px" h="100vh"></Box>
      <Img w="720px" h="100vh" marginLeft="-720px" src={leftBackgroundImage} />

      <Img
        position="absolute"
        top="150px"
        left="100px"
        w="227px"
        h="83px"
        bottom="30px"
        src={Logo}
      />
      <Text
        position="absolute"
        color="white"
        fontWeight="600"
        top="250px"
        fontSize="19px"
        left="100px"
      >
        Chào mừng đến với Oxfam
      </Text>

      <Text
        position="absolute"
        color="white"
        fontWeight="600"
        fontSize="15px"
        top="620px"
        left="90px"
      >
        Chất lượng - Nhanh chóng - Hiệu quả
      </Text>
    </>
  );
};
export { BannerAndLogo };
