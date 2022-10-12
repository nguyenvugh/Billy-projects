import { UnsplashImg } from "@/src/components/aboutComponents/interfaces";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

export type ItemImgThumbnail = {
  props: UnsplashImg;
};

export const BottomItem = ({ props }: ItemImgThumbnail) => {
  return (
    <Box h={{ md: "132px", sm: "100px" }}>
      <Image
        src={props?.urls?.regular}
        loader={() => {
          return props?.urls?.regular;
        }}
        layout="fill"
        alt="a"
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
};
