import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { TextField } from "src/common/components/text/TextField";
import { BREAD_CRUMB_CONTACT_DETAIL } from "src/common/constants/breadcrumb.config";
import { ROUTE_CONTACT } from "src/common/constants/routes.constants";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { formatDate } from "src/common/utils/common.util";
import { useDeleteContactDetail } from "./hook/useDeleteContactDetail";

const ContactDetail = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const detail_contact = useAppSelector((state) => state.contactReducer.detail);
  const { mutate } = useDeleteContactDetail();
  const handleDeleteContact = () => {
    mutate(detail_contact.id);
    navigate(ROUTE_CONTACT);
    onClose();
  };
  return (
    <Box>
      <Flex alignItems="flex-end">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_CONTACT_DETAIL} />
        <Button ml="680px" w={"350px"} h="40px" bg="red.primary" onClick={() => onOpen()}>
          Xoá
        </Button>
        <ConfirmModal
          title="XÓA LIÊN HỆ"
          content="Bạn có chắc muốn xóa những liên hệ đã chọn?"
          onCancel={onClose}
          onDelete={handleDeleteContact}
          isOpen={isOpen}
        />
      </Flex>
      <Box bg="white" padding="30px" mt="23px" borderRadius="5px">
        <Flex>
          <Box>
            <Box>
              <TextField color="#A4A4A4" content="Họ và tên" />
              <TextField content={detail_contact.name} />
            </Box>
            <Box>
              <TextField color="#A4A4A4" content="Email" />
              <TextField content={detail_contact.email} />
            </Box>
          </Box>
          <Box>
            <Box marginLeft="484px">
              <TextField color="#A4A4A4" content="Số điện thoại" />
              <TextField content={detail_contact.phone} />
            </Box>
            <Box marginLeft="484px">
              <TextField color="#A4A4A4" content="Ngày giờ gửi" />
              <TextField content={formatDate(detail_contact.createdAt)} />
            </Box>
          </Box>
        </Flex>
        <Box mt="24px">
          <Text>Nội dung</Text>
          <Box bg="#ECEFFB" w="675px" mt="10px" borderRadius="5px" padding="15px" h="95px">
            {detail_contact.content}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { ContactDetail };
