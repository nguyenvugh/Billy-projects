import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { AbilityContext } from "src/common/casl/Abilities";
import { updateAbility } from "src/common/casl/defineAbility";
import { LEFT_MENU_CONFIG } from "src/common/configs/left-menu.configs";
import { getCurrentPolicies } from "src/common/lib/jwt.utils";

function LeftMenu() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const ability = useContext(AbilityContext);
  const { policies, userType } = getCurrentPolicies();

  useEffect(() => {
    updateAbility(ability, policies, userType);
  }, []);

  return (
    <Box h="100vh" overflow="auto" w={256} bg="blue.primary" flexShrink={0}>
      <Flex justify="center" mt="32px">
        <Image src="/assets/images/logo.png" w="56px" objectFit="contain" />
      </Flex>
      <Accordion
        defaultIndex={LEFT_MENU_CONFIG.map((_, index) => index)}
        allowMultiple
        mt="32px"
      >
        {LEFT_MENU_CONFIG.map((item, index) => {
          //   const isPassThrough = item.resources === "all" || userType === "SUPER_ADMIN";
          const containCurrentRoute = item.children.find((c) => c.pathName === pathname);
          const isActive = pathname === item.pathName || !!containCurrentRoute;
          return (
            // <Can I="manage" a={item.resources || "all"} passThrough={isPassThrough}>
            <AccordionItem border="none" key={index}>
              <Link key={index} to={item.pathName || "#"}>
                <Box
                  bg={isActive ? "rgba(0, 0, 0, 0.1)" : "blue.primary"}
                  _hover={{
                    bg: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <AccordionButton {...ACCORDING_BTN_STYLE} h="56px">
                    <Flex align="center">
                      {/* <Image src={item.icon} w="24px" objectFit="contain" /> */}
                      {/* <YoutubeIcon
                        boxSize={5}
                        fill={isActive ? "white" : "transparent"}
                        stroke={isActive ? "blue" : "white"}
                        fillTriangleColor={isActive ? "#216BCD" : "transparent"}
                      /> */}
                      {item.icon}
                      <Box key={index} {...ITEM_STYLE}>
                        {t(item.label as any)}
                      </Box>
                    </Flex>
                    {item.children.length > 0 && <AccordionIcon />}
                  </AccordionButton>
                </Box>
              </Link>
              <AccordionPanel p={0}>
                {item.children.map((child, index) => {
                  const containCurrentRoute = child.children.find(
                    (c) => c.pathName === pathname
                  );
                  const isActive = pathname === child.pathName || !!containCurrentRoute;
                  return (
                    <Link key={index} to={child.pathName || "#"}>
                      <Box
                        key={index}
                        bg={isActive ? "rgba(0, 0, 0, 0.1)" : "none"}
                        {...CHILD_ITEM_STYLE}
                        _hover={{
                          bg: "rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {t(child.label as any)}
                      </Box>
                    </Link>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
            // </Can>
          );
        })}
      </Accordion>
    </Box>
  );
}

const ITEM_STYLE = {
  w: "full",
  h: "20px",
  mx: "3",
  overflow: "clip",
  display: "flex",
  alignItems: "center",
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "bold",
  m: 0,
  pl: "10px",
  cursor: "pointer",
  transition: "ease-in",
  transitionDuration: "0.2s",
};

const CHILD_ITEM_STYLE = {
  w: "full",
  h: "56px",
  mx: "3",
  overflow: "clip",
  display: "flex",
  alignItems: "center",
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "bold",
  m: 0,
  pl: "60px",
  cursor: "pointer",
  transition: "ease-in",
  transitionDuration: "0.2s",
};

const ACCORDING_BTN_STYLE = {
  py: "3",
  fontSize: 14,
  fontWeight: "bold",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
};

export { LeftMenu };
