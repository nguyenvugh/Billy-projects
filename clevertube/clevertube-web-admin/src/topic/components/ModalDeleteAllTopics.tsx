import { ModalDeleteAllTopicType } from "../interface";
import { useDeleteAllTopics } from "../hooks/useDeleteAllTopics";
import { useAppSelector } from "src/common/hooks/useAppSelector";
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

const ModalDeleteAllTopics = ({
  isOpenDeleteAllTopics,
  onCloseDeleteAllTopics,
  instanceGetAllTopics,
  instanceMultiple,
}: ModalDeleteAllTopicType) => {
  const selectedItemIdsRedux = useAppSelector((state) => state.topic.selectedItemIds);

  const { refetch } = instanceGetAllTopics;
  const { reset } = instanceMultiple;
  const { mutate } = useDeleteAllTopics(refetch);

  const handleDeleteAll = () => {
    reset();
    mutate(selectedItemIdsRedux);
    onCloseDeleteAllTopics();
  };

  const handleCloseModal = () => {
    reset();
    onCloseDeleteAllTopics();
  };

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpenDeleteAllTopics}
      onClose={handleCloseModal}
    >
      <ModalOverlay />

      <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
        <ModalHeader color="text.primary">Delete all Topic</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text>Are you sure delete all {selectedItemIdsRedux.length} topic?</Text>
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

export default ModalDeleteAllTopics;
