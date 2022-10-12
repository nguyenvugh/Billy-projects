import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { getMenuCategory, getMenuProducts } from "@ltp/services/home";
import { getValidSlug } from "@ltp/utils/index";
import {
  ROUTE_ABOUT_US,
  ROUTE_CATEGORY,
  ROUTE_CATEGORY_NEW,
  ROUTE_NEWS,
  ROUTE_SHOP,
  ROUTE_STORE_PAGE,
} from "@ltp/utils/constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiSearchLine, RiShoppingBag3Line } from "react-icons/ri";
import Cart from "./components/Cart";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import SearchBox from "./components/SearchBox";

export default function Navbar() {
  const { t, locale } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();
  const NAV_ITEMS = [
    {
      id: "1",
      text: "Về Long Thành",
      textEn: "About Long Thanh",
      path: ROUTE_ABOUT_US(locale),
    },
    {
      id: "2",
      text: "Sản phẩm",
      textEn: "Products",
      path: ROUTE_CATEGORY(locale) || "/category",
    },
    {
      id: "3",
      text: "Bản Tin",
      textEn: "News",
      path: ROUTE_CATEGORY_NEW(locale) || "/blog",
      children: [],
    },
    {
      id: "4",
      text: "Liên hệ",
      textEn: "Contact",
      path: "#",
      children: [
        {
          id: "4.1",
          text: "Hệ thống cửa hàng",
          textEn: "Store System",
          path: ROUTE_SHOP(locale),
        },
        {
          id: "4.2",
          text: "Văn phòng đại diện",
          textEn: "Representative Office",
          path: ROUTE_STORE_PAGE(locale),
        },
      ],
    },
  ];
  const [nav, setNav] = useState(NAV_ITEMS);
  useEffect(() => {
    setNav(NAV_ITEMS);
  }, [locale]);

  useEffect(() => {
    Promise.all([getMenuProducts(), getMenuCategory()]).then((response) => {
      const menu = [...NAV_ITEMS];
      menu[0].path = ROUTE_ABOUT_US(locale);
      const category = response[1].data?.results;
      if (Array.isArray(category)) {
        menu[2].children = category.map((item) => ({
          id: item?.id,
          text: item?.name,
          path: `${ROUTE_NEWS(locale, getValidSlug(item))}`,
        }));
      }

      setNav(menu);
    });
  }, [locale]);

  return (
    <Box
      bg="#2154FF"
      color={useColorModeValue("white")}
      minH="60px"
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
      align="center"
    >
      <Container>
        <Flex alignItems="center">
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <a href="/">
              <Image
                cursor="pointer"
                height="64px"
                width="235px"
                margin="8px 0 8px"
                src="/imgs/logo.png"
                alt="LTP"
                title="LTP"
                objectFit="contain"
                maxWidth={["100%", "65%"]}
              />
            </a>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            alignItems="center"
            direction="row"
            spacing={6}
            textAlign="right"
          >
            <Flex display={{ base: "none", md: "flex" }}>
              <DesktopNav items={nav} />
            </Flex>
            <SearchBox>
              <Icon as={RiSearchLine} />
            </SearchBox>
            <Cart>
              <Icon as={RiShoppingBag3Line} />
            </Cart>
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              icon={<HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Stack>
          <Collapse in={isOpen} animateOpacity>
            <MobileNav items={nav} onClose={onToggle} />
          </Collapse>
        </Flex>
      </Container>
    </Box>
  );
}
