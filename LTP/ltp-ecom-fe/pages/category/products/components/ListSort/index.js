import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { SORT_ASC, SORT_DESC } from "@ltp/constants/data";
import { Fragment } from "react";
import useTranslation from "@ltp/hooks/useTranslation";

const ListSort = ({ value, onChange }) => {
  const { t } = useTranslation();
  const sortAsc = () => {
    onChange instanceof Function && onChange(SORT_ASC);
  };
  const sortDesc = () => {
    onChange instanceof Function && onChange(SORT_DESC);
  };
  return (
    <Menu placement="bottom-end" matchWidth>
      <MenuButton>
        <HStack spacing="10px" borderBottom="1px solid #2154FF">
          {value === SORT_DESC ? (
            <>
              <Text color="#2154FF">{t("highPrice")}</Text>
              <ArrowUpIcon color="#2154FF" />
            </>
          ) : (
            value === SORT_ASC && (
              <>
                <Text color="#2154FF">{t("lowPrice")}</Text>
                <ArrowDownIcon color="#2154FF" />
              </>
            )
          )}
        </HStack>
      </MenuButton>
      <MenuList minWidth="136px">
        <Box
          __css={{
            ".active": {
              color: "#3A3A3A",
              pointerEvents: "none",
              " img": {
                visibility: "visible",
              },
            },
          }}
        >
          <MenuItem
            fontSize="13px"
            color="#808080"
            className={value === SORT_DESC ? "active" : ""}
            onClick={sortDesc}
          >
            <HStack>
              <Image src="/imgs/mock/products/sortActive.svg" visibility="hidden" />
              <Text>{t("highPrice")}</Text>
              <ArrowUpIcon />
            </HStack>
          </MenuItem>
          <MenuItem
            fontSize="13px"
            color="#808080"
            className={value === SORT_ASC ? "active" : ""}
            onClick={sortAsc}
          >
            <HStack>
              <Image
                src="/imgs/mock/products/sortActive.svg"
                alt="sort active"
                title="sort active"
                visibility="hidden"
              />
              <Text>{t("lowPrice")}</Text>
              <ArrowDownIcon />
            </HStack>
          </MenuItem>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default ListSort;
