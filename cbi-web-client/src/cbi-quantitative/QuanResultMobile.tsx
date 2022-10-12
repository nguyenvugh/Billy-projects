import Container from "@cbi/components/container";
import { numberWithCommas } from "@cbi/utils/index";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CbiQuantitativeResult } from "./interface";

function QuanResultMobile({ resultCbi }: { resultCbi: CbiQuantitativeResult[] }) {
  const total = resultCbi.reduce((rs, curr) => (rs += curr.total), 0);
  return (
    <VStack
      alignItems="unset"
      display={{
        sm: "none",
        base: "flex",
      }}
    >
      <Container w="full">
        <Text fontSize="20px" fontWeight="700" my="5" w="full" textAlign="left">
          Kết quả CEBI định lượng
        </Text>
        <VStack color="white" bg="#61A533" w="full" py="2" borderRadius="8px" my="4">
          <Text fontSize="16px" w="70%" textAlign="center" fontWeight="500">
            Tổng lượng CO2td mà doanh nghiệp thải ra
          </Text>
          <Text fontSize="32px" fontWeight="700" mt="0">
            {numberWithCommas(total)}
          </Text>
        </VStack>
      </Container>
      <Box display="flex" alignItems="center" flexDirection="column">
        {resultCbi.map((rs) => {
          return (
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              border="1px solid #EBEFF2"
              w={{
                lg: "full",
                base: "100vw",
              }}
            >
              <AccordionItem mb="2">
                <AccordionButton borderRadius="unset" bg="#EBEFF2" _focus={{ shadow: "unset" }}>
                  <AccordionIcon />

                  <Box display="flex" justifyContent="space-between" alignItems="center" w="full">
                    <Text w="50%" textAlign="left" fontSize="16px" fontWeight="500">
                      {rs.name}
                    </Text>
                    <Text fontSize="20px" fontWeight="700">
                      {numberWithCommas(rs.total, true)}
                    </Text>
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <ChildDetail name="Vụ lúa Đông Xuân" value={rs.vdx} />
                  <ChildDetail name="Vụ lúa Hè Thu" value={rs.vht} />
                  <ChildDetail name="Vụ lúa Thu Đông" value={rs.vtd} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}
      </Box>
    </VStack>
  );
}

type ChildDetailProps = {
  name: string;
  value?: number;
};
function ChildDetail({ name, value }: ChildDetailProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" w="full" my="2">
      <Text w="60%" textAlign="left" fontSize="16px" fontWeight="500">
        {name}
      </Text>
      <Text fontSize="20px" fontWeight="400">
        {numberWithCommas(value, true)}
      </Text>
    </Box>
  );
}

export { QuanResultMobile };
