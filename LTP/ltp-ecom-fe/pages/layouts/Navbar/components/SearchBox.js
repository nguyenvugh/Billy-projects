import {
  Box,
  Button,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useAppUserContext } from "@ltp/components/context/auth";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import { useRouter } from "next/router";
import PropType from "prop-types";
import { useState } from "react";

export default function SearchBox({ children }) {
  const { t, locale } = useTranslation();
  const { setSearchProductKey } = useAppUserContext();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSearchProductKey(search);
    router.push({
      pathname: ROUTE_PRODUCT(locale),
      query: { keyword: search },
      option: { shallow: true },
    });
  };

  return (
    <Popover matchWidth>
      <PopoverTrigger>
        <Button
          bg="transparent"
          fontSize="xl"
          variant="link"
          color="#ffffff"
          cursor="pointer"
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent width="290px">
        <PopoverArrow />
        <Flex as="form" onSubmit={onSubmit} w="100%" p={2}>
          <Box flexGrow={1} fontSize="14px">
            <Input
              color="gray"
              value={search}
              onChange={onChange}
              placeholder={t("findPlaceholder")}
            />
          </Box>
          <Box fontSize="14px">
            <Button type="submit" bg="transparent" color="#4D76FF">
              {t("find")}
            </Button>
          </Box>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}

SearchBox.propTypes = {
  children: PropType.element,
};

SearchBox.defaultProps = {
  children: "",
};
