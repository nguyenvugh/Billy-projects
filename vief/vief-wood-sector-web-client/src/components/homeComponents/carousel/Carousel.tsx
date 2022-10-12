import { Box, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Banner } from "../interfaces";

type CarouselProps = {
  banners: Banner[];
};
const Carousel = ({ banners }: CarouselProps) => {
  return (
    <Box
      w="full"
      backgroundPosition="center"
      h={{
        md: "calc(100vh - 96px)",
        sm: "calc(100vh - 66px)",
      }}
    >
      <Swiper pagination={true} modules={[Pagination, Autoplay]} autoplay={{ delay: 3000 }} slidesPerView={1}>
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Box w="full" h="full" position="relative">
              <a href={banner.link} target="_blank" rel="noreferrer">
                <Image src={banner.image.url} alt="" priority layout="fill" />
              </a>
              <Stack
                position="absolute"
                bottom={{ md: "40%", sm: "10%" }}
                left={{ md: "50%", sm: "10%" }}
                w={{ md: "unset", sm: "80%" }}
                m="auto"
                borderRadius="12px"
                bg={{ md: "unset", sm: "white" }}
                opacity={{ md: "unset", sm: "0.8" }}
                p={{ md: "unset", sm: "16px" }}
              >
                <Text variant={{ md: "text28", sm: "text20" }}>{banner.translates[0].title}</Text>
                <Text variant="text36" fontSize={{ md: "80px", sm: "28px" }} color="green.primary" lineHeight="100%">
                  {banner.translates[0].subTitle}
                </Text>
                <Text
                  textAlign={{ md: "left", sm: "center" }}
                  variant="text14"
                  maxW="500px"
                  className="text-7-line"
                  dangerouslySetInnerHTML={{
                    __html: banner.translates[0].shortDesc,
                  }}
                />
              </Stack>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default Carousel;
