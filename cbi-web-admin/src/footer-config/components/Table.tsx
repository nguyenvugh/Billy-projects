import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { saveDataCompany } from "../reducers";
import { useNavigate } from "react-router-dom";
import { useGetListConfig } from "../hooks/useGetListConfig";
import { ROUTE_DETAIL_CONFIG } from "src/common/constants/routes.constants";
import { replacePathParams } from "src/common/lib/common.lib";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "src/common/constants/common.constant";

function TableContainer() {
  const navigate = useNavigate();
  const { data } = useGetListConfig();
  const dispatch = useDispatch();
  return (
    <Table>
      <Thead>
        <Tr
          sx={{
            ">th": {
              paddingTop: "20px",
              paddingBottom: "20px",
            },
          }}
        >
          <Th>Thông tin</Th>
          <Th>Ngày sửa gần nhất</Th>
        </Tr>
      </Thead>

      <Tbody>
        {data?.data?.map((item) => {
          const dateStr = item.updatedAt ? dayjs(item.updatedAt).format(DATE_TIME_FORMAT) : "";
          return (
            <Tr>
              <Td
                color="#2154FF"
                cursor={"pointer"}
                onClick={() => {
                  dispatch(saveDataCompany(item));
                  navigate(replacePathParams(ROUTE_DETAIL_CONFIG, { configKey: item.key }));
                }}
              >
                {item.name}
              </Td>
              <Td>{dateStr}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default TableContainer;
