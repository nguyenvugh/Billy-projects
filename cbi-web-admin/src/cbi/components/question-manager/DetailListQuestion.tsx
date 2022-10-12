import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEdit.svg";
import { ReactComponent as TrashIcon } from "src/common/assets/icons/iconTrash.svg";

function DetailListQuestion() {
  return (
    <Table>
      <Thead
        bg="#EBEFF2"
        sx={{
          "th, td": {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#2D3748",
          },
        }}
      >
        <Tr>
          <Th>Câu hỏi</Th>
          <Th>Đáp án</Th>
          <Th>Số điểm</Th>
          <Th>Hành động</Th>
        </Tr>
      </Thead>

      <Tbody>
        <Tr>
          <Td>
            <Text color="#2D3748" fontSize="16px">
              Anh/chị có thể thấy được được các rủi ro do khí thải nhà kính và/hoặc cơ hội nhờ giảm
              khí thải nhà kính trong vận hành doanh nghiệp không?
            </Text>
          </Td>
          <Td>{/* <Checkbox isDisabled defaultChecked /> */}</Td>
          <Td fontSize="24px" fontWeight="600">
            1,25
          </Td>
          <Td>
            <Flex>
              <EditIcon fill="#718096" cursor="pointer" />
              <Box ml="4">
                <TrashIcon cursor="pointer" onClick={() => {}} />
              </Box>
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export { DetailListQuestion };
