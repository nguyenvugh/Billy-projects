import { ModalDeleteAllPodcastType } from "../../../interface";
import { useDeleteAllPodcasts } from "../../../hooks/useDeleteAllPodcasts";
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

const ModalDeleteAllPodcasts = ({
  isOpenDeleteAllPodcasts,
  onCloseDeleteAllPodcasts,
  instanceGetAllPodcasts,
  instanceMultiple,
}: ModalDeleteAllPodcastType) => {
  const selectedItemIdsRedux = useAppSelector((state) => state.podcast.selectedItemIds);

  const { refetch } = instanceGetAllPodcasts;
  const { reset } = instanceMultiple;
  const { mutate } = useDeleteAllPodcasts(refetch);

  const handleDeleteAll = () => {
    reset();
    const ids = { ids: selectedItemIdsRedux };
    mutate(ids);
    onCloseDeleteAllPodcasts();
  };

  const handleCloseModal = () => {
    reset();
    onCloseDeleteAllPodcasts();
  };

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpenDeleteAllPodcasts}
      onClose={handleCloseModal}
    >
      <ModalOverlay />

      <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
        <ModalHeader color="text.primary">Delete all podcast</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text>Are you sure delete all {selectedItemIdsRedux.length} podcast?</Text>
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

export default ModalDeleteAllPodcasts;
