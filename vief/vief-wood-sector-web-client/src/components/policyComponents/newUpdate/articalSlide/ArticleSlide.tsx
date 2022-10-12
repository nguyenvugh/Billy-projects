import { Box, Button, Center, Flex, IconButton, Image } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticleItemSlide from "./articleItemSlide/ArticleItemSlide";
import { PolicyPageProps } from "../../interfaces";

export default function ArticleSlide({ latestArticle }: Pick<PolicyPageProps, "latestArticle">) {
  const settingsMd = {
    dots: true,
    autoPlay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 400, // width to change options
        settings: {
          autoPlay: true,
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
      <Box w={{ md: "1216px", sm: "343px" }}>
        <Slider {...settingsMd}>
          {latestArticle.map((article) => (
            <ArticleItemSlide key={article.id} article={article} />
          ))}
        </Slider>
      </Box>
    </Center>
  );
}
