import { Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAddCbi } from "src/cbi/hooks/useAddCbi";
import { CBIS } from "src/cbi/interfaces";
import { ConfirmModalV2 } from "src/common/components/confirm-modal/ConfirmModalV2";
import { useToast } from "src/common/hooks/useToast";
import { CbiModal } from "./CbiModal";

interface CbiHeaderProps {
  numSubmit: number;
  setNumSubmit: (num: number) => void;
  delEnabled: boolean;
}

function CbiHeader(props: CbiHeaderProps) {
  // const { setNumSubmit, numSubmit, delEnabled } = props;
  const { setNumSubmit, numSubmit } = props;
  const { t } = useTranslation();
  const toast = useToast();
  const { mutate } = useAddCbi();
  const { isOpen, onClose } = useDisclosure();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    // onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const onConfirmModal = () => {
    setNumSubmit(numSubmit + 1);
    onCloseDeleteModal();
  };

  function handleAddCbi(data: CBIS) {
    if (!data.thumbnail_id) {
      toast({ title: "Xin hãy chọn ảnh!", status: "error" });
      return;
    }
    mutate(data);
    onClose();
  }
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
      <Text fontSize="24px" variant="page-title">
        Danh sách bảng câu hỏi
      </Text>

      {/* <Stack direction="row" spacing={4}>
        <Button bg={delEnabled ? "#D70000" : "#718096"} onClick={onOpenDeleteModal}>
          {t("delete-table-question")}
        </Button>
        <Button leftIcon={<PlusIcon />} onClick={onOpen}>
          {t("add-table-question")}
        </Button>
      </Stack> */}
      <CbiModal title="Thêm bảng câu hỏi" isOpen={isOpen} onClose={onClose} onSave={handleAddCbi} />
      <ConfirmModalV2
        title={t("delete-category")}
        isOpen={isOpenDeleteModal}
        onCancel={onCloseDeleteModal}
        onOk={onConfirmModal}
        cancelText="Thoát"
        okText="Đồng ý"
        content="Bạn có chắc chắn muốn xoá những bảng câu hỏi này?"
      />
    </Stack>
  );
}

export { CbiHeader };
