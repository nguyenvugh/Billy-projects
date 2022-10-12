import { useDeleteTopic } from "../hooks/useDeleteTopic";
import { ModalDeleteTopicType } from "../interface";
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

const ModalDeleteTopic = ({
  isOpenDeleteTopic,
  onCloseDeleteTopic,
  instanceGetAllTopics,
  instanceMultiple,
}: ModalDeleteTopicType) => {
  const selectedItemIdsRedux = useAppSelector((state) => state.topic.selectedItemIds);

  const { refetch } = instanceGetAllTopics;
  const { reset } = instanceMultiple;
  const { mutate } = useDeleteTopic(refetch);

  const handleDelete = () => {
    reset();
    mutate(selectedItemIdsRedux);
    onCloseDeleteTopic();
  };

  const handleCloseModal = () => {
    reset();
    onCloseDeleteTopic();
  };

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpenDeleteTopic}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
        <ModalHeader color="text.primary">Delete Topic</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text>Are you sure to delete topic?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            bg="color.primary"
            _hover={{ bg: "hover.primary" }}
            color="text.secondary"
            mr={3}
            onClick={handleDelete}
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

export default ModalDeleteTopic;
