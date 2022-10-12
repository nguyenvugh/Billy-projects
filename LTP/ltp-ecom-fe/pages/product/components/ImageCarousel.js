import React, { useEffect, useState } from "react";
import { Image, Box, AspectRatio } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PropsType from "prop-types";
import Loadash from "lodash";
import styles from "@ltp/styles/ProductDetailCarousel.module.scss";

export default function ShowImages({ product }) {
  const images = Loadash.get(product, "images", []);
  const listImages = Loadash.slice(images, 0, 5);
  const [itemSelect, SetItemSelect] = useState(0);

  useEffect(() => {
    SetItemSelect(0);
  }, [product]);
  const renderThumbs = () =>
    listImages.map((el, index) => (
      <AspectRatio
        key={index}
        ratio={1}
        border="3px solid transparent"
        _hover={{ border: "3px solid #2154FF" }}
      >
        <figure>
          <Image
            src={`${el.url}`}
            alt={el?.altSEO || ""}
            key={index}
            objectFit="cover"
            title={el?.titleSEO || ""}
          />
          <figcaption style={{ display: "none" }}>{el.captionSEO}</figcaption>
        </figure>
      </AspectRatio>
    ));
  return (
    <Box
      __css={{
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
          border: "3px transparent",
        },
        ".carousel .thumb": {
          flexShrink: 0,
          borderWidth: "0!important",
        },
        ".carousel .thumb.selected > div": {
          border: "3px solid #2154FF",
        },
      }}
    >
      <Carousel
        showIndicators={false}
        showStatus={false}
        renderThumbs={renderThumbs}
        className={styles.productDetailCarousel}
        selectedItem={itemSelect}
        showArrows={false}
        thumbWidth="100%"
      >
        {listImages.map((item, index) => (
          <AspectRatio key={index} ratio={1}>
            <figure>
              <Image
                src={`${item.url}`}
                alt={item?.altSEO || ""}
                title={item?.titleSEO || ""}
                key={index}
                objectFit="cover"
              />
              <figcaption style={{ display: "none" }}>{item.captionSEO}</figcaption>
            </figure>
          </AspectRatio>
        ))}
      </Carousel>
    </Box>
  );
}
ShowImages.propsType = {
  product: PropsType.object,
};

ShowImages.defaultProps = {
  product: {},
};
