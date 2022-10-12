import { Button, Flex, HStack, Link as LinkUI, Stack, Text } from "@chakra-ui/react";
import MenuHover from "@ltp/components/MenuHover";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import Lodash from "lodash";
import PropType from "prop-types";
import { TiArrowSortedDown } from "react-icons/ti";

export default function DesktopNav({ items }) {
  const { locale } = useTranslation();
  const renderSubMenu = (submenu) => {
    if (Array.isArray(submenu)) {
      if (Array.isArray(submenu?.[0]?.childs)) {
        return (
          <Flex color="#071133" fontSize={14} textAlign="left">
            {submenu.map((category, index) => (
              <Flex flexDirection="column" py={4} key={index}>
                <Text fontWeight={600} px={4} pb={1} mb={2} borderBottom="1px solid #BCCCFF">
                  {category?.name}
                </Text>
                {category.childs.map((categorySub, index) => (
                  <a key={index} href={addTrailingSlash(ROUTE_PRODUCT(locale))}>
                    <LinkUI
                      _hover={{ textDecoration: "none", color: "#007BFF" }}
                      cursor="pointer"
                      px={4}
                      py={2}
                    >
                      {categorySub?.name}
                    </LinkUI>
                  </a>
                ))}
              </Flex>
            ))}
            <Flex flexDirection="column" color="#007BFF" py={4}>
              <Text fontWeight={600} px={4} pb={1} mb={2} borderBottom="1px solid #BCCCFF">
                <a href={addTrailingSlash(ROUTE_PRODUCT(locale))}>
                  <LinkUI _hover={{ textDecoration: "none", color: "#007BFF" }} cursor="pointer">
                    More &gt;
                  </LinkUI>
                </a>
              </Text>
            </Flex>
          </Flex>
        );
      }
      return (
        <>
          {submenu.map((item, index) => {
            // console.log(item);
            return (
              <Text
                key={index}
                color="#071133"
                fontSize={14}
                padding="12px 36px"
                textAlign="center"
                cursor="pointer"
              >
                <a href={addTrailingSlash(item?.path)}>
                  <LinkUI _hover={{ textDecoration: "none" }} cursor="pointer">
                    {locale === "en" && !Lodash.isEmpty(item?.textEn) ? item?.textEn : item?.text}
                  </LinkUI>
                </a>
              </Text>
            );
          })}
          {submenu?.[0]?.path?.indexOf("/news?categoryId=") === 0 && (
            <Text
              color="#007BFF"
              fontSize={14}
              padding="12px 36px"
              textAlign="center"
              cursor="pointer"
            >
              <a>
                <LinkUI _hover={{ textDecoration: "none", color: "#007BFF" }} cursor="pointer">
                  More &gt;
                </LinkUI>
              </a>
            </Text>
          )}
        </>
      );
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      {items.map((navItem) => (
        <MenuHover
          key={navItem?.id}
          renderTrigger={() => (
            <Button
              fontWeight="600"
              fontSize="16px"
              textTransform="uppercase"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _expanded={{ bg: "transparent" }}
              _focus={{ boxShadow: "transparent" }}
            >
              {navItem?.children?.length > 0 ? (
                <HStack cursor="pointer">
                  <a href={addTrailingSlash(navItem.path || "#")}>
                    {locale === "vi" ? navItem?.text : navItem?.textEn}
                  </a>
                  <TiArrowSortedDown />
                </HStack>
              ) : (
                <a href={addTrailingSlash(navItem?.path)}>
                  <LinkUI _hover={{ textDecoration: "none" }} cursor="pointer">
                    {locale === "vi" ? navItem?.text : navItem?.textEn}
                  </LinkUI>
                </a>
              )}
            </Button>
          )}
        >
          {renderSubMenu(navItem?.children)}
        </MenuHover>
      ))}
    </Stack>
  );
}

DesktopNav.propsType = {
  items: PropType.array.isRequired,
};

DesktopNav.defaultProps = {
  items: [],
};
