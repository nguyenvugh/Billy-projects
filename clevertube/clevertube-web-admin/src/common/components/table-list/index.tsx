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
import { Link } from "react-router-dom";
import { DeleteIcon } from "src/common/assets/icons/delete";
import { EditIcon } from "src/common/assets/icons/edit";
import "./table.css";

const TableList = ({
  instanceTable,
  instanceGetAll,
  instanceMultiple,
  onOpenDelete,
  setSelectedItemIds,
  handleEdit,
}: {
  instanceTable?: any;
  instanceGetAll?: any;
  instanceMultiple?: any;
  onOpenDelete?: any;
  setSelectedItemIds?: any;
  handleEdit?: any;
}) => {
  // const checkedItemAllRedux = useAppSelector((state) => state.podcast.checkedItemAll);
  // const isLoadingRedux = useAppSelector((state) => state.podcast.isLoading);

  const { error } = instanceGetAll;

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
      <Table {...getTableProps()} size="sm" className="table-tiny">
        <Thead bg="background.senary" h="36px">
          {headerGroups.map((headerGroup, i) => (
            <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
              <Th {...TextStyle}>
                <Checkbox
                  isChecked={isCheckedAll}
                  disabled={!!(pageOptions?.length === 0)}
                  onChange={(e) => {
                    handleCheckAll(e.target.checked);
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
                    }}
                  />
                </Td>
                {row.cells.map((cell, i) => {
                  if (cell.column.id === "nameThumbnail") {
                    return (
                      <Td key={i} {...TextStyle} {...cell.getCellProps()}>
                        <Image src={cell.value} />
                      </Td>
                    );
                  }
                  return (
                    <Td key={i} {...TextStyle} {...cell.getCellProps()}>
                      <Text noOfLines={1} {...TextAlignStyle}>
                        {cell.value}
                      </Text>
                    </Td>
                  );
                })}
                <Td {...TextStyle} {...TextAlignStyle}>
                  <DeleteIcon
                    {...IconStyle}
                    {...DeleteIconStyle}
                    onClick={() => {
                      setSelectedItemIds([row.original.id]);
                      onOpenDelete();
                    }}
                  />
                  {handleEdit ? (
                    <Box
                      display="inline-block"
                      onClick={() => {
                        handleEdit(row.values.id);
                      }}
                    >
                      <EditIcon {...IconStyle} {...EditIconStyle} />
                    </Box>
                  ) : (
                    <Link to={`/video/details/${row.values.id}`}>
                      <EditIcon {...IconStyle} {...EditIconStyle} />
                    </Link>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box {...TextAlignStyle} mt="15px">
        {/* {isLoadingRedux ? <Text>Loading...</Text> : ""} */}
        {pageOptions?.length === 0 && !error ? <Text>Empty Data!!!</Text> : ""}
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
  //   textTransform: "capitalize",
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
