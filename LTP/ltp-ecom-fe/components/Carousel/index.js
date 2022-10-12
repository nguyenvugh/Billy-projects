import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Icon } from "@chakra-ui/react";
import { Carousel as CarouselUI } from "react-responsive-carousel";

const Carousel = ({ children }) => {
  const renderArrowPrev = (clickHandler, hasPrev) => (
    <SliderArrowLeft isDisabled={!hasPrev} onClick={clickHandler} type="prev" />
  );
  const renderArrowNext = (clickHandler, hasNext) => (
    <SliderArrowRight isDisabled={!hasNext} onClick={clickHandler} type="next" />
  );

  return (
    <Box
      mt={8}
      __css={{
        ".carousel": {
          overflow: "initial",
        },
        ".control-dots": {
          bottom: "-28px",
        },
        ".dot": {
          position: "relative",
          bgColor: "#FF0000!important",
          boxShadow: "none!important",
        },
        ".dot.selected": {
          _after: {
            content: "''",
            borderRadius: "50%",
            border: "2px solid #FFB3B3",
            display: "block",
            width: "24px",
            height: "24px",
            position: "absolute",
            top: "-8px",
            left: "-8px",
          },
        },
      }}
    >
      <CarouselUI
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
      >
        {children}
      </CarouselUI>
    </Box>
  );
};

export default Carousel;

const SliderArrowLeft = ({ onClick }) => (
  <Box
    bgColor="#FFD3AB"
    display="inline-flex"
    justifyContent="center"
    alignItems="center"
    borderRadius="50%"
    w="36px"
    h="36px"
    position="absolute"
    zIndex="999"
    top="50%"
    left={{ base: "-10px", lg: "-36px" }}
    cursor="pointer"
    onClick={onClick}
  >
    <Icon as={ChevronLeftIcon} w="28px" h="28px" />
  </Box>
);

const SliderArrowRight = ({ onClick }) => (
  <Box
    bgColor="#FFD3AB"
    display="inline-flex"
    justifyContent="center"
    alignItems="center"
    borderRadius="50%"
    w="36px"
    h="36px"
    position="absolute"
    zIndex="999"
    top="50%"
    right={{ base: "-10px", lg: "-36px" }}
    cursor="pointer"
    onClick={onClick}
  >
    <Icon as={ChevronRightIcon} w="28px" h="28px" />
  </Box>
);
