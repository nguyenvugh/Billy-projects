import { LANG_VI } from "@cbi/constants/languages";
import { DETAIL_MOCK } from "@cbi/services/article/detaildata.mock";
import { formatDate } from "@cbi/utils/date";
import { formatRouterNewsDetail, toImageEndoint } from "@cbi/utils/index";
import { convertTranslatesList } from "@cbi/utils/validate";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon, Link as LinkUI, Text } from "@chakra-ui/react";
import Link from "next/link";
import PropType from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Article } from "src/common/services/article/article.interface";

const SliderItem = ({ ariticle }: { ariticle: Article }) => {
  return (
    <Box
      position="relative"
      // align="left"
      height={{ base: "212px", md: "375px", xl: "400px" }}
    >
      <Link
        passHref
        shallow
        href={formatRouterNewsDetail(ariticle.translates[0].slug)}
      >
        <LinkUI>
          <Box
            height={{ base: "212px", md: "375px", xl: "400px" }}
            bgImage={toImageEndoint(ariticle.thumbnail.key)}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          ></Box>
        </LinkUI>
      </Link>
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
        style={{
          backgroundImage: "linear-gradient(180deg, #00000033, #000000 100%)",
        }}
      >
        <Text
          color="#ffff"
          fontSize={{ base: "16px", md: "23px", xl: "26px" }}
          fontWeight="bold"
          textOverflow="ellipsis"
          overflow="hidden"
          maxHeight="78px"
        >
          <Link
            passHref
            shallow
            href={formatRouterNewsDetail(ariticle.translates[0].slug)}
          >
            <LinkUI>{ariticle.translates[0].title}</LinkUI>
          </Link>
        </Text>
        <HStack spacing="6px" justifyContent="flex-start" marginTop="10px">
          <Text fontSize="12px" fontWeight="500">
            {formatDate(ariticle?.publishAt)}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
type ImageCategoryCarouselProps = {
  slideArticle: Article[];
};
export default function ImageCategoryCarousel({
  slideArticle,
}: ImageCategoryCarouselProps) {
  const renderArrowPrev = (clickHandler: Function, hasPrev: boolean) => (
    <SliderArrowLeft isDisabled={!hasPrev} onClick={clickHandler} type="prev" />
  );
  const renderArrowNext = (clickHandler: Function, hasNext: boolean) => (
    <SliderArrowRight
      isDisabled={!hasNext}
      onClick={clickHandler}
      type="next"
    />
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
        {/* {Array.isArray(items) && */}
        {slideArticle.map((item, index: number) => {
          return <SliderItem key={index} ariticle={item} />;
        })}
      </Carousel>
    </Box>
  );
}
ImageCategoryCarousel.propTypes = {
  items: PropType.array,
};

ImageCategoryCarousel.defaultProps = {
  items: [],
};

const SliderArrowLeft = ({ onClick }: any) => (
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

const SliderArrowRight = ({ onClick }: any) => (
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
