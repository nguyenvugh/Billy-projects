import { Box, Center, IconButton } from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ItemSliderMaster from "./itemSliderMaster";
import { ThumbnailItemProp } from "../../interfaces";
import { PrevButton } from "@/src/common/components/button/prevButton";
import { NextButton } from "@/src/common/components/button/nextButton";

export default function SliderMaster({ listImgThumb }: ThumbnailItemProp) {
  const settingsMd = {
    style: { display: "flex" },
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    responsive: [
      {
        breakpoint: 1200, // width to change options
        settings: {
          style: { display: "flex" },
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          prevArrow: <PrevButton />,
          nextArrow: <NextButton />,
        },
      },

      {
        breakpoint: 800, // width to change options
        settings: {
          style: { display: "flex" },
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: <PrevButton />,
          nextArrow: <NextButton />,
        },
      },
      {
        breakpoint: 400, // width to change options
        settings: {
          style: { display: "flex" },
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: <PrevButton />,
          nextArrow: <NextButton />,
        },
      },
    ],
  };
  return (
    <Center>
      <Box w={{ md: "1330px", sm: "full" }} h={{ md: "320px", sm: "189px" }}>
        <Slider {...settingsMd}>
          {listImgThumb.map((img, index) => (
            <ItemSliderMaster itemImg={img} key={index} />
          ))}
        </Slider>
      </Box>
    </Center>
  );
}
