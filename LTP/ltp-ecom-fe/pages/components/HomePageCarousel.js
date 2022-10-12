import { Box, Button, Link as LinkUI, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import styles from "@ltp/styles/HomePageCarousel.module.scss";
import { getValidSlug } from "@ltp/utils/index";
import { ROUTE_PRODUCT_SLUG } from "@ltp/utils/constant";
import { isEmpty } from "@ltp/utils/validate";
import Link from "next/link";
import PropType from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderArrow = ({ isDisabled, onClick, type, className }) => (
  <button
    type="button"
    disabled={isDisabled}
    onClick={onClick}
    className={`${className} ${isDisabled ? styles.sliderArrowDisabled : ""}`}
  >
    <img src={`/icons/${type}.svg`} alt={type} />
  </button>
);

const SliderItem = ({ item }) => {
  const { t, locale } = useTranslation();
  const renderItem = () => (
    <Box
      align="left"
      height="100%"
      bgImage={item?.thumbnail_obj?.url}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="top"
    >
      {(!isEmpty(item?.name) || !isEmpty(item?.description) || !isEmpty(item?.button)) && (
        <Box
          w={{
            base: "50%",
            md: "40%",
            lg: "35%",
            xl: "30%",
          }}
          position="absolute"
          top="50%"
          transform="translate(0, -50%)"
          left="15%"
          bgColor="#ffffffbf"
          p={4}
          borderRadius="8px"
        >
          <Text
            as="h3"
            fontSize={{ base: 14, md: 36 }}
            fontWeight={700}
            lineHeight={1.4}
            color="#2D3748"
            noOfLines={2}
          >
            {item?.name}
          </Text>
          <Text
            as="p"
            fontSize={{ base: 10, md: 16 }}
            fontWeight={500}
            mt={{ base: 2, md: 4 }}
            mb={{ base: 2, md: 6 }}
            color="#2D3748"
            noOfLines={2}
          >
            {item?.description}
          </Text>
          {!isEmpty(item?.button) && (
            <a
              href={
                item?.type === 2
                  ? ROUTE_PRODUCT_SLUG(locale, getValidSlug(item.product_obj))
                  : item?.link || "/"
              }
            >
              <Button
                as={LinkUI}
                bg="#FF0000"
                color="#ffffff"
                padding={{ base: "9px 13px", md: "12px 40px" }}
                mb={2}
                size={{ base: "md", md: "lg" }}
                fontWeight="800"
                fontSize={{ base: "14px", md: "20px" }}
                textTransform="uppercase"
                _hover={{
                  bg: "#FF0000",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                {item?.button || t("buyNow")}
              </Button>
            </a>
          )}
        </Box>
      )}
    </Box>
  );
  if (isEmpty(item?.button)) {
    return <LinkUI>{renderItem()}</LinkUI>;
  }
  return renderItem();
};

export default function HomePageCarousel({ items }) {
  return (
    <Box
      className={styles.sliderContainer}
      __css={{
        ".carousel": {
          overflow: "initial",
        },
        ".control-dots": {
          bottom: "15px",
        },
        ".dot": {
          position: "relative",
          bgColor: "#ffffff!important",
          boxShadow: "none!important",
          opacity: "1!important",
        },
        ".dot.selected": {
          bgColor: "#FF0000!important",
          _after: {
            content: "''",
            borderRadius: "50%",
            border: "2px solid #FFB3B3",
            display: "block",
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "-6px",
            left: "-6px",
            backgroundColor: "#ffffff",
            zIndex: -1,
          },
        },
      }}
    >
      <Carousel
        dynamicHeight={false}
        showStatus={false}
        showThumbs={false}
        interval={5000}
        // autoPlay
        infiniteLoop
        stopOnHover={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <SliderArrow
            isDisabled={!hasPrev}
            onClick={clickHandler}
            type="prev"
            className={styles.sliderArrowPrev}
          />
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <SliderArrow
            isDisabled={!hasNext}
            onClick={clickHandler}
            type="next"
            className={styles.sliderArrowNext}
          />
        )}
      >
        {Array.isArray(items) && items.map((item) => <SliderItem key={item.id} item={item} />)}
      </Carousel>
    </Box>
  );
}

HomePageCarousel.propTypes = {
  items: PropType.array,
};

HomePageCarousel.defaultProps = {
  items: [],
};
