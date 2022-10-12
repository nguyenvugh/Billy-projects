import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Pagination from "@ltp/components/Pagination";
import Star from "@ltp/components/Star";
import useTranslation from "@ltp/hooks/useTranslation";
import { formatPrice } from "@ltp/utils/validate";
import { usePaginator } from "chakra-paginator";
import { useEffect, useState } from "react";
import useSeen, { CONFIG_PAGE } from "../hooks/useSeen";

export default function Viewed() {
  const { t } = useTranslation();
  const [total] = useState(100);
  const { seenList, page, setParams } = useSeen();

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
        <Box>
          <Text color="#2154FF" textTransform="uppercase" fontSize={18} fontWeight="bold">
            {t("recentlyView")}
          </Text>
          <Text color="#071133" fontSize={14}>
            {t("yourRecentlyView")}
          </Text>
        </Box>
      </Flex>
      <Box mt={4}>
        {seenList.map((item, index) => (
          <Flex
            pos="relative"
            borderBottom={index !== seenList.length - 1 && "1px solid #BCCCFF"}
            p={4}
          >
            <Box mr={2} w={{ base: "20%", md: "10%" }}>
              <Image boxSize="64px" src={item.thumbnail} />
            </Box>
            <Box w={{ base: "70%", md: "80%" }}>
              <Text fontSize={16}>{item.name}</Text>
              <HStack fontSize={14} mt={2}>
                <Star value={item.vote} display="flex" /> {item.vote.toFixed(1)}
                <Text as="span" fontSize={14} color="#718096" ml={4}>
                  {item.voteCount} {t("reviews")}
                </Text>
                <Text fontSize={14} display={{ base: "block", md: "none" }}>
                  {formatPrice(item.price)} đ
                </Text>
              </HStack>
            </Box>
            <Box w="10%" align="right" margin="auto" display={{ base: "none", md: "block" }}>
              <Text fontSize={14}>{formatPrice(item.price)} đ</Text>
            </Box>
          </Flex>
        ))}
      </Box>
      <Box mt={4} align="right">
        <Pagination
          onChangePage={handlePageChange}
          current={1}
          size={CONFIG_PAGE.ITEMS_PER_PAGE}
          total={page.totalPage}
        />
      </Box>
    </Box>
  );
}
