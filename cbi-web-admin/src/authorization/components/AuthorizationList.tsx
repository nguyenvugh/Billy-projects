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
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmModalV2 } from "src/common/components/confirm-modal/ConfirmModalV2";
import { LoadingPage } from "src/common/components/loading-page";
import { DATE_FORMAT } from "src/common/constants/common.constant";
import { ROUTE_ADD_NEW_AUTHOR, ROUTE_DETAIL_AUTHOR } from "src/common/constants/routes.constants";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { replacePathParams } from "src/common/lib/common.lib";
import { useDeleteMultipleGroupPolicy } from "../hooks/useDeleteMultipleGroupPolicy";
import { useGetGroupPolicies } from "../hooks/useGetGroupPolicies";

const AuthorizationList = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading: isDeleting, invalidate } = useDeleteMultipleGroupPolicy();
  const { data: groupPolicyData, isLoading } = useGetGroupPolicies();
  const groupPolicies = groupPolicyData?.data || [];

  const groupPolicyKey = groupPolicies.map((p) => p.key);
  const isHasGroupPolicy = groupPolicies.length > 0;
  const { handleCheckAll, handleSelectItem, isCheckedAll, reset, selectedIds } =
    useSelectMultiple(groupPolicyKey);

  function handleRedirectToDetailPage(groupKey: string) {
    navigate(replacePathParams(ROUTE_DETAIL_AUTHOR, { groupKey }));
  }

  function handleDeleteGroup() {
    mutate(
      { groupPoliciesKeys: selectedIds },
      {
        onSuccess() {
          reset();
          invalidate();
          onClose();
        },
      },
    );
  }
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="18px" fontWeight="bold" mt="20px">
          Danh sách phân quyền
        </Text>
        <Box>
          <Button>
            <Link to={ROUTE_ADD_NEW_AUTHOR}>Thêm mới</Link>
          </Button>
          <Button ml="16px" bg="red.primary" onClick={() => onOpen()} isLoading={isDeleting}>
            Xoá đã chọn
          </Button>
        </Box>
        <ConfirmModalV2
          title="Xoá phân quyền"
          content="Bạn có muốn xoá những phân quyền đã chọn ?"
          onCancel={onClose}
          onOk={handleDeleteGroup}
          isOpen={isOpen}
        />
      </Flex>
      <LoadingPage isLoading={isLoading}>
        <Table mt="23px">
          <Thead>
            <Tr>
              <Th>
                {isHasGroupPolicy && (
                  <Checkbox
                    isChecked={isCheckedAll}
                    onChange={(e) => handleCheckAll(e.target.checked)}
                  />
                )}
              </Th>
              <Th>Tên nhóm</Th>
              <Th>Sĩ số</Th>
              <Th>Mô tả</Th>
              <Th>Ngày tạo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groupPolicies.map((group, index) => {
              const isChecked = selectedIds.includes(group.key);
              return (
                <Tr key={index} cursor="pointer">
                  <Td>
                    <Checkbox
                      isChecked={isChecked}
                      onChange={(e) => handleSelectItem(group.key, e.target.checked)}
                    />
                  </Td>
                  <Td onClick={() => handleRedirectToDetailPage(group.key)}>{group.name}</Td>
                  <Td onClick={() => handleRedirectToDetailPage(group.key)}>{group.totalMem}</Td>
                  <Td onClick={() => handleRedirectToDetailPage(group.key)}>{group.description}</Td>
                  <Td onClick={() => handleRedirectToDetailPage(group.key)}>
                    {group.created_at ? dayjs(group.created_at).format(DATE_FORMAT) : ""}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </LoadingPage>
    </Box>
  );
};
export { AuthorizationList };
