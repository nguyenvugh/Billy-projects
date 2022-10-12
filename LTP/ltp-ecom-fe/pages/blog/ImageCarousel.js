import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon, Image, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_BlOG } from "@ltp/utils/constant";
import { formatDate } from "@ltp/utils/date";
import { getValidSlug } from "@ltp/utils/index";
import { convertTranslatesList } from "@ltp/utils/validate";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import PropType from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderItem = ({ item, lang }) => {
  const dataByLang = Object.keys(item || {}).reduce((pre, current) => {
    let key = current;
    if (key.includes(".")) {
      key = current.split(".")[1];
    }
    pre = { ...pre, [key]: item[current] };
    return pre;
  }, {});
  return (
    <Box position="relative" align="left" height={{ base: "212px", md: "375px", xl: "400px" }}>
      <a href={addTrailingSlash(ROUTE_BlOG(lang, getValidSlug(dataByLang)))}>
        <Box
          height={{ base: "212px", md: "375px", xl: "400px" }}
          bgImage={dataByLang.thumbnail_obj?.url}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        />
      </a>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        padding={{
          base: "0 16px 18px 16px",
          md: "0 20px 22px 20px",
          xl: "0 33px 34px 33px",
        }}
        color="#ffff"
        style={{ backgroundImage: "linear-gradient(180deg, #00000033, #000000 100%)" }}
      >
        <Text
          color="#ffff"
          fontSize={{ base: "16px", md: "23px", xl: "26px" }}
          fontWeight="bold"
          textOverflow="ellipsis"
          overflow="hidden"
          maxHeight="78px"
        >
          <a href={addTrailingSlash(ROUTE_BlOG(lang, getValidSlug(dataByLang)))}>
            {dataByLang.name}
          </a>
        </Text>
        <HStack spacing="6px" justifyContent="flex-start" marginTop="10px">
          <Image
            src="/imgs/mock/category/clock.svg"
            alt="clock"
            title="clock"
            width="14px !important"
            height="14px"
          />
          <Text fontSize="12px" fontWeight="500">
            {formatDate(dataByLang.scheduled_at)}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default function ImageCategoryCarousel({ items }) {
  const { locale: language } = useTranslation();
  if (Array.isArray(items)) {
    items.forEach((item) => convertTranslatesList(item));
  }
  const renderArrowPrev = (clickHandler, hasPrev) => (
    <SliderArrowLeft isDisabled={!hasPrev} onClick={clickHandler} type="prev" />
  );
  const renderArrowNext = (clickHandler, hasNext) => (
    <SliderArrowRight isDisabled={!hasNext} onClick={clickHandler} type="next" />
  );
  return (
    <Box
      position="relative"
      mr={{ base: -2, md: 0 }}
      ml={{ base: -2, md: 0 }}
      __css={{
        ".carousel": {
          overflow: "initial",
        },
        ".dot": {
          position: "relative",
          bgColor: "#ffffff!important",
          boxShadow: "none!important",
          opacity: "1!important",
        },
        ".dot.selected": {
          bgColor: "#007BFF!important",
          _after: {
            content: "''",
            borderRadius: "50%",
            border: "2px solid #2154FF",
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
        autoPlay
        infiniteLoop
        stopOnHover={false}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
      >
        {Array.isArray(items) &&
          items.map((item, index) => <SliderItem key={index} item={item} lang={language} />)}
      </Carousel>
    </Box>
  );
}
ImageCategoryCarousel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropType.array,
};

ImageCategoryCarousel.defaultProps = {
  items: [],
};

const SliderArrowLeft = ({ onClick }) => (
  <Box
    bgColor="#d3d3d3cc"
    display="inline-flex"
    justifyContent="center"
    alignItems="center"
    borderRadius="50%"
    w="36px"
    h="36px"
    position="absolute"
    zIndex="999"
    top="50%"
    left="15px"
    cursor="pointer"
    onClick={onClick}
  >
    <Icon as={ChevronLeftIcon} w="28px" h="28px" />
  </Box>
);

const SliderArrowRight = ({ onClick }) => (
  <Box
    bgColor="#d3d3d3cc"
    display="inline-flex"
    justifyContent="center"
    alignItems="center"
    borderRadius="50%"
    w="36px"
    h="36px"
    position="absolute"
    zIndex="999"
    top="50%"
    right="15px"
    cursor="pointer"
    onClick={onClick}
  >
    <Icon as={ChevronRightIcon} w="28px" h="28px" />
  </Box>
);
