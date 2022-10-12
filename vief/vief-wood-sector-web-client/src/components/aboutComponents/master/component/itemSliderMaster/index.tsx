import { Box, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { ItemImgMaster } from "../../../interfaces";

const ItemSliderMaster = ({ itemImg }: ItemImgMaster) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box w="full" h="461x" px="22px" borderRadius={"12px"}>
        <Box
          borderRadius={"12px"}
          bg="#F2F3F7"
          role="group"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          position="relative"
          zIndex="0"
        >
          <Box w="full" h="374px" borderRadius="12px" bgImage={itemImg?.user?.profile_image.large} bgSize="cover">
            {isOpen ? (
              <Box
                borderRadius="12px"
                w="full"
                position="absolute"
                zIndex="1"
                h="full"
                bg="#394160"
                opacity="0.9"
                p={"95px 16px 16px"}
              >
                <Text variant="text14" color="white" overflow="hidden" textOverflow="ellipsis">
                  {itemImg?.user?.bio}
                </Text>
              </Box>
            ) : null}
          </Box>
          <Stack px="16px" py="16px">
            <Text variant="text20" noOfLines={1}>
              {itemImg?.user?.name}{" "}
            </Text>
            <Text variant="text14">{itemImg?.user?.username} </Text>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ItemSliderMaster;
