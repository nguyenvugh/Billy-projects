import { AspectRatio, Box, Image } from "@chakra-ui/react";
import styles from "@ltp/styles/ProductDetailCarousel.module.scss";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ComboCarousel({ images }) {
  const renderThumbs = () => {
    if (Array.isArray(images)) {
      return images.map((image, index) => (
        <AspectRatio
          key={index}
          ratio={1}
          border="2px solid transparent"
          _hover={{ border: "2px solid #2154FF" }}
        >
          <Image p={{ base: 1, md: 2 }} src={image?.url} objectFit="cover" />
        </AspectRatio>
      ));
    }
    return [];
  };
  if (Array.isArray(images) && images.length > 0) {
    return (
      <Box
        __css={{
          marginBottom: 4,
          ".carousel-root": {
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
          },
          ".carousel .thumbs-wrapper": {
            margin: 0,
          },
          ".thumbs": {
            transform: "none!important",
            display: "flex",
            flexDirection: "column",
            border: "2px transparent",
          },
          ".carousel .thumb": {
            flexShrink: 0,
            borderWidth: "0!important",
          },
          ".carousel .thumb.selected > div": {
            border: "2px solid #2154FF",
          },
        }}
      >
        <Carousel
          showIndicators={false}
          showStatus={false}
          renderThumbs={renderThumbs}
          showArrows={false}
          thumbWidth="100%"
          className={styles.productDetailCarousel}
        >
          {images.map((item, index) => (
            <AspectRatio key={index} ratio={1}>
              <Image src={item?.url} objectFit="cover" />
            </AspectRatio>
          ))}
        </Carousel>
      </Box>
    );
  }
  return null;
}
