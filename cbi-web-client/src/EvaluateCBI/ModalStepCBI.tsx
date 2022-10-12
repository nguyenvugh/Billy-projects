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
import { ItemEvaluateI, LevelEvaluateI } from "@cbi/services/cbi/cbi.interface";
import Link from "next/link";
import { getListLevelEvaluate } from "@cbi/services/cbi";

const ModalStepCBI = (props: any, ref: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataQuiz, setDataQuiz] = useState<ItemEvaluateI>({
    name: "",
    id: "",
    description: "",
    slug: "",
    thumbnail: { url: "", id: "" },
  });
  const [listLevelCBI, setListLevelCBI] = useState<LevelEvaluateI[]>([]);
  useEffect(() => {
    (async () => {
      if (dataQuiz.slug && dataQuiz.id) {
        try {
          const response = await getListLevelEvaluate(dataQuiz.slug);
          setListLevelCBI(response.results);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [dataQuiz]);
  useImperativeHandle(ref, () => ({
    openModal(data: ItemEvaluateI) {
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
            {listLevelCBI.map((item: LevelEvaluateI) => (
              <Flex
                key={item.id}
                justifyContent="space-between"
                alignItems={"center"}
                background={item.can_test === 1 ? "#FFFFFF" : "#E2E8F0"}
                border="1px solid #E2E8F0"
                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
                borderRadius="12px"
                p="16px"
                mb="16px"
              >
                <Text color="#000000" fontSize={{ base: "14px", md: "16px" }} fontWeight="600">
                  {item.name}
                </Text>

                {item.can_test === 1 ? (
                  <Link href={`/evaluate-cebi/${dataQuiz.slug}_${item.slug}`}>
                    <LinkUI
                      as={Button}
                      bg={"#61A533"}
                      color="#FFFFFF"
                      fontSize={{ base: "15px", md: "16px", lg: "18px" }}
                    >
                      Tham gia
                    </LinkUI>
                  </Link>
                ) : (
                  <Button
                    cursor={"not-allowed"}
                    _hover={{
                      bg: "#718096",
                    }}
                    _active={{
                      bg: "#718096",
                    }}
                    bg={"#718096"}
                    color="#FFFFFF"
                    fontSize={{ base: "15px", md: "16px", lg: "18px" }}
                  >
                    <Text>Tham gia</Text>
                  </Button>
                )}
              </Flex>
            ))}
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalStepCBI);
