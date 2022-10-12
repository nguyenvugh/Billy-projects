import Container from "src/common/components/container";
import MenuHover from "@cbi/components/MenuHover";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Link as LinkUI,
  IconButton,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { menu } from "./constants";
import Lodash from "lodash";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";
import { useRouter } from "next/router";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import MobileNav from "./mobile-navbar";
import ModalContainer from "@cbi/components/ModalContainer";
import { useEffect, useRef, useState } from "react";
import { SCREEN_AUTH } from "@cbi/constants/index";
import { useUserContext } from "@cbi/context/AuthContext";
import { getAllCategory } from "src/common/services/article";
const Links = ["Dashboard", "Projects", "Team"];
const CATE_MENU_ID = 5;
export interface navItemI {
  href: string;
  name: string;
  id: number;
  listHref?: Array<string>;
  childs?: Array<navItemI>;
}

function NavBottom() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const refSignIn = useRef<any>(null);
  const { userContext, setUserContext } = useUserContext();

  const [listMenu, setListMenu] = useState<any>(menu);

  useEffect(() => {
    updateMenus();
  }, []);

  async function updateMenus() {
    // const categories = (await getAllCategory()).data;
    const newMenu = menu.map((item) => {
      if (item.id === CATE_MENU_ID) {
        return {
          ...item,
          childs: [],
        };
      }
      return item;
    });
    setListMenu(newMenu);
  }

  const renderSubMenu = (submenu: Array<navItemI>) => {
    if (Array.isArray(submenu)) {
      return (
        <Box mt="16px" mb="16px" zIndex={10}>
          {submenu.map((item, index) => (
            <Text
              key={item.name}
              _hover={{
                bg: "#EDF2F7",
              }}
            >
              <Link passHref href={item?.href}>
                <LinkUI
                  _hover={{ textDecoration: "none" }}
                  cursor="pointer"
                  key={item.name}
                  color="#071133"
                  border="none"
                  fontSize={"16px"}
                  padding="12px 36px"
                  fontWeight="500"
                  m="0"
                  mt="7px"
                  display="inline-block"
                  maxW={"50vw"}
                >
                  {item.name}
                </LinkUI>
              </Link>
            </Text>
          ))}
        </Box>
      );
    }
  };
  return (
    <Box border="1px solid #E5E5E5">
      <Container>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Flex
          display={{ base: "none", md: "flex" }}
          justifyContent={{ base: "", md: "space-between" }}
          flexWrap="wrap"
          __css={{
            ">div>div": {
              zIndex: 10,
            },
          }}
        >
          {listMenu.map((navItem: navItemI) => {
            const childs = Lodash.get(navItem, "childs", []);
            return (
              <MenuHover
                key={navItem.name}
                renderTrigger={() => (
                  <Button
                    height="auto"
                    border="none"
                    fontWeight="500"
                    fontSize="16px"
                    textTransform="uppercase"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    _expanded={{ bg: "transparent" }}
                    _focus={{ boxShadow: "transparent" }}
                  >
                    {
                      <HStack cursor="pointer">
                        <Link
                          href={
                            navItem.href === "/climate-account" && Lodash.isEmpty(userContext)
                              ? "#"
                              : navItem.href || "#"
                          }
                        >
                          <LinkUI
                            onClick={() => {
                              if (
                                navItem.href === "/climate-account" &&
                                Lodash.isEmpty(userContext)
                              ) {
                                refSignIn.current.openModal(SCREEN_AUTH.SIGN_IN);
                              }
                            }}
                            color={
                              navItem.listHref?.includes(router.route) ||
                              navItem.href == router.route
                                ? "#61A533"
                                : "#718096"
                            }
                            py="17px"
                          >
                            {navItem.name}
                          </LinkUI>
                        </Link>
                        {childs.length > 0 && <TiArrowSortedDown color="#718096" />}
                      </HStack>
                    }
                  </Button>
                )}
              >
                {!!childs.length && renderSubMenu(childs)}
              </MenuHover>
            );
          })}
        </Flex>
      </Container>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav listMenu={listMenu} />
      </Collapse>
      <ModalContainer ref={refSignIn} />
    </Box>
  );
}

export default NavBottom;
