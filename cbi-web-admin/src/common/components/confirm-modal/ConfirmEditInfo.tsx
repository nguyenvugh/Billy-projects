import {
  Button,
  ChakraProps,
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
  styleProps?: ChakraProps;
} & any;

const ConfirmEditInfo = ({
  content,
  header,
  isOpen,
  onClose,
  onConfirm,
  ...rest
}: ConfirmEditInfoProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"432px"} h="300.57px" mt={"180px"}>
          <ModalHeader>
            <Img ml="165px" mt="30px" src={confirmIcon} />
          </ModalHeader>
          <ModalCloseButton />
          <Text fontWeight="bold" color={"#000000"} fontSize="20px" textAlign="center" mt="10px">
            {header}
          </Text>

          <Text ml="120px" mt="10px" {...rest}>
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
export { ConfirmEditInfo };
