import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FileLoader } from "../file-loader/inedx";

type FilePreviewModalProps = {
  title?: string;
  path: string;
  isOpen: boolean;
  onClose: () => void;
};
export function FilePreviewModal({ title, path, isOpen, onClose }: FilePreviewModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="900px" h="700px" maxWidth="unset">
        <ModalHeader>
          <Text
            variant="page-title"
            maxWidth="500px"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FileLoader path={path} />
        </ModalBody>
        <Text ml="120px" mt="10px"></Text>
      </ModalContent>
    </Modal>
  );
}
