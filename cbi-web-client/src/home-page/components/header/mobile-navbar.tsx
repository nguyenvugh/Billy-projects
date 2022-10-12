import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link as LinkUI,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { navItemI } from "./nav-bar";

const MobileNav = ({ listMenu }: { listMenu: any }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      px={4}
      display={{ md: "none" }}
      mt={2}
    >
      {listMenu.map((navItem: navItemI) => (
        <Box key={navItem.name}>
          <MobileNavItem key={navItem.name} {...navItem} />
        </Box>
      ))}
    </Stack>
  );
};
export default MobileNav;

const MobileNavItem = ({ name, href, id, childs }: navItemI) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  return (
    <Stack onClick={childs?.length ? onToggle : () => {}}>
      <Flex
        py={2}
        as={LinkUI}
        href={childs?.length ? "#" : href}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        _focus={{
          outline: "none",
        }}
        _activeLink={{
          outline: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={router.asPath == href ? "#61A533" : "#718096"}
          fontSize="15px"
        >
          {name}
        </Text>
        {childs?.length && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {childs?.length &&
            childs.map((child) => (
              <Link key={child.name} passHref href={child.href}>
                <LinkUI
                  py={2}
                  color={
                    child.listHref?.includes(router.route) ||
                    child.href == router.route
                      ? "#61A533"
                      : "#718096"
                  }
                  fontSize="15px"
                >
                  {child.name}
                </LinkUI>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
