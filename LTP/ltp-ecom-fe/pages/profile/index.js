import {
  Avatar,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Collapse,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import { useAppUserContext } from "@ltp/components/context/auth";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { readCache } from "@ltp/services/datacache";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  RiEyeLine,
  RiHeart3Line,
  RiLockLine,
  RiMapPinLine,
  RiShoppingBag3Line,
  RiThumbUpLine,
  RiUser6Line,
} from "react-icons/ri";
import { MetadataTags } from "SEOs/meta-tag/index";
import Address from "./components/Address";
import Favorite from "./components/Favorite";
import GeneralInfo from "./components/GeneralInfo";
import MobileMenu from "./components/MobileMenu";
import Orders from "./components/Orders";
import OrderDetail from "./components/Orders/OrderDetail";
import OrdersTracking from "./components/OrdersTracking";
import Password from "./components/Password";
import Review from "./components/Review";
import Viewed from "./components/Viewed";

export const GENERAL_INFO = "GENERAL_INFO";
const ADDRESS = "ADDRESS";
const PASSWORD = "PASSWORD";
export const ORDERS = "ORDERS";
export const ORDER_DETAIL = "ORDERDETAIL";
export const ORDER_TRACKING = "ORDERTRACKING";
export const FAVORITES = "FAVORITES";
const VIEWED = "VIEWED";
const REVIEW = "REVIEW";

const menuItems = [
  {
    id: 1,
    name: GENERAL_INFO,
    text: "Hồ sơ",
    textEn: "Profile",
    icon: RiUser6Line,
  },
  {
    id: 2,
    name: ADDRESS,
    text: "Địa chỉ",
    textEn: "Address",
    icon: RiMapPinLine,
  },
  {
    id: 3,
    name: PASSWORD,
    text: "Mật khẩu",
    textEn: "Password",
    icon: RiLockLine,
  },
  {
    id: 4,
    name: ORDERS,
    text: "Đơn hàng",
    textEn: "Orders",
    icon: RiShoppingBag3Line,
  },
  {
    id: 5,
    name: FAVORITES,
    text: "Yêu thích",
    textEn: "Favourites",
    icon: RiHeart3Line,
  },
  {
    id: 6,
    name: VIEWED,
    text: "Đã xem",
    textEn: "Viewed",
    icon: RiEyeLine,
  },
  {
    id: 7,
    name: REVIEW,
    text: "Đánh giá",
    textEn: "Review",
    icon: RiThumbUpLine,
  },
];

const breadcrumbs = [
  {
    name: GENERAL_INFO,
    text: "Hồ sơ",
    textEn: "Profile",
  },
  {
    name: ADDRESS,
    text: "Địa chỉ",
    textEn: "Address",
  },
  {
    name: PASSWORD,
    text: "Mật khẩu",
    textEn: "Password",
  },
  {
    name: ORDERS,
    text: "Đơn hàng của tôi",
    textEn: "My orders",
  },
  {
    name: VIEWED,
    text: "Đã xem",
    textEn: "Viewed",
  },
  {
    name: FAVORITES,
    text: "Yêu thích",
    textEn: "Favourites",
  },
  {
    name: REVIEW,
    text: "Đánh giá",
    textEn: "Review",
  },
];

function Profile() {
  const { userContext } = useAppUserContext();
  const router = useRouter();
  const { t, locale } = useTranslation();
  const activeMenuQuery = router.query?.activeMenu || GENERAL_INFO;
  const page = router.query?.page;
  const [activeMenu, setActiveMenu] = useState(activeMenuQuery);
  const [orderDetailInfo, setOrderDetailInfo] = useState({});
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isLoginRegisterSocial, setIsLoginRegisterSocial] = useState("false");
  const [productTrack, setProductTrack] = useState({});
  useEffect(() => {
    const isDataLoginRegisterSocial = readCache(keyCache.isLoginRegisterSocial);
    setActiveMenu(router.query?.activeMenu || GENERAL_INFO);
    setIsLoginRegisterSocial(isDataLoginRegisterSocial);
  }, [router.query?.activeMenu]);

  useEffect(() => {
    if (activeMenu) {
      router.push({
        pathname: router.pathname,
        query: {
          activeMenu,
          page,
        },
      });
    }
  }, [activeMenu]);

  const MenuItem = ({ name, text, icon }) => (
    <ListItem
      p={2}
      pl={6}
      display="flex"
      alignItems="center"
      borderRadius="4px"
      _hover={{
        bg: "rgba(255, 255, 255, 0.32)",
        cursor: "pointer",
      }}
      bg={activeMenu === name ? "rgba(255, 255, 255, 0.32)" : "transparent"}
      onClick={() => setActiveMenu(name)}
    >
      <ListIcon as={icon} />
      <Text as="span" fontWeight="500" fontSize={14}>
        {text}
      </Text>
    </ListItem>
  );

  const handleViewOrderDetail = (order) => {
    setOrderDetailInfo(order);
    setActiveMenu(ORDER_DETAIL);
  };

  const handleClickMobileMenuItem = (name) => {
    setActiveMenu(name);
    setIsOpenMobileMenu(false);
  };

  const renderMenuContent = () => {
    switch (activeMenu) {
      case GENERAL_INFO:
        return <GeneralInfo />;
      case ADDRESS:
        return <Address />;
      case PASSWORD:
        return <Password />;
      case ORDERS:
        return <Orders onViewOrderDetail={handleViewOrderDetail} />;
      case ORDER_DETAIL:
        return (
          <OrderDetail
            order={orderDetailInfo}
            setActiveMenu={setActiveMenu}
            setProductTrack={setProductTrack}
          />
        );
      case ORDER_TRACKING:
        return (
          <OrdersTracking
            order={orderDetailInfo}
            setActiveMenu={setActiveMenu}
            product={productTrack}
          />
        );
      case FAVORITES:
        return <Favorite />;
      case VIEWED:
        return <Viewed />;
      case REVIEW:
        return <Review />;
      default:
        return <GeneralInfo />;
    }
  };

  return (
    <>
      <MetadataTags title={t("personalInfo")} notIndex />
      <Box bgColor="#F2F2F2">
        <Container>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/" passHref shallow>
                <BreadcrumbLink>{t("homePage")}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text>
                {locale === "vi"
                  ? breadcrumbs.filter((item) => item.name == activeMenu)[0]?.text
                  : breadcrumbs.filter((item) => item.name == activeMenu)[0]?.textEn}
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex pb={20}>
            <Box display={{ base: "none", md: "block" }} w="170px" flexShrink={0}>
              <Box bg="#2154FF" borderRadius={4} color="#ffffff" p={4}>
                <Box align="center">
                  <Avatar bg="teal.500" w="24px" h="24px" mr={2} src={userContext?.avatar?.url} />
                  <Text as="span" lineHeight="24px" fontSize="14px" fontWeight={600}>
                    {userContext?.name}
                  </Text>
                </Box>
                <Box w="100%" h="2px" bg="#BCCCFF" my={4} />
                <List>
                  <MenuItem name={GENERAL_INFO} text={t("profile")} icon={RiUser6Line} />
                  <MenuItem name={ADDRESS} text={t("address")} icon={RiMapPinLine} />
                  {isLoginRegisterSocial === "true" ? null : (
                    <MenuItem name={PASSWORD} text={t("password")} icon={RiLockLine} />
                  )}
                  <MenuItem name={ORDERS} text={t("order")} icon={RiShoppingBag3Line} />
                  <MenuItem name={FAVORITES} text={t("favourite")} icon={RiHeart3Line} />
                  <MenuItem name={VIEWED} text={t("viewed")} icon={RiEyeLine} />
                  <MenuItem name={REVIEW} text={t("reviewUp")} icon={RiThumbUpLine} />
                </List>
                <Box w="100%" h="2px" bg="#BCCCFF" my={4} />
              </Box>
            </Box>
            <Box flexGrow={1}>
              <Box mb={4} display={{ base: "flex", md: "none" }} alignItems="center">
                <Avatar bg="teal.500" w="24px" h="24px" mr={2} />
                <Text as="span" lineHeight="24px" fontSize="14px" fontWeight={600}>
                  David Dang
                </Text>
                <Button bg="#ffffff">
                  <Image src="/icons/caret-double-right.svg" onClick={setIsOpenMobileMenu} />
                </Button>
              </Box>
              {renderMenuContent()}
            </Box>
          </Flex>
          <Collapse in={isOpenMobileMenu} animateOpacity>
            <MobileMenu
              items={menuItems}
              onClickItem={(name) => handleClickMobileMenuItem(name)}
              onClose={() => setIsOpenMobileMenu(false)}
              isLoginRegisterSocial={isLoginRegisterSocial}
            />
          </Collapse>
        </Container>
      </Box>
    </>
  );
}

export default Profile;
