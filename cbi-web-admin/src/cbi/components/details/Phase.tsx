import {
  Box,
  Button,
  Checkbox,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PlusIcon } from "src/common/assets/icons/iconPlus.svg";
import { replacePathParams } from "src/common/lib/common.lib";
import { PhaseModal } from "./PhaseModal";
import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEdit.svg";
import { ReactComponent as TrashIcon } from "src/common/assets/icons/iconTrash.svg";

function Phase() {
  const [isOpenPhaseModal, setOpenPhaseModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const negative = useNavigate();

  function handleAdd() {
    setTitleModal("Thêm giai đoạn");
    setOpenPhaseModal(true);
  }
  function handleEdit() {
    setTitleModal("Chỉnh sửa giai đoạn");
    setOpenPhaseModal(true);
  }
  return (
    <Box w="full">
      <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
        <Text variant="page-title">ĐÁNH GIÁ CEBI CHO LĨNH VỰC SẢN XUẤT LÚA GẠO</Text>
        <Stack direction="row" spacing={4}>
          <Button leftIcon={<PlusIcon />} onClick={handleAdd}>
            Thêm giai đoạn
          </Button>
        </Stack>
      </Stack>

      <Table mt="8">
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
            <Th>Giai đoạn</Th>
            <Th>Chấm điểm tự động</Th>
            <Th>Số lượng câu hỏi</Th>
            <Th>Hành động</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr onClick={() => negative(replacePathParams("", { questionId: "1" }))}>
            <Td>
              <Text color="#007BFF" fontSize="14px">
                ĐÁNH GIÁ CEBI CHO LĨNH VỰC SẢN XUẤT LÚA GẠO
              </Text>
            </Td>
            <Td>
              <Checkbox isDisabled defaultChecked />
            </Td>
            <Td>12</Td>
            <Td>
              <Flex>
                <EditIcon fill="#718096" cursor="pointer" onClick={handleEdit} />
                <Box ml="4">
                  <TrashIcon cursor="pointer" onClick={() => {}} />
                </Box>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <PhaseModal
        isOpen={isOpenPhaseModal}
        title={titleModal}
        onClose={() => setOpenPhaseModal(false)}
      />
    </Box>
  );
}

export default Phase;
