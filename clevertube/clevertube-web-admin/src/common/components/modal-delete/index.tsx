import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const ModalDelete = ({
  isOpenDelete,
  onCloseDelete,
  instanceGet,
  instanceMultiple,
  selectedItemIds,
  useDelete,
  nameModal,
}) => {
  const { refetch } = instanceGet;
  const { reset } = instanceMultiple;
  const { mutate } = useDelete(refetch);

  const handleDeleteAll = () => {
    reset();
    // const ids = { ids: selectedItemIds };
    mutate(selectedItemIds);
    onCloseDelete();
  };

  const handleCloseModal = () => {
    reset();
    onCloseDelete();
  };

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpenDelete}
      onClose={handleCloseModal}
    >
      <ModalOverlay />

      <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
        <ModalHeader color="text.primary">Delete {nameModal}</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text>
            Are you sure delete {selectedItemIds.length}{" "}
            {selectedItemIds.length > 1 ? `${nameModal}s` : nameModal}?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="color.primary"
            _hover={{ bg: "hover.primary" }}
            color="text.secondary"
            mr={3}
            onClick={handleDeleteAll}
          >
            Delete
          </Button>
          <Button color="text.primary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
