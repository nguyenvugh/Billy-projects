import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { DownloadIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { docProps } from "../../../interfaces";
import CompleteDownLoad from "./completeDownload/CompleteDownload";
import React, { useState } from "react";

export default function DownLoad({ docItem }: docProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button onClick={onOpen} variant="primary" alignItems={"center"} overflow="hidden" rightIcon={<DownloadIcon />}>
        Tải về
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ md: "xl", sm: "md" }}>
        <ModalOverlay />
        <ModalContent borderRadius="12px" padding="32px">
          <ModalHeader alignSelf="center">
            <VStack spacing="16px">
              <Text variant="text28">Tải tài liệu</Text>
              <Text variant="text14">Vui lòng điền thông tin để tiếp tục tải về</Text>
            </VStack>
          </ModalHeader>

          <ModalBody>
            <Stack>
              <FormControl isRequired>
                <FormLabel>Họ tên</FormLabel>
                <Input bg="deactive" borderRadius="6px" focusBorderColor="focusBorder" _focus={{ bg: "white" }} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  bg="deactive"
                  borderRadius="6px"
                  type="email"
                  focusBorderColor="focusBorder"
                  _focus={{ bg: "white" }}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter alignSelf="center">
            <CompleteDownLoad docItem={docItem} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
