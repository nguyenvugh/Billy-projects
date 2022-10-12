import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useUpdateSatusUserAccount } from "../hooks/useUpdateSatusUserAccount";
import { Status } from "src/common/constants/common.constant";

type OpenAccountProps = {
  userId: string;
  title: string;
  content: string;
  isOpen: boolean;
  onCancel: () => void;
};

const OpenAccount = ({ userId, title, content, isOpen, onCancel }: OpenAccountProps) => {
  const { mutate } = useUpdateSatusUserAccount();
  function handleLockAccount() {
    mutate(
      { userId, status: Status.ACTIVE },
      {
        onSettled() {
          onCancel();
        },
      },
    );
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent mt="40" w="368px">
          <ModalHeader
            borderBottom="1px solid #EEEEEE"
            fontWeight="600"
            fontSize="18px"
            textAlign="center"
            color="#1A43CC"
            textTransform="uppercase"
          >
            {title}
          </ModalHeader>
          <ModalBody pb={6} textAlign="center" fontSize="16px" fontWeight="normal">
            {content}
          </ModalBody>

          <ModalFooter justifyContent="center" pt="0">
            <Button
              bg="white"
              color="black"
              border="1px solid #CBCBCB"
              mr={4}
              onClick={onCancel}
              w="138px"
            >
              Huỷ bỏ
            </Button>
            <Button onClick={handleLockAccount} bg="green.primary" color="white" w="138px">
              Mở
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export { OpenAccount };
