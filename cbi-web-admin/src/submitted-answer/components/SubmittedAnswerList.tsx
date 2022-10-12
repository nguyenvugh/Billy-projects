import {
  Box,
  Center,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  // useDisclosure
} from "@chakra-ui/react";
import _ from "lodash";
import React, { useState } from "react";
import { DatePicker } from "src/common/components/date-picker";
import { LoadingPage } from "src/common/components/loading-page";
import { Pagination } from "src/common/components/pagination/inedx";
import { PAGE_SIZE } from "src/common/constants/common.constant";
import { formatDate } from "src/common/utils/common.util";
import { useGetSubmittedAnswers } from "../hooks/useGetSubmittedAnswers";
import { SubmittedAnswerType } from "../interfaces";
import { InputDate } from "./InputDate";
import { ReactComponent as SearchIcon } from "src/common/assets/icons/iconSearch.svg";

const SubmittedAnswerList = ({ type, handleGoToDetail }) => {
  const [page, setPage] = useState(1);
  const [searchFinal, setSearchFinal] = useState("");
  const [searchElement, setSearchElement] = useState("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const { dataAnswer, totalPage, isLoading } = useGetSubmittedAnswers(
    {
      page,
      limit: PAGE_SIZE,
      from_date: formatDate(fromDate, "YYYY-MM-DD"),
      to_date: formatDate(toDate, "YYYY-MM-DD"),
      search: searchFinal,
    },
    type,
  );

  const onClickSearch = () => {
    if (_.isEmpty(searchElement)) return;
    setSearchFinal(searchElement);
  };

  return (
    <LoadingPage isLoading={isLoading}>
      <Box>
        <Text fontSize="24px" fontWeight="bold" mt="20px">
          {type === SubmittedAnswerType.CHECKED
            ? "Bài đánh giá đã có điểm"
            : "Bài đánh giá cần chấm điểm"}
        </Text>
        <Flex mt="19px" justify="space-between" alignItems="center">
          <InputGroup w="45%">
            <Input
              value={searchElement}
              placeholder="Nhập tên user"
              onChange={(e) => setSearchElement(e.target.value)}
              onSubmit={onClickSearch}
            />
            <InputRightElement onClick={onClickSearch}>
              <Icon as={() => <SearchIcon w="6" />} />
            </InputRightElement>
          </InputGroup>
          <Input value="Ngày thực hiện:" w="150px" />
          <Text>Từ</Text>
          <DatePicker
            error=""
            onChange={(date) => setFromDate(date)}
            selected={fromDate ? new Date(fromDate) : null}
            showTimeInput
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy"
            customInput={<InputDate />}
          />
          <Text>Đến</Text>
          <DatePicker
            error=""
            onChange={(date) => setToDate(date)}
            selected={toDate ? new Date(toDate) : null}
            showTimeInput
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy"
            customInput={<InputDate />}
          />
        </Flex>
        <Box bg="white">
          <Table mt="23px">
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
                <Th>Họ và Tên</Th>
                <Th>Email</Th>
                <Th>Bảng đánh giá</Th>
                <Th>
                  <Center>Ngày làm bài</Center>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {dataAnswer.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Text
                      onClick={
                        () => handleGoToDetail(item, item.id)
                        // navigate(
                        //   replacePathParams(
                        //     type === SubmittedAnswerType.CHECKED
                        //       ? ROUTE_SUBMITTED_ANSWER_DETAIL
                        //       : ROUTE_SUBMITTED_ANSWER_UNCHECKED_DETAIL,
                        //     {
                        //       submittedAnswerId: item.id,
                        //     },
                        //   ),
                        // )
                      }
                      style={{ color: "#007BFF", textDecoration: "underline" }}
                    >
                      {item.cbi_user.user.fullName}
                    </Text>
                  </Td>
                  <Td>{item?.cbi_user?.user?.email}</Td>
                  <Td>
                    {item?.cbi_user?.cbi?.name} - {item?.cbi_level?.name}
                  </Td>
                  <Td>
                    <Center>{formatDate(_.get(item, "created_at", ""), "DD-MM-YYYY")}</Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {totalPage > 0 && (
          <Flex mt="15px" justify="flex-end" pr="10">
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={(page) => {
                setPage(page);
              }}
            />
          </Flex>
        )}
      </Box>
    </LoadingPage>
  );
};
export { SubmittedAnswerList };
