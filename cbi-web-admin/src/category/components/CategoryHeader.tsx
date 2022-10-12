import React from "react";
import { Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactComponent as PlusIcon } from "src/common/assets/icons/iconPlus.svg";
import { CategoryModal } from "./CategoryModal";
import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { useAddCategory } from "../hooks/useAddCategory";
import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { useToast } from "src/common/hooks/useToast";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { updatecountSubmitDelete } from "../reducers";
// import { useNavigate } from "react-router-dom";
// import { ROUTE_CATEGORY } from "src/common/constants/routes.constants";

function CategoryHeader() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { selectedIds, countSubmitDelete } = useAppSelector((state) => state.categoryReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const addQuery = useAddCategory();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const handleOnSave = (value: string) => {
    addQuery.mutate(value, {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST);
      },
      onError(error: any) {
        toast({
          status: "error",
          title: error?.data?.message,
        });
      },
    });
  };

  const handleOnDelete = () => {
    dispatch(updatecountSubmitDelete(countSubmitDelete + 1));
    onCloseDeleteModal();
  };

  const { t } = useTranslation();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
      <Text variant="page-title">{t("list-category-news")}</Text>

      <Stack direction="row" spacing={4}>
        <Button leftIcon={<PlusIcon />} onClick={onOpen}>
          {t("add-new")}
        </Button>
        <Button bg="red.primary" onClick={onOpenDeleteModal} disabled={selectedIds.length <= 0}>
          {t("delete-selected")}
        </Button>
      </Stack>
      <CategoryModal
        title={t("add-new-category")}
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleOnSave}
      />
      <ConfirmModal
        title={t("delete-category")}
        isOpen={isOpenDeleteModal}
        onCancel={onCloseDeleteModal}
        onDelete={handleOnDelete}
        content={t("confirm-delete-message")}
      />
    </Stack>
  );
}

export { CategoryHeader };
