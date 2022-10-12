import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link as LinkUI,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Auth, { SCREEN_AUTH } from "@ltp/components/Auth";
import { useAppUserContext } from "@ltp/components/context/auth";
import useTranslation from "@ltp/hooks/useTranslation";
import { clearCache } from "@ltp/services/datacache";
import { ROUTE_CATEGORY_NEW, ROUTE_PRODUCT } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";
import PropType from "prop-types";
import { useState } from "react";

export default function MobileNav({ items, onClose }) {
  const { userContext, setUserContext } = useAppUserContext();
  const [screen, setScreen] = useState();
  // const { emptyCart } = useCart();
  const { t } = useTranslation();

  const router = useRouter();
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      display={{ base: "flex", md: "none" }}
      flexDirection="column"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "75%",
        height: "100vh",
        backgroundColor: "#ffffff",
        zIndex: "1000",
        overflow: "auto",
      }}
    >
      <Flex
        fontSize="12px"
        py={2}
        px={4}
        bg="#E9EEFF"
        position="relative"
        color="#000"
        textAlign="left"
        minH="60px"
        lineHeight="55px"
        alignItems="center"
      >
        <Box flexGrow={1}>
          {userContext?.id ? (
            <Box>
              <Text as="p">{userContext.name}</Text>
              <a href={addTrailingSlash("/profile")}>{t("account")}</a>
              {" hoặc "}
              <Text
                cursor="pointer"
                display="inline-block"
                onClick={() => {
                  clearCache();
                  setUserContext({});
                  // emptyCart();
                  router.push("/");
                }}
              >
                {t("logOut")}
              </Text>
            </Box>
          ) : (
            <Box>
              <Text
                cursor="pointer"
                display="inline-block"
                onClick={() => setScreen(SCREEN_AUTH.signIn)}
                mr="5px"
              >
                {t("logIn")}
              </Text>
              {t("or")}
              <Text
                cursor="pointer"
                display="inline-block"
                onClick={() => setScreen(SCREEN_AUTH.signUp)}
                ml="5px"
              >
                {t("signUp")}
              </Text>
            </Box>
          )}
        </Box>
        <Box flexShrink={0} position="absolute" align="right" right="1.5rem" cursor="pointer">
          <CloseIcon w={3} h={3} onClick={onClose} />
        </Box>
      </Flex>
      {items.map((navItem) => (
        <MobileNavItem key={navItem.text} {...navItem} onClose={onClose} />
      ))}
      <Auth screen={screen} setScreen={setScreen} />
    </Box>
  );
}

const MobileNavItem = ({ text, textEn, children, path, onClose }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { locale } = useTranslation();
  const handleClose = () => {
    onClose instanceof Function && onClose();
  };

  const renderMenu = () => (
    <LinkUI
      py={2}
      px={4}
      fontSize="12px"
      display="flex"
      justify="space-between"
      _hover={{
        textDecoration: "none",
      }}
      borderBottom="1px"
      borderBottomColor="#DFDFDF"
      color="#000000"
    >
      {text === "Bản Tin" ? (
        <Box w="100%">
          <a href={addTrailingSlash(ROUTE_CATEGORY_NEW(locale))}>
            <Text>{locale === "en" ? textEn : text}</Text>
          </a>
        </Box>
      ) : (
        <Text as="span" flexGrow={1}>
          {locale === "en" ? textEn : text}
        </Text>
      )}

      {children && (
        <Icon
          as={ChevronDownIcon}
          transition="all .25s ease-in-out"
          transform={isOpen ? "rotate(180deg)" : ""}
          w={6}
          h={6}
        />
      )}
    </LinkUI>
  );

  const renderSubMenu = () => {
    if (Array.isArray(children)) {
      // product
      if (Array.isArray(children?.[0]?.childs)) {
        return children.map((child, index) => (
          <Flex flexDirection="column" key={index} borderBottom="1px #DFDFDF">
            <Text borderBottom="1px solid #DFDFDF" py={2} pl={8} color="#000000">
              {child?.name}
            </Text>
            {Array.isArray(child?.childs) &&
              child.childs.map((category, index) => (
                <a key={index} href={addTrailingSlash(ROUTE_PRODUCT(locale))}>
                  <LinkUI
                    borderBottom="1px solid #DFDFDF"
                    py={2}
                    pl={12}
                    color="#000000"
                    onClick={handleClose}
                  >
                    {category?.name}
                  </LinkUI>
                </a>
              ))}
          </Flex>
        ));
      }
      return children.map((child, index) => (
        <a href={addTrailingSlash(child?.path)} key={index}>
          <LinkUI borderBottom="1px solid #DFDFDF" py={2} pl={8} color="#000000" onClick={onClose}>
            {locale === "en" ? (child?.textEn ? child?.textEn : child?.text) : child?.text}
          </LinkUI>
        </a>
      ));
    }
  };
  return (
    <Flex flexDirection="column" textAlign="left" onClick={children && onToggle}>
      {children ? renderMenu() : <a href={addTrailingSlash(path)}>{renderMenu()}</a>}
      <Collapse in={isOpen} animateOpacity>
        <Flex fontSize="12px" flexDirection="column">
          {renderSubMenu()}
        </Flex>
      </Collapse>
    </Flex>
  );
};

MobileNav.propsType = {
  items: PropType.array.isRequired,
};

MobileNav.defaultProps = {
  items: [],
};
