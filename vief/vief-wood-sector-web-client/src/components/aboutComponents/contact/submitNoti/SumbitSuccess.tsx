import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export default function SubmitSuccess() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button onClick={onOpen} variant="primary">
        Gửi
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ md: "xl", sm: "md" }}
      >
        <ModalOverlay />
        <ModalContent borderRadius="12px" padding={{ sm: "16px", md: "32px" }}>
          <ModalHeader alignSelf="center">
            <Box bgImage="/checkDownload.png" boxSize={"128px"}></Box>
          </ModalHeader>

          <ModalBody textAlign={"center"}>
            <Stack>
              <Text variant="text28">Gửi thành công</Text>
              <Text variant="text14">
                Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi lại
                bạn trong thời gian sớm nhất!
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter alignSelf="center">
            <Button variant="primary" onClick={onClose}>
              Quay lại trang
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
