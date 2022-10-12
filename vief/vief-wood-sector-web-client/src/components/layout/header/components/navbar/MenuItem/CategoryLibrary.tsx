import { ROUTE_LIBRARY } from "@/src/common/constants/routes.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { NavbarProps } from "@/src/components/layout/interfaces";

import { Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";

const CategoryLibrary = ({ children }: { children?: NavbarProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useViefRouter();

  // const handleRouterCategoryItem = (children: any) => {
  //   router.push(children);
  // };

  function handleRouter() {
    router.push(ROUTE_LIBRARY.en);
  }
  function checkCategory() {
    if (children === undefined || children.total === 0) return false;
    else return true;
    // return false
  }
  return (
    <>
      <Menu isOpen={isOpen}>
        <MenuButton
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          onClick={handleRouter}
          fontWeight={router.pathname == "/library" ? "600" : "500"}
        >
          Thư viện
          {/* {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} */}
        </MenuButton>
        {checkCategory() === true ? (
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} mt={"-7px"}>
            {children?.data.map((index, key) => (
              <MenuItem
                key={key}
                // onClick={() => handleRouterCategoryItem(index.path)}
              >
                <Text variant="text14" cursor="pointer">
                  {index.name}
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        ) : null}
      </Menu>
    </>
  );
};

export default CategoryLibrary;
