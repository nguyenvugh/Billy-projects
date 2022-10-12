import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { getFlashSaleHome } from "@ltp/services/home";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import { addZeroNumber, arrayChunks } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import FlashSaleProductItem from "./FlashSaleProductItem";
import Image from "next/image";

const CountDownBox = ({ label }) => (
  <Center
    w={{ base: "32px", md: "64px" }}
    h={{ base: "32px", md: "64px" }}
    ml={{ base: "16px", md: "64px" }}
    bg="#FF0000"
    borderRadius="8px"
    color="#ffffff"
    fontSize={{ base: "14px", md: "28px" }}
  >
    <Box as="span" fontWeight={700}>
      {label}
    </Box>
  </Center>
);
export default function FlashSale() {
  const [flashSaleList, setFlashSaleList] = useState([]);
  const [flashSaleTime, setFlashSaleTime] = useState({ startDate: null, endDate: null });
  const [status, setStatus] = useState([]);
  const router = useRouter();
  const { t, locale } = useTranslation();
  useEffect(() => {
    getFlashSaleList();
  }, [locale]);

  const getFlashSaleList = async () => {
    try {
      const request = await getFlashSaleHome();
      const response = await request.data;

      const chunks = arrayChunks(response?.result?.products || [], 4);
      setStatus(response.product_statuses);
      setFlashSaleList(chunks);
      setFlashSaleTime({
        startDate: response.result.start_date,
        endDate: response.result.end_date,
      });
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }
  };

  const handleClickViewAll = () => {
    window.location.href = addTrailingSlash(ROUTE_PRODUCT(locale) + "?is_flash_sale=1");
  };

  if (flashSaleList.length == 0) return null;
  return (
    <>
      <Box mt={8}>
        <Container>
          <Flex alignItems="center">
            <Box>
              <Text as="h2">
                <Image
                  loader={() => {
                    return "/imgs/flash-sale.svg";
                  }}
                  src="/imgs/flash-sale.svg"
                  alt="Flash-sale"
                  title="Flash-sale"
                  width="420"
                  height="auto"
                />
              </Text>
            </Box>
            <Spacer />
            <Box display="flex-end">
              <CountDown flashSaleTime={flashSaleTime} />
            </Box>
          </Flex>
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
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  top: "-6px",
                  left: "-6px",
                },
              },
            }}
          >
            <Carousel
              showStatus={false}
              showThumbs={false}
              infiniteLoop
              renderArrowPrev={(clickHandler, hasPrev) => (
                <SliderArrowLeft isDisabled={!hasPrev} onClick={clickHandler} type="prev" />
              )}
              renderArrowNext={(clickHandler, hasNext) => (
                <SliderArrowRight isDisabled={!hasNext} onClick={clickHandler} type="next" />
              )}
            >
              {flashSaleList.map((slide) => (
                <Box display="flex" flexWrap="wrap" flexDirection="row">
                  {slide.map((flashSale) => (
                    <FlashSaleProductItem
                      key={flashSale.id}
                      flashSale={flashSale}
                      status={status}
                    />
                  ))}
                </Box>
              ))}
            </Carousel>
          </Box>
        </Container>
      </Box>
      <Box mt={10} pb={{ base: 10, md: 12 }} align="center">
        <Button
          bgColor="#ffffff"
          borderWidth="1px"
          borderColor="#FF0000"
          borderRadius={4}
          textTextTransform="uppercase"
          color="rgba(255, 0, 0, 1)"
          bg="transparent"
          fontWeight={400}
          onClick={handleClickViewAll}
        >
          {t("viewAll")}
        </Button>
      </Box>
    </>
  );
}

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

const CountDown = ({ flashSaleTime }) => {
  const [countDown, setCountDown] = useState({
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    if (!flashSaleTime.startDate) return;
    const endTime = new Date(flashSaleTime.endDate);
    const startTime = new Date();
    const diffTime = endTime - startTime;
    let duration = moment.duration(diffTime, "milliseconds");
    const interval = 1000;

    const countDownTimer = setInterval(() => {
      duration = moment.duration(duration - interval, "milliseconds");
      const hours = duration.days() * 24 + duration.hours();
      setCountDown({
        day: addZeroNumber(duration.days()),
        hours: addZeroNumber(hours),
        minutes: addZeroNumber(duration.minutes()),
        seconds: addZeroNumber(duration.seconds()),
      });
    }, interval);

    return () => clearInterval(countDownTimer);
  }, [flashSaleTime]);
  return (
    <HStack>
      <CountDownBox label={countDown.hours} />
      <CountDownBox label={countDown.minutes} />
      <CountDownBox label={countDown.seconds} />
    </HStack>
  );
};
