import { Box, Button, Center, Flex, HStack, Image, Spacer, Text, Tooltip } from "@chakra-ui/react";
import Carousel from "@ltp/components/Carousel";
import Container from "@ltp/components/Container";
import { useCountDown } from "@ltp/hooks/index";
import useTranslation from "@ltp/hooks/useTranslation";
import { getCharityHome } from "@ltp/services/home";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import { arrayChunks } from "@ltp/utils/index";
import { formatPrice } from "@ltp/utils/price";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CharityProduct from "./CharityProduct";

const MAX_CHARACTER = 100;
const CountDownBox = ({ label }) => (
  <Center
    w={{ base: "32px", md: "64px" }}
    h={{ base: "32px", md: "64px" }}
    bg="#FF006B"
    borderRadius="8px"
    color="#ffffff"
    fontSize={{ base: "14px", md: "28px" }}
  >
    <Box as="span" fontWeight={700}>
      {label}
    </Box>
  </Center>
);

const truncate = (text, limit) => {
  if (!text || text.length == 0) return;
  let i = 0;
  let str = String(text);
  const len = text.length;
  for (i; i < len; ++i) {
    str = len <= limit ? str : `${str.substring(0, limit + 1)}...`;
  }
  return str;
};

const Charity = () => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const [charity, setCharity] = useState({ isActive: false });
  const { hours, minutes, seconds } = useCountDown({ endTime: charity.end_date });

  useEffect(() => {
    getCharity();
  }, []);

  const getCharity = async () => {
    try {
      const request = await getCharityHome();
      const response = await request.data;
      if (!response?.data) return;
      const { name, description, end_date, products, total_amount, sold_amount } = response.data;
      const chunks = arrayChunks(products || [], 4);
      setCharity({
        chunks,
        name,
        description,
        end_date,
        products,
        sold_amount,
        total_amount,
        isActive: true,
      });
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }
  };

  const handleClickViewAll = () => {
    window.location.href = addTrailingSlash(ROUTE_PRODUCT(locale) + "?is_charity=1");
  };

  if (!charity.isActive) return null;
  if (charity.sold_amount >= charity.total_amount) return null;
  return (
    <>
      <Box mt={8}>
        <Container>
          <Flex>
            <Box pr={4} width="65%">
              <Text as="h2" color="#2D3748" fontSize={32} fontWeight="bold">
                {charity.name}
              </Text>
              <Text color="rgba(62, 67, 76, 0.72)" fontSize={22}>
                {truncate(charity.description, MAX_CHARACTER)}
                <Box style={{ display: "inline-block", position: "relative" }}>
                  <Image
                    marginLeft="5px"
                    cursor="pointer"
                    _hover={{
                      "& ~ p": {
                        display: "flex",
                      },
                    }}
                    src="/icons/ic-more-info-grey.svg"
                    alt="Charity"
                    title="Charity"
                  />
                  <Text
                    display="none"
                    position="absolute"
                    left="30px"
                    top="-50px"
                    width="42vw"
                    fontWeight="400"
                    backgroundColor="#ffffff"
                    boxShadow="2px 4px 8px 2px rgb(0 0 0 / 20%)"
                    padding="25px 30px"
                    borderRadius="20px"
                    zIndex={999}
                    lineHeight="1.2em"
                  >
                    {charity.description}
                  </Text>
                </Box>
              </Text>
            </Box>
            <Spacer />
            <Box flexShrink={0}>
              {charity.end_date && (
                <HStack spacing={4} mb={8}>
                  <CountDownBox label={hours} />
                  <CountDownBox label={minutes} />
                  <CountDownBox label={seconds} />
                </HStack>
              )}
              <Tooltip
                label={`${t("raiseFundProcess")}: ${formatPrice(charity.sold_amount)}`}
                placement="top"
                hasArrow
              >
                <Box
                  width="220px"
                  position="relative"
                  h="38px"
                  borderRadius="19px"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  color="#ffffff"
                  fontWeight={600}
                  fontSize={{ base: 14, md: 16 }}
                >
                  <Box
                    w={`${(+charity.sold_amount * 100) / charity.total_amount}%`}
                    borderRadius="19px"
                    h="100%"
                    bg="linear-gradient(#FD2F31, #FD25C1)"
                    position="absolute"
                    top={0}
                    left={0}
                    zIndex={9}
                  />
                  <Box
                    w="100%"
                    position="absolute"
                    top={0}
                    left={0}
                    h="100%"
                    backgroundColor="#FFB3B3"
                  />
                  <Text zIndex={99} width="100%" textAlign="center">
                    {formatPrice(charity.total_amount)}
                  </Text>
                </Box>
              </Tooltip>
            </Box>
          </Flex>
          <Carousel>
            {Array.isArray(charity?.chunks) &&
              charity.chunks.map((slide) => (
                <Box display="flex" flexWrap="wrap" flexDirection="row">
                  {slide.map((item) => (
                    <CharityProduct key={item.id} {...item} />
                  ))}
                </Box>
              ))}
          </Carousel>
        </Container>
      </Box>
      <Box mt={10} pb={{ base: 10, md: 12 }} align="center">
        <Button
          onClick={handleClickViewAll}
          bgColor="#ffffff"
          borderWidth="1px"
          borderColor="#FF0000"
          borderRadius={4}
          textTransform="uppercase"
          color="rgba(255, 0, 0, 1)"
          bg="transparent"
          fontWeight={400}
        >
          {t("viewAll")}
        </Button>
      </Box>
    </>
  );
};

export default Charity;
