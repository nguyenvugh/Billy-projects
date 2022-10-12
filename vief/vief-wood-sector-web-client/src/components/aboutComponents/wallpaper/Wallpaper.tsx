import { Box, Center, Flex } from "@chakra-ui/react";
import Image from "next/image";

const Wallpaper = () => {
  return (
    <Center w="full" h={{ md: "650px", sm: "240px" }} position="relative">
      <Image src="/vief-about.png" layout="fill" alt="" />
    </Center>
  );
};

export default Wallpaper;
