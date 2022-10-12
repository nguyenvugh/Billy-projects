import { Button } from "@chakra-ui/button";
import { Img } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import PropTypes, { string } from "prop-types";
import React, { useEffect, useState } from "react";

function Popup({ title, subTitle, textButton, onPress, onClose, isOpen, errorPopup }) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    setOpen(false);
    onPress && onPress();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={{ base: "432px" }}>
        <Flex flexDirection="column" alignItems="center" paddingY="12" paddingX="8">
          {errorPopup ? (
            <Img width="60px" height="60px" src="/icons/error-info.svg" />
          ) : (
            <Img width="60px" height="60px" src="/icons/success.svg" />
          )}
          <Text
            color={errorPopup ? "#e73f3e" : "#2154FF"}
            mt="4"
            fontWeight="700"
            fontSize="20px"
            textAlign="center"
          >
            {title}
          </Text>
          <Text color="#718096" fontSize="14px" mt="2" textAlign="center">
            {subTitle}
          </Text>
          <Button
            onClick={handleClick}
            mt="7"
            w={{ base: "100%" }}
            height="46px"
            color="#ffffff"
            fontSize="16"
            textTransform="uppercase"
            backgroundColor="#007BFF"
          >
            {textButton}
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default React.memo(Popup);

Popup.propTypes = {
  title: string,
  subTitle: string,
  textButton: string,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
};
Popup.defaultProps = {
  title: "Thành công",
  subTitle: "Subitle thành công",
  textButton: "Ok",
  isOpen: false,
  onPress: () => {},
  onClose: () => {},
};
