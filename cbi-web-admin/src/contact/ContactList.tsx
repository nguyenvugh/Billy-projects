import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { ROUTE_DETAIL_CONTACT } from "src/common/constants/routes.constants";
import { useDispatch } from "react-redux";
import { getDetailAction, getListContactAction } from "./reducers";
import { Pagination } from "src/common/components/pagination/inedx";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { ContactI, ListContactI } from "./interfaces";
import { Limit } from "./contstants";
import Lodash from "lodash";
import { formatDate } from "src/common/utils/common.util";
import { deleteContactService } from "./services";
const ContactList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [listSelect, setListSelect] = useState<ListContactI>([]);

  const listContact = useAppSelector((state) => state.contactReducer.listContact);
  const totalContact = useAppSelector((state) => state.contactReducer.total);

  useEffect(() => {
    getListContact();
  }, [pageNumber]);

  const getListContact = () => {
    dispatch(getListContactAction({ page: pageNumber, limit: Limit }));
  };

  const handleSelectRow = (row: ContactI) => {
    if (isSelected(row)) {
      const newSelectedRows = listContact.filter((_item: ContactI) => _item.id !== row.id);
      setListSelect(newSelectedRows);
    } else {
      setListSelect([...listSelect, row]);
    }
  };

  const isSelected = (row: ContactI) => {
    return Lodash.find(listSelect, { id: row.id }) !== undefined;
  };

  const handleSelectAllClick = () => {
    if (listSelect.length === listContact.length) {
      setListSelect([]);
    } else {
      setListSelect(listContact);
    }
  };

  const handleDeleteContact = () => {
    let idContact = "";
    listSelect.forEach((e: ContactI) => {
      idContact += "_" + e.id;
    });
    deleteContactService({ ids: idContact.split("_").filter((e: string) => e) }).then(() => {
      getListContact();
      onClose();
    });
  };
  return (
    <Box>
      <Flex alignItems="flex-end" justifyContent={"space-between"}>
        <Text fontSize="18px" fontWeight="bold" mt="20px" w={"200px"}>
          Danh s??ch li??n h???
        </Text>
        <Flex>
          <Button bg="red.primary" onClick={() => onOpen()}>
            Xo?? ???? ch???n
          </Button>
          <ConfirmModal
            title="X??A LI??N H???"
            content="B???n c?? ch???c mu???n x??a th??ng tin li??n h??? ???? ch???n?"
            onCancel={onClose}
            onDelete={handleDeleteContact}
            isOpen={isOpen}
          />
        </Flex>
      </Flex>
      <Table mt="23px">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={listSelect.length === listContact.length && !!listSelect.length}
                onChange={() => {
                  handleSelectAllClick();
                }}
              />
            </Th>
            <Th>H??? v?? t??n</Th>
            <Th>S??? ??i???n tho???i</Th>
            <Th>Email</Th>
            <Th>N???i dung</Th>
            <Th>Ng??y gi??? g???i</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!!listContact.length &&
            listContact.map((element: ContactI, index) => {
              return (
                <Tr key={index} cursor="pointer">
                  <Td>
                    <Checkbox
                      isChecked={listSelect.some((e: ContactI) => e.id === element.id)}
                      onChange={() => {
                        handleSelectRow(element);
                      }}
                    />
                  </Td>
                  <Td
                    color="#2154FF"
                    cursor="pointer"
                    onClick={() => {
                      dispatch(getDetailAction(element));
                      navigate(ROUTE_DETAIL_CONTACT);
                    }}
                  >
                    {element.name}
                  </Td>
                  <Td>{element.phone}</Td>
                  <Td>{element.email}</Td>
                  <Td>{element.content}</Td>
                  <Td>{formatDate(element.createdAt)}</Td>
                </Tr>
              );
            })}
        </Tbody>
        <Tfoot position="relative" h="80px">
          <Box position="absolute" mt="5" right="5">
            <Pagination
              currentPage={pageNumber}
              totalPages={Math.ceil(totalContact / Limit || 1)}
              onPageChange={setPageNumber}
            />
          </Box>
        </Tfoot>
      </Table>
    </Box>
  );
};
export { ContactList };
