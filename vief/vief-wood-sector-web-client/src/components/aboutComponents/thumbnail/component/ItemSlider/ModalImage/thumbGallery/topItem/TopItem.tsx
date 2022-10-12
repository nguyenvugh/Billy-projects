import { UnsplashImg } from "@/src/components/aboutComponents/interfaces";
import { Box, Center, Stack, VStack } from "@chakra-ui/react";
import Image from "next/image";

export type ItemImgThumbnail = {
  props: UnsplashImg;
};

export const TopItem = ({ props }: ItemImgThumbnail) => {
  return (
    <Box h={{ md: "672.5px", sm: "200px" }} w="full" bg="transparent" borderRadius="8px">
      {/* <Image src={props.urls.regular} alt="" width={100} height={100}/> */}
      <Image
        src={props?.urls?.regular}
        layout="fill"
        loader={() => {
          return props?.urls?.regular;
        }}
      />
    </Box>
  );
};
