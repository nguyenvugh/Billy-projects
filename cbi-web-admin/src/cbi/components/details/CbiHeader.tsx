import React from "react";
import { Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
// import { ReactComponent as PlusIcon } from "src/common/assets/icons/iconPlus.svg";
import { CbiModal } from "./CbiModal";
import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { useLocation } from "react-router-dom";
import { LocationState } from "./CBIQuizTable";

function CbiHeader() {
  const {
    isOpen,
    // onOpen,
    onClose,
  } = useDisclosure();
  const { isOpen: isOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as LocationState;
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
      <Text fontSize="24px" variant="page-title">
        {state.groupName}
      </Text>

      <Stack direction="row" spacing={4}>
        {/* <Button leftIcon={<PlusIcon />} onClick={onOpen}>
          Thêm giai đoạn
        </Button> */}
      </Stack>
      <CbiModal title="Thêm giai đoạn" isOpen={isOpen} onClose={onClose} onSave={() => {}} />
      <ConfirmModal
        title={t("delete-category")}
        isOpen={isOpenDeleteModal}
        onCancel={onCloseDeleteModal}
        onDelete={onCloseDeleteModal}
        content={t("confirm-delete-message")}
      />
    </Stack>
  );
}

export { CbiHeader };
