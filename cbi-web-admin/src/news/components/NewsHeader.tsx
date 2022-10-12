import React from "react";
import {
  Button,
  Checkbox,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactComponent as SearchIcon } from "src/common/assets/icons/iconSearch.svg";
// import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { useTranslation } from "react-i18next";
import { ReactComponent as PlusIcon } from "src/common/assets/icons/iconPlus.svg";
import { Select } from "src/common/components/select";
import { useNavigate } from "react-router-dom";
import { ROUTE_ADD_NEWS } from "src/common/constants/routes.constants";
import { AllCategory, NewsTableProps } from "../interfaces";
import { debounce } from "lodash";
import { useGetCategory } from "../hooks/useGetCategory";
import { useDeleteMultiArticle } from "../hooks/useDeleteMultiArticle";
import { AlertModal } from "src/common/components/confirm-modal/AlertModal";
import { SEARCH_DEBOUNCE_TIME } from "src/common/constants/common.constant";

function NewsHeader({ updateArticleParams, selectIds = [] }: NewsTableProps) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleChangeText = debounce((searchText?: string) => {
    updateArticleParams({ searchText, page: 1 });
  }, SEARCH_DEBOUNCE_TIME);
  const { data: categoriesRes } = useGetCategory();
  const mutationDeleteArt = useDeleteMultiArticle();

  const disableDeleteBtn = selectIds.length <= 0;
  return (
    <Stack direction="row" w="full" spacing="4">
      <Text variant="page-title" flexGrow={1}>
        Danh sách tin tức
      </Text>
      <HStack spacing="4">
        <Checkbox
          onChange={(e) => updateArticleParams({ isFeature: e.target.checked ? 1 : 0, page: 1 })}
        >
          Slider
        </Checkbox>
        <InputSearch onChange={(val) => handleChangeText(val)} />
        <SelectCategory
          onChange={(val) => updateArticleParams({ idCategory: val, page: 1 })}
          options={categoriesRes?.data || []}
        />
      </HStack>

      <Stack direction="row" spacing={4} justifyContent="flex-end">
        <Button leftIcon={<PlusIcon />} onClick={() => navigate(ROUTE_ADD_NEWS)}>
          {t("add-new")}
        </Button>
        <Button bg="red.primary" onClick={onOpen} disabled={disableDeleteBtn}>
          {t("delete-selected")}
        </Button>
      </Stack>

      {/* <ConfirmModal
        title={t("delete-news")}
        isOpen={isOpen}
        onCancel={onClose}
        onDelete={() => {
          updateArticleParams({ page: 1 });
          mutationDeleteArt.mutate(selectIds);

          onClose();
        }}
        content={t("confirm-delete-news-message")}
      /> */}
      <AlertModal
        title="Thông báo"
        content="Bạn có chắc chắn muốn xóa nội dung đã chọn?"
        isOpen={isOpen}
        onCancel={onClose}
        onDelete={() => {
          updateArticleParams({ page: 1 });
          mutationDeleteArt.mutate(selectIds);
          onClose();
        }}
      />
    </Stack>
  );
}

type ActionProps = {
  onChange: (val?: string) => void;
};
function InputSearch({ onChange }: ActionProps) {
  return (
    <InputGroup w="250px">
      <Input placeholder="Title" onChange={(e) => onChange(e.target.value)} />
      <InputRightElement>
        <Icon as={() => <SearchIcon w="6" />} />
      </InputRightElement>
    </InputGroup>
  );
}

function SelectCategory({ onChange, options }: ActionProps & { options: AllCategory[] }) {
  return (
    <Select
      w="250px"
      placeholder="Category"
      options={options.map((it) => ({ label: it.name, value: it.id }))}
      onChange={(val) => onChange(val.target.value)}
    />
  );
}

export { NewsHeader };
