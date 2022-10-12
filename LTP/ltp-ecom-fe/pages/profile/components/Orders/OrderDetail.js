import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import DangerButton from "@ltp/components/Button/DangerButton";
import WarningButton from "@ltp/components/Button/WarningButton";
import useTranslation from "@ltp/hooks/useTranslation";
import { formatDate, formatDateTime } from "@ltp/utils/date";
import { formatPrice, formatPriceReturnZero } from "@ltp/utils/validate";
import Lodash from "lodash";
import { useRouter } from "next/router";
import { ORDERS, ORDER_TRACKING } from "pages/profile";
import useOrderDetail from "pages/profile/hooks/useOrderDetail";
import { useState } from "react";
import CancelOrderDetail from "./CancelOrderModal";
import { getStatusText } from "./OrderListTable";
import ReviewModal from "./ReviewModal";

const tableHeaderStyles = {
  fontSize: 16,
  fontWeight: 500,
  textTransform: "uppercase",
  color: "#535050",
  py: 2,
};

const tableBody = {
  flexGrow: 1,
  fontSize: 14,
  color: "#3A3A3A",
  p: 4,
  bgColor: "#F3F4F6",
  borderRadius: 4,
};

const tableBodyStyles = {
  fontSize: 14,
  color: "#071133",
};

export default function OrdersDetail({ order, setActiveMenu, setProductTrack }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { orderDetail, setCancelOrderSuccess } = useOrderDetail({ order });
  const [itemProductOrder, setItemProductOrder] = useState({});
  const [isOpenCancelOrderModal, setIsCancelOrderModal] = useState(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const onBack = () => {
    setActiveMenu instanceof Function && setActiveMenu(ORDERS);
  };
  const handleProductDetail = (product) => {
    router.push({
      pathname: "/[categoryId]/[productId]",
      query: { productId: product?.id, categoryId: product?.categoryId || 0 },
    });
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
      <Flex my={4} justifyContent="space-between">
        <Box color="#6F6F6F" fontSize={18} fontWeight={500}>
          <Text as="span" mr={2}>
            {t("orderDetail")}
          </Text>
          <Text as="span">#{order?.code}</Text>
          <Text as="span" color="#000000">
            {" "}
            - {getStatusText(orderDetail?.shipping?.status_name)}
          </Text>
        </Box>
        <Box align={{ base: "left", md: "right" }}>
          <Text fontSize={16} whiteSpace="nowrap">
            {formatDateTime(order.create_at)}
          </Text>
        </Box>
      </Flex>
      {orderDetail?.shipping?.status_dates?.[0] && orderDetail?.shipping?.status_message ? (
        <Box>
          <Text textTransform="uppercase" color="#535050" fontSize={16} fontWeight={500} py={4}>
            {t("noti")}
          </Text>
          <Box bgColor="#E9EEFF" color="#3A3A3A" borderRadius="4px" mb={4}>
            <Flex p="8px 18px">
              <Text width="150px" mr={4}>
                {formatDate(orderDetail?.shipping?.status_dates?.[0], "hh:mm DD/MM/YYYY")}
              </Text>
              <Text>{orderDetail?.shipping?.status_message}</Text>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Text />
      )}

      <Flex margin={-2}>
        <Flex width={{ base: "auto", md: "33.33%" }} p={2} flexDirection="column">
          <Text {...tableHeaderStyles}>{t("receiverAddress")}</Text>
          <Box p={4} {...tableBody}>
            <Text fontWeight={500} textTransform="uppercase" mb={2}>
              {orderDetail?.shipping?.name}
            </Text>
            <Text mb={2}>
              {t("address")}:{orderDetail?.shipping.address},{orderDetail?.shipping?.ward?.name},{" "}
              {orderDetail?.shipping?.district?.name},{orderDetail?.shipping?.city?.name},{" "}
              {orderDetail?.shipping?.country?.name}
            </Text>
            <Text>
              {t("phoneNum")}:{order.shipping.phone_number}
            </Text>
          </Box>
        </Flex>
        <Flex width={{ base: "auto", md: "33.33%" }} p={2} flexDirection="column">
          <Text {...tableHeaderStyles}>{t("shippingMethod")}</Text>
          <Box p={4} {...tableBody}>
            <Text mb={2} fontWeight="bold">
              {order.shipping.driver_name}
            </Text>
            <Text mb={2}>{order.shipping.type_name}</Text>
            {/* <Text mb={2}>Dự kiến 7-10 ngày</Text> */}
            <Text color="#5EAC17">
              {order.shipping_price == 0
                ? t("freeShipping")
                : `${formatPrice(order.shipping_price)} đ`}
            </Text>
          </Box>
        </Flex>
        <Flex width={{ base: "auto", md: "33.33%" }} p={2} flexDirection="column">
          <Text {...tableHeaderStyles}>{t("paymentMethod")}</Text>
          <Box p={4} {...tableBody}>
            <Text>{orderDetail?.payment.type_name}</Text>
          </Box>
        </Flex>
      </Flex>
      <Box mt={8} display={{ base: "none", md: "block" }}>
        <Table variant="simple" fontSize={14} {...tableBodyStyles}>
          <Thead bgColor="#E9EEFF">
            <Tr borderRadius="8px 8px 0px 0px">
              <Th
                color="#000000"
                borderRadius="8px 0px 0px 0px"
                paddingTop="25px"
                paddingBottom="25px"
                paddingLeft="2rem"
                paddingRight="0"
              >
                {t("product")}
              </Th>
              <Th
                w="15%"
                color="#000000"
                paddingTop="25px"
                paddingBottom="25px"
                paddingLeft="1.5rem"
                paddingRight="0"
              >
                {t("price")}
              </Th>
              <Th
                w="15%"
                color="#000000"
                paddingTop="25px"
                paddingBottom="25px"
                paddingLeft="1.5rem"
                paddingRight="0"
              >
                {t("qty")}
              </Th>
              <Th
                w="15%"
                color="#000000"
                paddingTop="25px"
                paddingBottom="25px"
                paddingLeft="1.5rem"
                paddingRight="0"
              >
                {t("discount")}
              </Th>
              <Th
                w="15%"
                color="#000000"
                borderRadius="0px 8px 0px 0px"
                paddingTop="25px"
                paddingBottom="25px"
                paddingLeft="1.5rem"
                paddingRight="0"
              >
                {t("provisionalPrice")}
              </Th>
            </Tr>
          </Thead>
          <Tbody backgroundColor="#FAFAFA" color="#071133">
            {(orderDetail?.detail || []).map((item, idx) => {
              const productDiscount =
                item.coupon_price ||
                item.promotion_price ||
                item.combo_price ||
                item.sale_price ||
                0;
              return (
                <>
                  <Tr key={item.id} verticalAlign="top">
                    <Td borderColor="#fff0">
                      <Flex>
                        <Image
                          boxSize="64px"
                          src={item.product.images[0].url}
                          display="inline-block"
                          mr={2}
                        />
                        <Box>
                          <Text mb={4}>{item.product.name}</Text>
                          <Text fontSize="10px" mb={4}>
                            {t("inventory")}:{" "}
                            <Text as="span" fontWeight="bold">
                              {orderDetail && orderDetail?.detail[idx]?.inventory?.name}
                            </Text>
                          </Text>
                          <HStack spacing={4}>
                            {[6].includes(orderDetail?.shipping?.status) ? (
                              <Button
                                colorScheme="#007BFF"
                                color="#007BFF"
                                bgColor="#ffffff"
                                variant="outline"
                              >
                                {t("buyAgain")}
                              </Button>
                            ) : (
                              <Button
                                colorScheme="#007BFF"
                                color="#007BFF"
                                bgColor="#ffffff"
                                variant="outline"
                                onClick={() => {
                                  handleProductDetail(item.product);
                                }}
                              >
                                {t("buyMore")}
                              </Button>
                            )}
                            {[4, 6].includes(orderDetail?.shipping?.status) && (
                              <Button
                                colorScheme="#007BFF"
                                color="#007BFF"
                                bgColor="#ffffff"
                                variant="outline"
                                onClick={() => {
                                  setIsOpenReviewModal(true);
                                  setItemProductOrder(item.product);
                                }}
                              >
                                {t("writeReview")}
                              </Button>
                            )}
                          </HStack>
                        </Box>
                      </Flex>
                    </Td>
                    <Td borderColor="#fff0">{formatPrice(item.product.price)}</Td>
                    <Td borderColor="#fff0">{item.number}</Td>
                    <Td borderColor="#fff0">{formatPriceReturnZero(productDiscount)}đ</Td>
                    <Td textAlign="right" borderColor="#fff0">
                      <Text>{formatPrice(item.total)} đ</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    {Lodash.isEqual(
                      Lodash.toLower(orderDetail?.shipping?.driver_name || ""),
                      "giao hàng tiết kiệm",
                    ) &&
                      ![4, 6, 7].includes(orderDetail?.shipping?.status) && (
                        <Td colSpan="5" borderTopColor="#fff0" paddingTop="0" textAlign="right">
                          <WarningButton
                            fontSize={14}
                            ml={4}
                            onClick={() => {
                              setProductTrack(item);
                              setActiveMenu(ORDER_TRACKING);
                            }}
                          >
                            {t("trackOrder")}
                          </WarningButton>
                        </Td>
                      )}
                  </Tr>
                </>
              );
            })}
            <Tr rowSpan={3}>
              <Td border="none" colSpan={3} textAlign="right">
                {t("provisionalPrice")}
              </Td>
              <Td border="none" colSpan={2} textAlign="right">
                {formatPrice(order.subtotal)}đ
              </Td>
            </Tr>
            <Tr>
              <Td border="none" colSpan={3} textAlign="right">
                {t("shipFee")}
              </Td>
              <Td border="none" colSpan={2} textAlign="right">
                {formatPriceReturnZero(order.shipping_price)} đ
              </Td>
            </Tr>

            <Tr>
              <Td border="none" colSpan={3} textAlign="right">
                {t("discountCode")}
              </Td>
              <Td border="none" colSpan={2} textAlign="right">
                -{formatPriceReturnZero(order.subtotal - (order.total - order.shipping_price))} đ
              </Td>
            </Tr>

            <Tr>
              <Td border="none" colSpan={3} textAlign="right">
                {t("total")}
              </Td>
              <Td border="none" colSpan={2} color="#007BFF" textAlign="right">
                {formatPrice(order.total)} đ
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box mt={4} display={{ base: "block", md: "none" }} borderRadius={4} p={4}>
        <Text color="#2154FF" fontSize={18} fontWeight="bold">
          {t("order")}
        </Text>
        <Box w="100%" h="1px" bg="#BCCCFF" mt={2} />
        <Box mt={4}>
          {(order.products || []).map((item) => (
            <Flex key={item.id} mb={4}>
              <Box mr={2} w="20%">
                <Image boxSize="64px" src={item.product.images[0].url} />
              </Box>
              <Box pos="relative" w="80%">
                <Text fontSize={16}>{item.name}</Text>
                <Text fontSize={14}>{item.price} đ</Text>
                <Text fontSize={14} pos="absolute" bottom={0} right={2} color="#718096">
                  x{item.quantity}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
        <Box w="100%" h="1px" bg="#BCCCFF" mt={2} />
      </Box>
      <Flex my={4} justifyContent="space-between" alignItems="center">
        <Text as="button" color="#1A43CC" fontSize={18} onClick={onBack}>
          {`<< ${t("backToMyOrder")}`}
        </Text>
        <Box>
          {/* {[1, 2].indexOf(order.status) > -1 && */}
          {[1, 2].includes(orderDetail?.shipping?.status) && (
            <DangerButton fontSize={14} onClick={setIsCancelOrderModal}>
              {t("cancelOrder")}
            </DangerButton>
          )}
        </Box>
      </Flex>
      {isOpenCancelOrderModal && (
        <CancelOrderDetail
          setCancelOrderSuccess={setCancelOrderSuccess}
          id={order.id}
          isOpen={isOpenCancelOrderModal}
          onClose={setIsCancelOrderModal}
        />
      )}
      {isOpenReviewModal && (
        <ReviewModal
          isOpen={isOpenReviewModal}
          onClose={setIsOpenReviewModal}
          product={itemProductOrder}
        />
      )}
    </Box>
  );
}
OrdersDetail.defaultProps = {
  order: {},
};
