import {
  Box,
  Button,
  Checkbox,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
// import produce from "immer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination } from "src/common/components/pagination/inedx";
import { PAGE_SIZE } from "src/common/constants/common.constant";
import { ROUTE_ADD_NEW_ACCOUNT, ROUTE_DETAIL_ACCOUNT } from "src/common/constants/routes.constants";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { replacePathParams, toTotalPage } from "src/common/lib/common.lib";
import { ConfirmModal } from "../../common/components/confirm-modal/ConfirmModal";
import { useDeleteMultipleAdmin } from "../hooks/useDeleteMultipleAdmin";
import { useGetDataAdminList } from "../hooks/useGetDataAdminList";
import { getAdminId } from "../reducer";
import { formatDate } from "src/common/utils/common.util";
import { useEditInfoAdmin } from "../hooks/useEditInfoAdmin";

const ListAccount = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useDeleteMultipleAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetDataAdminList(currentPage, PAGE_SIZE);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accountIds = data?.data?.results.map((account) => account.id);
  const { handleCheckAll, handleSelectItem, isCheckedAll, reset, selectedIds } = useSelectMultiple(
    accountIds,
    currentPage,
  );
  const { mutate: editStatusAdminList } = useEditInfoAdmin();
  let changeStatus = {};

  const handleDeleteMultiple = () => {
    setCurrentPage(1);
    mutate(
      {
        ids: selectedIds,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
    onClose();
  };
  const handleChangeStatus = (e, element) => {
    changeStatus = {
      userName: element.username,
      status: e.target.value,
      groupPolicyKey: element.groupPoliciesKey,
    };
    editStatusAdminList({
      id: element.id,
      newData: changeStatus,
    });
  };
  const isDisabled: boolean = true;
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="18px" fontWeight="bold" mt="20px" ml="24px">
          Danh s??ch t??i kho???n
        </Text>
        <Box>
          <Button w="119px" onClick={() => navigate(ROUTE_ADD_NEW_ACCOUNT)}>
            Th??m m???i
          </Button>
          <Button
            ml="16px"
            w="119px"
            bg="red.primary"
            isDisabled={selectedIds.length > 0 ? !isDisabled : isDisabled}
            onClick={onOpen}
          >
            Xo?? ???? ch???n
          </Button>
        </Box>
        <ConfirmModal
          onCancel={onClose}
          onDelete={handleDeleteMultiple}
          isOpen={isOpen}
          title="X??A T??I KHO???N"
          content="B???n c?? ch???c mu???n x??a nh???ng t???i kho???n ???? ch???n?"
        />
      </Flex>
      <Table mt="23px">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={isCheckedAll}
                onChange={(e) => handleCheckAll(e.target.checked)}
              />
            </Th>
            <Th>T??n ????ng nh???p</Th>
            <Th>T??n nh??m</Th>
            <Th>Tr???ng th??i</Th>
            <Th>Ng??y t???o</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data?.results.reverse()?.map((element, index) => {
            const isChecked = selectedIds.includes(element.id);
            return (
              <Tr key={index}>
                <Td>
                  <Checkbox
                    isChecked={isChecked}
                    onChange={(e) => {
                      handleSelectItem(element.id, e.target.checked);
                    }}
                  />
                </Td>
                <Td
                  cursor="pointer"
                  onClick={() => {
                    navigate(replacePathParams(ROUTE_DETAIL_ACCOUNT, { adminId: element.id }));
                    dispatch(getAdminId(element.id));
                  }}
                  color="#1A43CC"
                >
                  {element.username}
                </Td>
                <Td>{element.groupPoliciesKey}</Td>
                <Select
                  onChange={(e) => handleChangeStatus(e, element)}
                  defaultValue={element.status}
                  mt="5px"
                  w="150px"
                >
                  <option value={"ACTIVE"}>ACTIVE</option>
                  <option value={"INACTIVE"}>INACTIVE</option>
                </Select>
                <Td>{formatDate(element.createdAt, "DD/MM/YYYY")}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="flex-end" mt="15px">
        {data?.data?.total > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={toTotalPage(data?.data?.total || 1)}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}
      </Box>
    </Box>
  );
};
export { ListAccount };
