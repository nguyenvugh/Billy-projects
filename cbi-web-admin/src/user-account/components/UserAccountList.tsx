import {
  Box,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "src/common/components/loading-page";
import { Pagination } from "src/common/components/pagination/inedx";
import { Select } from "src/common/components/select/index";
import { SEARCH_DEBOUNCE_TIME } from "src/common/constants/common.constant";
import { ROUTE_USER_ACCOUNT_DETAIL } from "src/common/constants/routes.constants";
import { replacePathParams } from "src/common/lib/common.lib";
import { OpenAccount } from "src/user-account/modals/OpenAccount";
import { ACCOUNT_STATUS_OPTIONS, DEFAULT_PARAMS_GET_USER_ACC, STATUS } from "../constants";
import { useGetUserAccount } from "../hooks/useGetUserAccount";
import { LockAccount } from "../modals/LockAccount";

const UserAccountList = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [displayMore, setDisplayMore] = useState(false);
  const navigate = useNavigate();
  const { isOpen: isOpenAccount, onOpen: openAccount, onClose: closeOpenAccount } = useDisclosure();
  const {
    isOpen: isOpenLockAccount,
    onOpen: openLockAccount,
    onClose: closeLockAccount,
  } = useDisclosure();
  const [getUserAccParams, setUserAccParams] = useState(DEFAULT_PARAMS_GET_USER_ACC);

  const { data, isLoading } = useGetUserAccount(getUserAccParams);
  const userAccounts = data?.data?.results || [];
  const totalPages = data?.data?.totalPage || 0;

  const handleSearchInput = debounce((searchText) => {
    setUserAccParams({ ...getUserAccParams, searchText });
  }, SEARCH_DEBOUNCE_TIME);

  function redirectToAccountDetail(userId: string) {
    navigate(replacePathParams(ROUTE_USER_ACCOUNT_DETAIL, { userId }));
  }
  return (
    <Box>
      <Text variant="page-title">Tài khoản người dùng</Text>
      <Flex mt="19px">
        <Input
          placeholder="Tên, email, số điện thoại người dùng"
          w="300px"
          onChange={(e) => handleSearchInput(e.target.value)}
        />
        <Select
          w="220px"
          ml="37px"
          options={ACCOUNT_STATUS_OPTIONS}
          onChange={(e) => {
            setUserAccParams({ ...getUserAccParams, status: e.target.value });
          }}
        />
      </Flex>
      <LoadingPage isLoading={isLoading}>
        <Box bg="white" paddingBottom="30px">
          <Table mt="23px">
            <Thead>
              <Tr>
                <Th>Tên người dùng</Th>
                <Th>Email người dùng</Th>
                <Th>Số điện thoại</Th>
                <Th>Trạng thái</Th>
                <Th>Thiết lập</Th>
              </Tr>
            </Thead>

            <Tbody>
              {userAccounts.map((user, index) => {
                return (
                  <Tr key={index} cursor="pointer">
                    <Td cursor="pointer" onClick={() => redirectToAccountDetail(user.id)}>
                      <Text variant="text-ellipsis" maxW="200px">
                        {user.fullName}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        variant="text-ellipsis"
                        maxW="200px"
                        onClick={() => redirectToAccountDetail(user.id)}
                      >
                        {user.email}
                      </Text>
                    </Td>
                    <Td onClick={() => redirectToAccountDetail(user.id)}>{user.phoneNumber}</Td>
                    <Td
                      color={STATUS[user.status].color}
                      onClick={() => redirectToAccountDetail(user.id)}
                    >
                      {STATUS[user.status].label}
                    </Td>
                    <Td>
                      <Menu placement="bottom">
                        <MenuButton>
                          <Icon
                            as={FiMoreVertical}
                            onClick={() => setDisplayMore(!displayMore)}
                            cursor="pointer"
                          />
                        </MenuButton>

                        <MenuList minW="unset">
                          <MenuItem
                            onClick={() => {
                              setSelectedUserId(user.id);
                              openLockAccount();
                            }}
                          >
                            Khoá tài khoản
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSelectedUserId(user.id);
                              openAccount();
                            }}
                          >
                            Mở tài khoản
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <LockAccount
              userId={selectedUserId}
              title="Khoá tài khoản"
              content="Lý do khoá"
              isOpen={isOpenLockAccount}
              onDelete={closeLockAccount}
              onCancel={closeLockAccount}
            />
            <OpenAccount
              userId={selectedUserId}
              onCancel={closeOpenAccount}
              isOpen={isOpenAccount}
              content="Bạn có chắc muốn mở lại tài khoản đã chọn?"
              title="MỞ TÀI KHOẢN"
            />
          </Table>
          {totalPages > 0 && (
            <Box display="flex" justifyContent="flex-end" mt="15px">
              <Pagination
                currentPage={getUserAccParams.page || 0}
                totalPages={totalPages}
                onPageChange={(page) => setUserAccParams({ ...getUserAccParams, page })}
              />
            </Box>
          )}
        </Box>
      </LoadingPage>
    </Box>
  );
};
export { UserAccountList };
