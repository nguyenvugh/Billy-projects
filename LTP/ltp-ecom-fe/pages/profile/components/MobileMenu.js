import PropType from "prop-types";
import { Flex, Box, Text, Stack, Link, useColorModeValue, Avatar, Icon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function MobileMenu({ items, onClickItem, onClose, isLoginRegisterSocial }) {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      display={{ md: "none" }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "75%",
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Flex w="100%" fontSize="12" py={2} px={4} bg="#E9EEFF" position="relative">
        <Box w="85%" py={2}>
          <Avatar bg="teal.500" w="24px" h="24px" mr={2} />
          <Text as="span" lineHeight="24px" fontSize="14px" fontWeight={600} color="#2154FF">
            David Dang
          </Text>
        </Box>
        <Box w="15%" position="absolute" align="right" right="1.5rem" top="calc(50% - 12px)">
          <CloseIcon w={3} h={3} onClick={onClose} />
        </Box>
      </Flex>
      {items.map((menuItem) => {
        if (isLoginRegisterSocial === "true" && menuItem.id === 3) {
          return null;
        }
        return <MobileMenuItem key={menuItem.name} {...menuItem} onClickItem={onClickItem} />;
      })}
    </Stack>
  );
}

const MobileMenuItem = ({ name, text, icon, path, onClickItem }) => (
  <Stack marginTop="0 !important">
    <Flex
      py={2}
      px={4}
      as={Link}
      href={path ?? "#"}
      fontSize="12px"
      justify="space-between"
      align="center"
      _hover={{
        textDecoration: "none",
      }}
      borderBottom="1px"
      borderBottomColor="#DFDFDF"
    >
      <Text color="#000000" onClick={() => onClickItem(name)}>
        <Icon as={icon} mr={2} />
        {text}
      </Text>
    </Flex>
  </Stack>
);

MobileMenu.propsType = {
  items: PropType.array.isRequired,
};

MobileMenu.defaultProps = {
  items: [],
};
