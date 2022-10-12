import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ItemSlider from "./ItemSlider/ItemSlider";

import { ListImgProps } from "../../interfaces";
import { NextButton } from "@/src/common/components/button/nextButton";
import { PrevButton } from "@/src/common/components/button/prevButton";

export default function SliderImage({ listImg, listImgThumb }: ListImgProps) {
  const settingsMd = {
    vertical: false,
    style: { display: "flex" },
    infinite: true,
    speed: 1000,
    autoplay: true,

    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    responsive: [
      {
        breakpoint: 1200, // width to change options
        settings: {
          vertical: false,
          style: { display: "flex" },
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          prevArrow: <PrevButton />,
          nextArrow: <NextButton />,
        },
      },
      {
        breakpoint: 1024, // width to change options
        settings: {
          centerMode: true,
          centerPadding: "40px",
          infinite: true,
          dots: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // width to change options
        settings: {
          centerMode: true,
          centerPadding: "40px",
          infinite: true,
          dots: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400, // width to change options
        settings: {
          centerMode: true,
          // centerPadding: "40px",
          padding: "20px",
          infinite: true,
          dots: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Center>
      <Stack w={{ md: "1330px", sm: "full" }} h={{ md: "320px", sm: "189px" }} px={"4px"}>
        <Slider {...settingsMd}>
          {listImg?.map((img, index) => (
            <ItemSlider itemImg={img} listImgThumb={listImgThumb} key={index} />
          ))}
        </Slider>
      </Stack>
    </Center>
  );
}
