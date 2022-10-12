import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Link as LinkUI,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { formatRouterDetail } from "@cbi/utils/index";
import Link from "next/link";
import { getCbiUserLevelApi } from "@cbi/services/auth";
import { ItemCbiUser, ItemCbiUserLevel } from "@cbi/services/auth/auth.interface";
import { DefaultCbiUser } from "./constatns";
import { SCREEN_RESULT } from ".";

const ModalStepCBIUser = (
  {
    setActiveResult,
    getDataQuestionCbi,
  }: { setActiveResult: Function; getDataQuestionCbi: Function },
  ref: any
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataQuiz, setDataQuiz] = useState<ItemCbiUser>(DefaultCbiUser);
  const [listLevelCBI, setListLevelCBI] = useState<ItemCbiUserLevel[]>([]);
  useEffect(() => {
    (async () => {
      if (dataQuiz.id) {
        try {
          const response = await getCbiUserLevelApi(dataQuiz.id);
          setListLevelCBI(response.results);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [dataQuiz]);
  useImperativeHandle(ref, () => ({
    openModal(data: ItemCbiUser) {
      setIsOpen(true);
      setDataQuiz(data);
    },
  }));
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent maxW={"auto"} width={{ base: "md", lg: "669px" }}>
        <Box p={8} py={6}>
          <Flex justifyContent="space-between" alignItems={"center"} mb="33px">
            <Text
              color="#000000"
              fontSize={{ base: "18px", md: "20px", lg: "22px" }}
              fontWeight="600"
            >
              Vui lòng chọn giai đoạn đánh giá
            </Text>
            <ModalCloseButton position={"initial"} />
          </Flex>
          <Box>
            {listLevelCBI.map((item) => (
              <Flex
                key={item.id}
                justifyContent="space-between"
                alignItems={"center"}
                background={"#FFFFFF"}
                border="1px solid #E2E8F0"
                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
                borderRadius="12px"
                p="16px"
                mb="16px"
              >
                <Text color="#000000" fontSize={{ base: "14px", md: "16px" }} fontWeight="600">
                  {item.cbi_level.name}
                </Text>

                {/* <Link
                  href={`/evaluate-cebi/${formatRouterDetail(
                    dataQuiz.cbi.name
                  )}_${formatRouterDetail(dataQuiz.cbi.description)}_${
                    dataQuiz.cbi.id
                  }_${item.id}`}
                > */}
                <LinkUI
                  as={Button}
                  bg={"#61A533"}
                  color="#FFFFFF"
                  fontSize={{ base: "15px", md: "16px", lg: "18px" }}
                  onClick={() => {
                    getDataQuestionCbi(item.id);
                    setActiveResult(SCREEN_RESULT.SCREEN_DETAIL);
                  }}
                >
                  Xem ngay
                </LinkUI>
                {/* </Link> */}
              </Flex>
            ))}
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalStepCBIUser);
