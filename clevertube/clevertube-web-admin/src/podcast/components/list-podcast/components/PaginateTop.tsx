import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CaretDownIcon } from "src/common/assets/icons/caretdown";
import { CaretLeftIcon } from "src/common/assets/icons/caretleft";
import { CaretRightIcon } from "src/common/assets/icons/caretright";
import { useSearchParams } from "react-router-dom";
import { PaginateTopType } from "src/podcast/interface";
import { LIMITS } from "src/podcast/constant";

const PaginateTopPage = ({ meta, setPageSize, setPage, setLimit }: PaginateTopType) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageGoTo, setPageGoTo] = useState<number | string>(currentPage);
  const [active, setActive] = useState<number>(0);

  const totalPages = meta?.totalPages;
  const totalItems = meta?.totalItems;
  const itemsPerPage = meta?.itemsPerPage;

  const pageNumber = searchParams.get("page");

  useEffect(() => {
    if (!pageNumber || +pageNumber > totalPages) {
      setSearchParams({
        page: "1",
      });
      setPageGoTo(1);
      setCurrentPage(1);
    } else {
      setPage(+pageNumber);
      setPageGoTo(+pageNumber);
      setCurrentPage(+pageNumber);
    }
  }, [pageNumber]);

  const setPageUrl = (page) => {
    setSearchParams({
      page,
    });
  };

  const handleSetLimit = async (limit: number) => {
    setLimit(limit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPageUrl(pageGoTo);
  };

  return (
    <Box display="flex" alignItems="center" gap="24px" h="24px" {...TextStyle}>
      <Text>
        Total {totalItems} {totalItems > 1 ? "podcasts" : "podcast"}
      </Text>

      <Box display="flex" alignItems="center" gap="6px">
        <Text>View</Text>
        <Menu>
          <MenuButton
            as={Button}
            h="24px"
            w="60px"
            px="5px"
            fontSize="13px"
            bgColor="#FFFFFF"
            border="1px solid #E6E6E6"
            rightIcon={<CaretDownIcon fill="#999999" />}
          >
            {itemsPerPage}
          </MenuButton>

          <MenuList minW="80px">
            {LIMITS.map((limit, i) => (
              <MenuItem
                bg={active === i ? "#e2e8f0" : ""}
                color={active === i ? "black" : ""}
                _focus={active === i ? { bg: "#e2e8f0" } : {}}
                w="80px"
                onClick={() => {
                  handleSetLimit(limit.value);
                  setPageSize(limit.value);
                  setActive(limit.id);
                }}
                key={limit.id}
              >
                {limit.value}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Text>per page</Text>
      </Box>

      <Box display="flex" alignItems="center" gap="6px">
        <Text>Page</Text>
        <Box as="form" onSubmit={handleSubmit}>
          <InputGroup size="sm" textAlign="center">
            <InputLeftElement w="10px">
              <Button
                size="5px"
                ml="15px"
                variant="ghost"
                onClick={() => setPageUrl(currentPage - 1)}
                disabled={currentPage - 1 <= 0}
              >
                <CaretLeftIcon fill="#999999" />
              </Button>
            </InputLeftElement>

            <Input
              p="0"
              w="70px"
              type="number"
              min="1"
              max={totalPages}
              borderRadius="6px"
              textAlign="center"
              value={pageGoTo}
              onChange={(e) => setPageGoTo(e.target.value)}
            />

            <InputRightElement w="10px">
              <Button
                size="5px"
                mr="15px"
                variant="ghost"
                onClick={() => setPageUrl(currentPage + 1)}
                disabled={currentPage + 1 > totalPages}
              >
                <CaretRightIcon fill="#999999" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Text>
          of {totalPages} {totalPages > 1 ? "pages" : "page"}
        </Text>
      </Box>
    </Box>
  );
};

export default PaginateTopPage;

const TextStyle = {
  color: "black.primary",
  fontSize: "14px",
};
