import {
  Box,
  Center,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDeleteQuizGroup } from "src/cbi/hooks/useDeleteQuizGroup";
import { useDetailQuizGroup } from "src/cbi/hooks/useDetailQuizGroup";
import { QuizGroup } from "src/cbi/interfaces";
// import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEditV2.svg";
// import { ReactComponent as TrashIcon } from "src/common/assets/icons/iconTrash.svg";
import { ReactComponent as CheckedIcon } from "src/common/assets/icons/iconChecked.svg";
import { ReactComponent as UncheckedIcon } from "src/common/assets/icons/iconUnchecked.svg";
import { ConfirmModalV2 } from "src/common/components/confirm-modal/ConfirmModalV2";
import { Pagination } from "src/common/components/pagination/inedx";
import { ROUTE_QUESTIONS_DETAILS_LEVEL } from "src/common/constants/routes.constants";
import { useToast } from "src/common/hooks/useToast";
import { Params } from "src/common/interfaces/common.interface";
import { replacePathParams } from "src/common/lib/common.lib";
import { useImmer } from "use-immer";
import { CbiModal } from "./CbiModal";

export interface LocationState {
  groupName: string;
}

function CBIQuizTable({
  quizGroupListParams,
  handleUpdateParams,
}: {
  quizGroupListParams: Params;
  handleUpdateParams: (newParams: Params) => void;
}) {
  const search = useParams();
  const toast = useToast();
  const location = useLocation();
  const state = location.state as LocationState;
  const { data } = useDetailQuizGroup(search?.questionId || "", quizGroupListParams);
  const { results, total } = data?.data || { results: [], total: 0 };
  const totalPages = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  const [page, setPage] = useState(1);
  const {
    isOpen,
    // onOpen,
    onClose,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    // onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [
    editItem,
    // setEditItem
  ] = useImmer<QuizGroup | undefined>(undefined);
  const [idDelete, setIdDelete] = useState<string>("");

  const deleteQuizGroup = useDeleteQuizGroup();

  const handleConfirmDelete = () => {
    deleteQuizGroup.mutate(
      { id: search?.questionId || "", level_id: idDelete },
      {
        onSuccess: () => {
          onCloseDelete();
          deleteQuizGroup.invalidate();
          toast({
            position: "top",
            title: "Xoá thành công!",
          });
          setIdDelete("");
        },
        onError: (err: any) => {
          onCloseDelete();
          toast({
            position: "top",
            title: err.data?.message,
            status: "error",
          });
          setIdDelete("");
        },
      },
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    setPage(quizGroupListParams.page || 1);
  }, [quizGroupListParams.page]);
  return (
    <Table>
      <Thead
        bg="#EBEFF2"
        sx={{
          th: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#2D3748",
          },
        }}
      >
        <Tr>
          <Th w="50%">Giai đoạn</Th>
          <Th>
            <Center>Chấm điểm tự động</Center>
          </Th>
          <Th>
            <Center>Số lượng câu hỏi</Center>
          </Th>
          {/* <Th>Hành động</Th> */}
        </Tr>
      </Thead>

      <Tbody>
        {results.map((item) => (
          <Tr key={item?.id}>
            <Td
              color="#007BFF"
              fontSize="14px"
              onClick={() =>
                navigate(
                  replacePathParams(ROUTE_QUESTIONS_DETAILS_LEVEL, {
                    questionId: search?.questionId,
                    level: item?.id,
                  }),
                  {
                    state: {
                      groupName: state.groupName,
                      levelName: item.name,
                      auto_calculate_score: item?.auto_calculate_score,
                    },
                  },
                )
              }
            >
              {item?.name}
            </Td>
            <Td>
              <Center>
                {item?.auto_calculate_score === 1 ? (
                  <CheckedIcon fill="#979797" cursor="pointer" />
                ) : (
                  <UncheckedIcon fill="#979797" cursor="pointer" />
                )}
              </Center>
            </Td>
            <Td>
              <Center>{item?.total_questions}</Center>
            </Td>
            {/* <Td>
              <Flex>
                <Box mr="5">
                  <EditIcon
                    fill="#979797"
                    cursor="pointer"
                    onClick={() => {
                      onOpen();
                      setEditItem(item);
                    }}
                  />
                </Box>
                <Box>
                  <TrashIcon
                    fill="#979797"
                    cursor="pointer"
                    onClick={() => {
                      setIdDelete(item?.id);
                      onOpenDelete();
                    }}
                  />
                </Box>
              </Flex>
            </Td> */}
          </Tr>
        ))}
      </Tbody>
      <Tfoot position="relative" h="80px">
        <Box position="absolute" mt="5" right="5">
          {!!totalPages && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => {
                handleUpdateParams({ page });
                setPage(page);
              }}
            />
          )}
        </Box>
      </Tfoot>
      {isOpen && (
        <CbiModal
          title="Sửa thông tin"
          editItem={editItem}
          isOpen={isOpen}
          onClose={onClose}
          onSave={() => {}}
        />
      )}
      <ConfirmModalV2
        title="Thông báo"
        content="Bạn có chắc chắn muốn xóa giai đoạn này?"
        cancelText="Thoát"
        okText="Đồng ý"
        isOpen={isOpenDelete}
        onCancel={onCloseDelete}
        onOk={handleConfirmDelete}
      />
    </Table>
  );
}

export { CBIQuizTable };
