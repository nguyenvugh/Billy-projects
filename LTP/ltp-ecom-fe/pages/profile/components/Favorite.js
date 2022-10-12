import { Box, Flex, Icon, Image, RadioGroup, Spacer, Stack, Text } from "@chakra-ui/react";
import Pagination from "@ltp/components/Pagination";
import Radio from "@ltp/components/Radio";
import useTranslation from "@ltp/hooks/useTranslation";
import { formatPrice } from "@ltp/utils/validate";
import { usePaginator } from "chakra-paginator";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import useFavorite, { CONFIG_PAGE } from "../hooks/useFavorite";

export default function Favorite() {
  const { t } = useTranslation();
  const [total] = useState(100);
  const {
    favoriteList,
    page,
    params,
    setParams,
    handleDeleteFavorite,
    handleDeleteAllFavorites,
    typeSearch,
    setTypeSearch,
    handleDeleteFavoriteCombo,
    handleDeleteAllFavoritesCombo,
  } = useFavorite();

  const { currentPage, setCurrentPage, pageSize, offset } = usePaginator({
    total,
    initialState: {
      pageSize: CONFIG_PAGE.ITEMS_PER_PAGE,
      currentPage: 1,
      isDisabled: false,
    },
  });

  useEffect(() => {}, [currentPage, pageSize, offset]);

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
    setParams((prevParams) => ({ ...prevParams, page: nextPage }));
  };

  return (
    <Box
      borderRadius={4}
      borderColor="#BCCCFF"
      bgColor="#ffffff"
      ml={{ base: 0, md: 8 }}
      borderWidth={1}
      p={4}
    >
      <Flex mb={2} display={{ base: "block", md: "flex" }}>
        <Flex>
          <Box paddingRight="20px">
            <Text color="#2154FF" textTransform="uppercase" fontSize={18} fontWeight="bold">
              {t("favouriteProducts")}
            </Text>
            <Text color="#071133" fontSize={14}>
              {t("yourFavouriteProducts")}
            </Text>
          </Box>
          <Box>
            <RadioGroup
              onChange={(e) => {
                setTypeSearch(e);
                setParams({ ...params, page: 1 });
              }}
              value={typeSearch}
            >
              <Stack direction="row">
                <Radio value="1">Product</Radio>
                <Radio value="2">Combo</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Flex>
        <Spacer />
        <Box w={{ base: "100%", md: "30%" }} textAlign={{ base: "center", md: "right" }}>
          <Box w="100%" h="2px" bg="#BCCCFF" display={{ base: "block", md: "none" }} mt={2} />
          <Text
            color="#2154FF"
            textTransform="uppercase"
            fontSize={14}
            mt={{ base: 2, md: 6 }}
            cursor="pointer"
            onClick={() => {
              if (typeSearch === "1") {
                handleDeleteAllFavorites();
              } else {
                handleDeleteAllFavoritesCombo();
              }
            }}
          >
            {t("deleteAll")}
          </Text>
        </Box>
      </Flex>
      <Box mt={4}>
        {favoriteList.map((item, index) => (
          <Flex
            key={item.id}
            pos="relative"
            borderBottom={index !== favoriteList.length - 1 && "1px solid #BCCCFF"}
            p={4}
            alignItems="center"
          >
            <Box mr={2} w={{ base: "20%", md: "10%" }}>
              <Image boxSize="80px" src={item.thumbnail} />
            </Box>
            <Box w={{ base: "70%", md: "80%" }}>
              <Text fontSize={16} fontWeight={400}>
                {item.name}
              </Text>
              {/* <HStack mt={2} fontSize={14}>
                <Star value={item.vote} display="flex" /> {item.vote.toFixed(1)}
                <Text as="span" fontSize={14} color="#718096" ml={4}>{item.voteCount} lượt</Text>
                <Text fontSize={14} display={{ base: 'block', md: 'none' }}>{item.price} đ</Text>
              </HStack> */}
            </Box>
            <Box w="10%" margin="auto" display={{ base: "none", md: "block" }}>
              <Text fontSize={14}>{formatPrice(item.price)} đ</Text>
            </Box>
            <Icon
              cursor="pointer"
              boxSize="16px"
              as={RiCloseFill}
              pos="absolute"
              onClick={() => {
                if (typeSearch === "1") {
                  handleDeleteFavorite(item);
                } else {
                  handleDeleteFavoriteCombo(item);
                }
              }}
              top="calc(50% - 8px)"
              right={4}
            />
          </Flex>
        ))}
      </Box>
      <Box mt={4} align="right">
        <Pagination
          onChangePage={handlePageChange}
          size={CONFIG_PAGE.ITEMS_PER_PAGE}
          current={params.page || 1}
          total={page.totalPage}
        />
      </Box>
    </Box>
  );
}
