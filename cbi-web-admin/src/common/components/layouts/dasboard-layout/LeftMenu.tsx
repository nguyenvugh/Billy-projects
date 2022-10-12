import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Logo from "src/common/assets/icons/logo.svg";
import { AbilityContext, Can } from "src/common/casl/Abilitites";
import { updateAbility } from "src/common/casl/defineAbility";
import { LEFT_MENU_CONFIG } from "src/common/configs/left-menu.config";
import { getCurrentPolicies } from "src/common/lib/jwt.utils";
import { LogOut } from "src/profile/modals/LogOut";

function LeftMenu() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const ability = useContext(AbilityContext);
  const { policies, userType } = getCurrentPolicies();

  useEffect(() => {
    updateAbility(ability, policies, userType);
  }, []);

  return (
    <Box h="100vh" overflow="auto" w={256} bg="green.primary" flexShrink={0}>
      <Image src={Logo} m="auto" mt="4" />
      <Accordion defaultIndex={LEFT_MENU_CONFIG.map((_, index) => index)} allowMultiple mt={126}>
        {LEFT_MENU_CONFIG.map((item, index) => {
          const isPassThrough = item.resources === "all" || userType === "SUPER_ADMIN";
          return (
            <Can I="manage" a={item.resources || "all"} passThrough={isPassThrough}>
              <AccordionItem border="none" key={index}>
                <AccordionButton {...ACCORDING_BTN_STYLE}>
                  <Box flex="1" textAlign="left" display="flex" alignItems="center">
                    {item.icon && <Image src={item.icon as string} w={18} h={18} mr="2" />}
                    <Text>{t(item.label as any)}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={0} bg={"rgba(244, 244, 244, 0.15)"}>
                  {item.children.map((child, index) => {
                    const containCurrentRoute = child.children.find((c) => c.pathName === pathname);
                    const isActive = pathname === child.pathName || !!containCurrentRoute;
                    return (
                      <Link key={index} to={child.pathName || "#"}>
                        <Box key={index} bg={isActive ? "#255630" : "none"} {...CHILD_ITEM_STYLE}>
                          {t(child.label as any)}
                        </Box>
                      </Link>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Can>
          );
        })}
        <LogOut />
      </Accordion>
    </Box>
  );
}

const CHILD_ITEM_STYLE = {
  w: "full",
  h: 50,
  mx: "3",
  overflow: "clip",
  display: "flex",
  alignItems: "center",
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "bold",
  m: 0,
  pl: "40px",
  cursor: "pointer",
  transition: "ease-in",
  transitionDuration: "0.2s",
  _hover: {
    bg: "#255630",
  },
};

const ACCORDING_BTN_STYLE = {
  py: "3",
  fontSize: 14,
  fontWeight: "bold",
  color: "white",
  _focus: {
    shadow: "none",
  },
  _expanded: {
    backgroundColor: "rgba(244, 244, 244, 0.15)",
  },
};

export { LeftMenu };
