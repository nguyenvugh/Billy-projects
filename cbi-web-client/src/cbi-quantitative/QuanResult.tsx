import Container from "@cbi/components/container";
import { numberWithCommas } from "@cbi/utils/index";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CbiQuantitativeResult } from "./interface";

function QuanResult({ resultCbi }: { resultCbi: CbiQuantitativeResult[] }) {
  const total = resultCbi.reduce((rs, curr) => (rs += curr.total), 0);
  return (
    <VStack
      alignItems="unset"
      mx="5%"
      display={{
        sm: "flex",
        base: "none",
      }}
    >
      <Container w="full">
        <Text fontSize="24px" fontWeight="500" my="10" w="full" textAlign="left">
          Kết quả CEBI định lượng
        </Text>
        <VStack color="white" bg="#61A533" w="540px" py="2" borderRadius="16px" m="auto">
          <Text fontSize="16px" fontWeight="500">
            Tổng lượng CO2td mà doanh nghiệp thải ra
          </Text>
          <Text fontSize="32px" fontWeight="700" mt="0">
            {numberWithCommas(total)}
          </Text>
        </VStack>
      </Container>
      <Box display="flex" alignItems="center" flexDirection="column">
        <TableContainer w="full" mt="38px" mb="100px" border="1px solid #E2E8F0">
          <Table
            sx={{
              th: {
                fontSize: "14px",
                fontWeight: "600",
                color: "#2D3748",
                textTransform: "unset",
              },
              td: {
                fontSize: "16px",
                fontWeight: "500",
                color: "#2D3748",
              },
            }}
          >
            <Thead bg="#EBEFF2">
              <Tr>
                <Th>Phát thải</Th>
                <Th>Vụ lúa Đông Xuân</Th>
                <Th>Vụ lúa Hè Thu</Th>
                <Th>Vụ lúa Thu Đông</Th>
                <Th>Tổng cộng</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resultCbi.map((rs) => (
                <Tr>
                  <Td>{rs.name}</Td>
                  <Td>{numberWithCommas(rs.vdx, true)}</Td>
                  <Td>{numberWithCommas(rs.vht, true)}</Td>
                  <Td>{numberWithCommas(rs.vtd, true)}</Td>
                  <Td fontSize="20px !important" fontWeight="700 !important">
                    {numberWithCommas(rs.total, true)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  );
}

export { QuanResult };
