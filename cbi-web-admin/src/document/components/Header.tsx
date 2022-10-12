import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactComponent as SearchIcon } from "src/common/assets/icons/iconSearch.svg";
import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTE_DOCUMENT_ADD } from "src/common/constants/routes.constants";
import { HeaderDocumentI } from "../interfaces";
import { debounce } from "lodash";
import { SEARCH_DEBOUNCE_TIME } from "src/common/constants/common.constant";

function Header({
  handleSelectAllClick,
  listSelected,
  isCheckedAll,
  onSearch,
  onDelete,
}: HeaderDocumentI) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleSearch = debounce((searchText?: string) => {
    onSearch(searchText);
  }, SEARCH_DEBOUNCE_TIME);
  return (
    <Box mb="56px">
      <Flex justifyContent={"space-between"} alignItems="flex-end" mb="10px">
        <Box>
          <Text variant="page-title">{t("document-management")}</Text>
        </Box>
        <Box w="346px">
          <InputGroup>
            <Input
              placeholder={t("search-by-document-name")}
              w="100%"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <InputRightElement>
              <Icon as={() => <SearchIcon w="6" />} />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Box>
          <Button onClick={() => navigate(ROUTE_DOCUMENT_ADD)}>{t("add-new-document")}</Button>
        </Box>
        <Box w="346px">
          <Grid templateColumns="1fr 1fr" gridGap={"13px"}>
            <Button
              onClick={() => {
                handleSelectAllClick(!isCheckedAll);
              }}
              border="1px solid #61A533"
              bg="#FFFFFF"
              color={isCheckedAll ? "green.primary" : "#000000"}
            >
              {t("choose-document")}
            </Button>
            <Button onClick={onOpen} disabled={!listSelected.length}>
              {t("delete-document")}
            </Button>
          </Grid>
        </Box>
      </Flex>

      <ConfirmModal
        title={t("delete-document")}
        isOpen={isOpen}
        onCancel={onClose}
        onDelete={() => {
          onClose();
          onDelete();
        }}
        content={t("confirm-delete-document-message")}
      />
    </Box>
  );
}

export { Header };
