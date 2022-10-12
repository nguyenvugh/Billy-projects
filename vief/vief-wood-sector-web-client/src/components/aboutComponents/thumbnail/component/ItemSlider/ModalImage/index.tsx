import { ListImgProps, UnsplashImg } from "@/src/components/aboutComponents/interfaces";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  CloseButton,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";

import { ThumbnailGallery } from "./thumbGallery/ThumbnailsGallery";

type PictureItemProp = {
  itemImg: UnsplashImg;
  listImgThumb: UnsplashImg[];
};

export const ModalImage = ({ itemImg, listImgThumb }: PictureItemProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box borderRadius="12px" overflow="hidden">
        <Image
          style={{ borderRadius: "12px" }}
          layout="fill"
          objectFit="cover"
          alt=""
          src={itemImg?.urls?.regular}
          loader={() => {
            return itemImg?.urls?.regular;
          }}
          onClick={onOpen}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ md: "full", sm: "lg" }}>
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent bg="transparent" borderRadius="12px" shadow={"none"} padding="10px" py="20%">
          <ThumbnailGallery listImgThumb={listImgThumb} />
          <IconButton
            aria-label=""
            variant={"ghost"}
            isRound
            w={{ md: "24px", sm: "12px" }}
            border="2px"
            borderColor="white"
            position="absolute"
            onClick={onClose}
            right="8%"
            _hover={{ bg: "transparent" }}
            display={{ md: "flex", sm: "none" }}
          >
            <CloseIcon color="white" alignSelf="center" />
          </IconButton>
        </ModalContent>
      </Modal>
    </>
  );
};
