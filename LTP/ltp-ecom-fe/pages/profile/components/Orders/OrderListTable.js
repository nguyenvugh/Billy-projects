import { Box, HStack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Pagination from "@ltp/components/Pagination";
import useTranslation from "@ltp/hooks/useTranslation";
import { formatPrice } from "@ltp/utils/validate";
import { CONFIG_PAGE } from "pages/profile/hooks/useOrder";
import { formatDate } from "utils/date";

export const getStatusText = (status) => {
  let color = "";
  switch (String(status)) {
    case "Đã xác nhận":
      color = "#383838";
      break;
    case "Chờ thanh toán":
      color = "#FF8947";
      break;
    case "Đang lấy hàng":
      color = "#F7B611";
      break;
    case "Đang giao hàng" || "Đang giao":
      color = "#276EF1";
      break;
    case "Đã giao hàng" || "Đã giao":
      color = "#00C537";
      break;
    case "Đã hủy":
      color = "#EA403F";
      break;
    case "Giao một phần":
      color = "#45EC7B";
      break;
    case "Trả hàng":
      color = "#DBFF39";
      break;
    default:
      break;
  }
  return (
    <Text as="span" color={color}>
      {status}
    </Text>
  );
};

export default function OrderListTable({ data = [], onViewOrderDetail, pagination, onChangePage }) {
  const { t } = useTranslation();

  return (
    <Box>
      <Box display={{ base: "none", md: "block" }}>
        <Table variant="simple" fontSize={14}>
          <Thead bg="#5979DD" borderRadius="4px 4px 0px 0px">
            <Tr>
              <Th w="15%" color="#ffffff" border="0.5px solid #BCCCFF">
                {t("orderId")}
              </Th>
              <Th w="15%" color="#ffffff" border="0.5px solid #BCCCFF">
                {t("orderDate")}
              </Th>
              <Th color="#ffffff" border="0.5px solid #BCCCFF">
                {t("product")}
              </Th>
              <Th w="15%" color="#ffffff" border="0.5px solid #BCCCFF">
                {t("money")}
              </Th>
              <Th w="15%" color="#ffffff" border="0.5px solid #BCCCFF">
                <HStack>
                  <Text as="span" whiteSpace="nowrap">
                    {t("statusV2")}
                  </Text>
                </HStack>
              </Th>
            </Tr>
          </Thead>
          <Tbody color="#071133">
            {data.map((item) => (
              <Tr key={item.id} verticalAlign="top">
                <Td border="0.5px solid #BCCCFF">
                  <Text
                    as="span"
                    color="#2154FF"
                    cursor="pointer"
                    onClick={() => onViewOrderDetail(item)}
                  >
                    #{item.code}
                  </Text>
                </Td>
                <Td border="0.5px solid #BCCCFF">{formatDate(item.created_at)}</Td>
                <Td border="0.5px solid #BCCCFF">
                  {item.detail.map((product) => (
                    <Box key={product.id} mb={4}>
                      <Text>{product.product.name}</Text>
                      <Text>x{product.number}</Text>
                    </Box>
                  ))}
                </Td>
                <Td border="0.5px solid #BCCCFF">
                  <Box key={item.id} mb={4}>
                    <Text>
                      {formatPrice(item.total)}
                      {" đ"}
                    </Text>
                  </Box>
                </Td>
                <Td border="0.5px solid #BCCCFF">{getStatusText(item.shipping.status_name)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        {(data || []).map((item) => (
          <Box
            key={item.id}
            pos="relative"
            border="0.5px solid #BCCCFF"
            borderRadius={4}
            p={4}
            mt={4}
            fontSize={14}
          >
            <Text>#{item.code}</Text>
            <Text>{item.created_date}</Text>
            {(item.products || []).map((product) => (
              <Box key={product.id} mb={2}>
                <Text>{product.name}</Text>
                <Text>x{product.quantity}</Text>
                <Text>
                  {product.price}
                  {" đ"}
                </Text>
              </Box>
            ))}
            <Text pos="absolute" top={4} right={4}>
              {getStatusText(item.shipping.status_name)}
            </Text>
            <Text
              textAlign="center"
              fontSize={12}
              color="#2154FF"
              textDecoration="underline"
              onClick={() => onViewOrderDetail(item)}
            >
              {`${t("viewDetail")} >>`}
            </Text>
          </Box>
        ))}
      </Box>
      <Box mt={4} align="right">
        <Pagination
          onChangePage={onChangePage}
          current={1}
          size={CONFIG_PAGE.ITEMS_PER_PAGE}
          total={pagination.totalPage}
        />
      </Box>
    </Box>
  );
}
