import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import useOrder from "pages/profile/hooks/useOrder";
import { RiSearchLine } from "react-icons/ri";
import OrderListTable from "./OrderListTable";

export default function Orders({ onViewOrderDetail }) {
  const { t } = useTranslation();
  const { orderList, handleSearch, getOrderList, page, handlePageChange } = useOrder();

  return (
    <>
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
              {t("myOrder")}
            </Text>
            <Text color="#464646" fontSize={14}>
              {t("trackYourOrder")}
            </Text>
          </Box>
          <Spacer />
          <Box w={{ base: "100%", md: "270px" }}>
            <InputGroup
              size="md"
              color="#2154FF"
              bg="#F2F5FF"
              border="1px solid #BCCCFF"
              borderRadius={5}
            >
              <Input
                pr={12}
                type="text"
                fontSize={14}
                placeholder={t("enterOrderIDOrName")}
                // value={search}
                onChange={handleSearch}
              />
              <InputRightElement width={12}>
                <Button size="md" bg="transparent" onClick={getOrderList}>
                  <Icon as={RiSearchLine} />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>
        <Box mt={4}>
          <OrderListTable
            data={orderList}
            onViewOrderDetail={onViewOrderDetail}
            pagination={page}
            onChangePage={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
}
