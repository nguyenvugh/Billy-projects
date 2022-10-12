import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { ExportExcel } from "src/email-registration/excel-export/ExportExcel";
import { Pagination } from "src/common/components/pagination/inedx";
import { useGetEmails } from "../hooks/useGetEmails";
import Results from "src/common/components/results";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT, PAGE_SIZE } from "src/common/constants/common.constant";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { useDeleteEmails } from "../hooks/useDeleteEmails";

const EmailRegistrationList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetEmails({ page, limit: PAGE_SIZE });
  const emails = data?.data.results || [];
  const allCurrentId = emails.map((email) => email.id);
  const totalPage = data?.data.totalPage || 0;

  const {
    mutate,
    isLoading: isDeletingEmails,
    invalidate: invalidateEmailList,
  } = useDeleteEmails();

  const { isCheckedAll, selectedIds, handleCheckAll, handleSelectItem, reset } = useSelectMultiple(
    allCurrentId,
    page,
  );
  const isHasData = emails.length > 0;
  const isDisabledBtnDelete = selectedIds.length <= 0;

  function handleDeleteEmails() {
    onClose();
    mutate(selectedIds, {
      onSuccess() {
        setPage(1);
        reset();
        invalidateEmailList();
      },
      onError() {
        toast({
          position: "top",
          status: "error",
          title: "Có lỗi đã xảy ra!",
        });
      },
    });
  }
  return (
    <Box>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <Text fontSize="18px" fontWeight="bold" mt="20px" ml="24px">
          Danh sách email đăng ký
        </Text>
        <Flex>
          <ExportExcel data={emails} isDisabled={!isHasData} />
          <Button
            ml="10px"
            bg="red.primary"
            onClick={() => onOpen()}
            disabled={isDisabledBtnDelete}
            isLoading={isDeletingEmails}
            loadingText="Đang xóa..."
          >
            Xoá đã chọn
          </Button>
        </Flex>

        <ConfirmModal
          title="XÓA EMAIL ĐĂNG KÝ"
          content="Bạn có chắc muốn xóa những email đăng ký đã chọn?"
          onCancel={onClose}
          onDelete={handleDeleteEmails}
          isOpen={isOpen}
        />
      </Flex>
      <Results isLoading={isLoading}>
        <Box bg="white" paddingBottom="30px" mt="16px">
          <Table mt="23px">
            <Thead>
              <Tr>
                <Th>
                  {isHasData && (
                    <Checkbox
                      isChecked={isCheckedAll}
                      onChange={(e) => handleCheckAll(e.target.checked)}
                    />
                  )}
                </Th>
                <Th>Email</Th>
                <Th>Thời gian đăng ký</Th>
              </Tr>
            </Thead>
            <Tbody>
              {emails.map((email, index) => {
                const isChecked = selectedIds.includes(email.id);
                return (
                  <Tr key={index} cursor="pointer">
                    <Td>
                      <Checkbox
                        isChecked={isChecked}
                        onChange={(e) => handleSelectItem(email.id, e.target.checked)}
                      />
                    </Td>
                    <Td cursor="pointer">{email.email}</Td>
                    <Td>{dayjs(email.createdAt).format(DATE_TIME_FORMAT)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Box m="auto" mt="15px" display="flex" justifyContent="flex-end" pr="10">
            {isHasData && (
              <Pagination
                currentPage={page}
                totalPages={totalPage}
                onPageChange={(page) => setPage(page)}
              />
            )}
          </Box>
        </Box>
      </Results>
    </Box>
  );
};
export { EmailRegistrationList };
