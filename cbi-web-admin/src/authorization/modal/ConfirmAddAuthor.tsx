import {
  Button,
  Img,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import confirmIcon from "../../../profile/image/confirm icon modal.png";
type ConfirmEditInfoProps = {
  header: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onOpen?: () => void;
};

const ConfirmAddAuthor = ({
  content,
  header,
  isOpen,
  onClose,
  onConfirm,
}: ConfirmEditInfoProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Img ml="170px" mt="57.16px" src={confirmIcon} />
          </ModalHeader>
          <ModalCloseButton />
          <Text fontWeight="bold" fontSize="20px" textAlign="center" mt="10px">
            {header}
          </Text>

          <Text ml="120px" mt="10px">
            {content}
          </Text>
          <ModalFooter mt="24.5px">
            <Button colorScheme="green" w="full" onClick={() => onConfirm()}>
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export { ConfirmAddAuthor };
