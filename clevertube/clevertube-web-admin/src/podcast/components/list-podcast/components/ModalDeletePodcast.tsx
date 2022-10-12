import { useDeletePodcast } from "../../../hooks/useDeletePodcast";
import { ModalDeletePodcastType } from "../../../interface";
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

const ModalDeletePodcast = ({
  isOpenDeletePodcast,
  onCloseDeletePodcast,
  instanceGetAllPodcasts,
  instanceMultiple,
}: ModalDeletePodcastType) => {
  const selectedItemIdsRedux = useAppSelector((state) => state.podcast.selectedItemIds);

  const { refetch } = instanceGetAllPodcasts;
  const { reset } = instanceMultiple;
  const { mutate } = useDeletePodcast(refetch);

  const handleDelete = () => {
    reset();
    const id = { ids: selectedItemIdsRedux };
    mutate(id);
    onCloseDeletePodcast();
  };

  const handleCloseModal = () => {
    reset();
    onCloseDeletePodcast();
  };

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpenDeletePodcast}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
        <ModalHeader color="text.primary">Delete Podcast</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text>Are you sure to delete podcast?</Text>
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

export default ModalDeletePodcast;
