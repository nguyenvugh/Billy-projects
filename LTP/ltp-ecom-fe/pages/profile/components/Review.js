import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Pagination from "@ltp/components/Pagination";
import Star from "@ltp/components/Star";
import useTranslation from "@ltp/hooks/useTranslation";
import { formatPrice } from "@ltp/utils/validate";
import { usePaginator } from "chakra-paginator";
import useReview, { CONFIG_PAGE } from "pages/profile/hooks/useReview";
import { useEffect, useState } from "react";

export default function Viewed() {
  const { t } = useTranslation();
  const [total] = useState(100);
  const { reviewList, page, setParams } = useReview();

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
            {t("reviewHistory")}
          </Text>
          <Text color="#071133" fontSize={14}>
            {t("reviewAndComment")}
          </Text>
        </Box>
      </Flex>
      <Box mt={4}>
        {reviewList.map((item, index) => (
          <Flex
            pos="relative"
            borderBottom={index !== reviewList.length - 1 && "1px solid #BCCCFF"}
            p={4}
          >
            <Box mr={2} w={{ base: "20%", md: "10%" }}>
              <Image boxSize="64px" src={item.thumbnail} />
            </Box>
            <Box w={{ base: "80%", md: "40%" }}>
              <Text fontSize={16}>{item.name}</Text>
              <Text color="#007BFF" fontSize={16} fontWeight={500} mt={2}>
                {`${formatPrice(item.price)} đ`}
              </Text>
              <HStack display={{ base: "flex", md: "none" }} mt={4}>
                <Text fontSize={14} color="#718096" whiteSpace="nowrap">
                  {t("postedAt")} {item.created_date}
                </Text>
                <Star value={item.vote} display="flex" />
              </HStack>
              <Text fontSize={14} display={{ base: "block", md: "none" }}>
                {item.review}
              </Text>
            </Box>
            <Box w="40%" align="right" margin="auto" display={{ base: "none", md: "block" }}>
              <HStack justifyContent="flex-end" mb={2}>
                <Text fontSize={14} color="#718096" whiteSpace="nowrap">
                  {t("postedAt")} {item.created_date}
                </Text>
                <Star value={item.vote} display="flex" />
              </HStack>
              <Text fontSize={14}>{item.review}</Text>
            </Box>
          </Flex>
        ))}
      </Box>
      <Box mt={4} align="right">
        <Pagination
          onChangePage={handlePageChange}
          size={CONFIG_PAGE.ITEMS_PER_PAGE}
          current={1}
          total={page.totalPage}
        />
      </Box>
    </Box>
  );
}
