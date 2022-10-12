import { DeleteIcon } from "src/common/assets/icons/delete";
import { EditIcon } from "src/common/assets/icons/edit";
import { TableListType } from "src/podcast/interface";
import { setIsChecked, setSelectedItemIds } from "src/podcast/reducer/podcast.reducer";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { Box, Checkbox, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const TableList = ({
  instanceTable,
  instanceGetPodcast,
  instanceGetAllPodcasts,
  instanceMultiple,
  onOpenDeletePodcast,
  onOpenEditPodcast,
}: TableListType) => {
  const dispatch = useAppDispatch();
  const checkedItemAllRedux = useAppSelector((state) => state.podcast.checkedItemAll);
  const isLoadingRedux = useAppSelector((state) => state.podcast.isLoading);

  const { mutate: mutateGetPodcast } = instanceGetPodcast;
  const { error } = instanceGetAllPodcasts;

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
            const isCheckedId = selectedIds.includes(row.values.id);
            return (
              <Tr key={i} {...row.getRowProps()}>
                <Td {...TextStyle}>
                  <Checkbox
                    isChecked={isCheckedId}
                    onChange={(e) => {
                      handleSelectItem(row.values.id, e.target.checked);
                      dispatch(setIsChecked(e.target.checked));
                    }}
                  />
                </Td>
                {row.cells.map((cell, i) => {
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
                      mutateGetPodcast(row.original.id);
                      dispatch(setSelectedItemIds([row.original.id]));
                      onOpenDeletePodcast();
                    }}
                  />
                  <EditIcon
                    {...IconStyle}
                    {...EditIconStyle}
                    onClick={() => {
                      mutateGetPodcast([row.original.id]);
                      onOpenEditPodcast();
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
