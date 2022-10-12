import { DeleteIcon } from "src/common/assets/icons/delete";
import { EditIcon } from "src/common/assets/icons/edit";
import { TableListType } from "src/topic/interface";
import { setIsChecked, setSelectedItemIds } from "src/topic/reducer/topic.reducer";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import {
  Box,
  Checkbox,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TableList = ({
  instanceTable,
  instanceGetTopic,
  instanceGetAllTopics,
  instanceMultiple,
  onOpenDeleteTopic,
  onOpenEditTopic,
}: TableListType) => {
  const dispatch = useAppDispatch();
  const checkedItemAllRedux = useAppSelector((state) => state.topic.checkedItemAll);
  const isLoadingRedux = useAppSelector((state) => state.topic.isLoading);

  const { mutate: mutateGetTopic } = instanceGetTopic;
  const { error } = instanceGetAllTopics;

  const { isCheckedAll, handleCheckAll, handleSelectItem, selectedIds } =
    instanceMultiple;

  const {
    pageOptions,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = instanceTable;

  return (
    <Box mt="16px">
      <Table {...getTableProps()}>
        <Thead bg="background.senary" h="36px">
          {headerGroups.map((headerGroup, i) => (
            <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
              <Th {...TextStyle}>
                <Checkbox
                  isChecked={isCheckedAll || checkedItemAllRedux}
                  disabled={!!(pageOptions?.length === 0 && !isLoadingRedux)}
                  onChange={(e) => {
                    handleCheckAll(e.target.checked);
                    dispatch(setIsChecked(e.target.checked));
                  }}
                />
              </Th>
              {headerGroup.headers.map((column, i) => (
                <Th key={i} {...TextStyle} {...column.getHeaderProps()}>
                  <Text {...TextAlignStyle}>{column.render("Header")}</Text>
                </Th>
              ))}
              <Th {...TextStyle}>
                <Text {...TextAlignStyle}>Actions</Text>
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            const isCheckedId = selectedIds.includes(row.values.topicKey);
            return (
              <Tr key={i} {...row.getRowProps()}>
                <Td {...TextStyle}>
                  <Checkbox
                    isChecked={isCheckedId}
                    onChange={(e) => {
                      handleSelectItem(row.values.topicKey, e.target.checked);
                      dispatch(setIsChecked(e.target.checked));
                    }}
                  />
                </Td>
                {row.cells.map((cell, i) => {
                  if (cell.column?.Header === "Image") {
                    return (
                      <Td
                        key={i}
                        {...TextStyle}
                        alignItems="center"
                        {...cell.getCellProps()}
                      >
                        <Image src={cell.value} w="100px" />
                      </Td>
                    );
                  }
                  return (
                    <Td key={i} {...TextStyle} {...cell.getCellProps()}>
                      <Text {...TextAlignStyle}>{cell.render("Cell")}</Text>
                    </Td>
                  );
                })}
                <Td {...TextStyle} {...TextAlignStyle}>
                  <DeleteIcon
                    {...IconStyle}
                    {...DeleteIconStyle}
                    onClick={() => {
                      mutateGetTopic(row.original.topicKey.toLocaleLowerCase());
                      dispatch(setSelectedItemIds([row.original.topicKey]));
                      onOpenDeleteTopic();
                    }}
                  />
                  <EditIcon
                    {...IconStyle}
                    {...EditIconStyle}
                    onClick={() => {
                      mutateGetTopic([row.original.topicKey.toLocaleLowerCase()]);
                      onOpenEditTopic();
                    }}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box {...TextAlignStyle} mt="15px">
        {isLoadingRedux ? <Text>Loading...</Text> : ""}
        {pageOptions?.length === 0 && !isLoadingRedux && !error ? (
          <Text>Empty Data!!!</Text>
        ) : (
          ""
        )}
        {error ? <Text>Connection error!!!</Text> : ""}
      </Box>
    </Box>
  );
};

export default TableList;

const TextStyle: any = {
  color: "text.primary",
  wordbreak: "break-all",
  borderColor: "transparent",
  textTransform: "capitalize",
};

const TextAlignStyle: any = {
  textAlign: "center",
};

const IconStyle = {
  cursor: "pointer",
  margin: "5px",
};

const DeleteIconStyle = {
  stroke: "#DC3545",
  boxSize: "5",
};

const EditIconStyle = {
  fill: "#216BCD",
  boxSize: "5",
};
