/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { COLUMNS } from "../constant";

import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import {
  setCheckedItem,
  setIsFetching,
  setIsLoading,
  setSearch,
} from "src/level-user/reducer/level.reducer";
import { useGetLevel } from "../hooks/useGetLevel";

import { BiTrash } from "react-icons/bi";

import PaginateBottom from "src/common/components/paginate-bottom";
import PaginateTopPage from "src/common/components/paginate-top";
import TableList from "src/common/components/table-list";
import Button from "src/level-user/components/Button";
import { useGetLevels } from "../hooks/useGetLevels";
import IconButton from "./IconButton";
import ModalAddLevel from "./ModalAddLevel";
import ModalEditLevel from "./ModalEditLevel";
import ModalDelete from "src/common/components/modal-delete";
import { useDeleteAllLevels } from "../hooks/useDeleteAllLevels";
import Search from "src/common/components/search";

export const Level = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const toast = useToast();

  const dispatch = useAppDispatch();

  const checkedItemRedux = useAppSelector((state) => state.level.checkedItem);

  const instanceGetLevel = useGetLevel();
  const { mutate: mutateGetLevel } = instanceGetLevel;

  const instanceGetAllLevels = useGetLevels({ page, limit });
  const { data: dts, isLoading } = instanceGetAllLevels;
  const mapMeta = dts?.data?.meta;

  const dataListKey = dts?.data?.items?.map((item) => item.key);
  const mapLevels1 = dts?.data?.items?.map((item) => item.translates);
  const mapLevels2 = mapLevels1?.map((item) => item);
  const mapLevels3 = mapLevels2?.flat(1);

  const searchRedux = useAppSelector((state) => state.level.search);

  const instanceMultiple = useSelectMultiple(dataListKey, page, selectedItemIds);
  const { selectedIds, reset } = instanceMultiple;

  const columns = useMemo(() => COLUMNS, []);
  const dataApi = mapLevels3;

  const instanceTable = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, hiddenColumns: ["id"] },
    },
    useGlobalFilter,
    usePagination
  );

  const { pageOptions, setPageSize } = instanceTable;

  const {
    isOpen: isOpenAddLevel,
    onOpen: onOpenAddLevel,
    onClose: onCloseAddLevel,
  } = useDisclosure();

  const {
    isOpen: isOpenEditLevel,
    onOpen: onOpenEditLevel,
    onClose: onCloseEditLevel,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteLevel,
    onOpen: onOpenDeleteLevel,
    onClose: onCloseDeleteLevel,
  } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isLoading]);

  useEffect(() => {
    setSelectedItemIds(selectedIds);
    if (selectedIds.length >= 1) {
      dispatch(setCheckedItem(true));
    } else {
      dispatch(setCheckedItem(false));
    }
  }, [selectedIds]);

  // useEffect(() => {
  //   if (checkedItemRedux) {
  //     mutateGetLevel(selectedIds);
  //   }
  // }, [checkedItemRedux]);

  const handleEditLevel = async (selectedIds) => {
    await mutateGetLevel(selectedIds);
    onOpenEditLevel();
  };

  useEffect(() => {
    if (dataApi) {
      const dataTrans = dataApi.map((item) => {
        return {
          ...item,
          id: item.levelKey,
        };
      });
      setData(dataTrans);
    } else {
      setData([]);
    }
  }, [dts]);

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems={{ sm: "flex-start", lg: "center" }}
        flexDirection={{ sm: "column-reverse", lg: "row" }}
        mt="15px"
        columnGap="50px"
        rowGap="20px"
      >
        <Flex gap="7px">
          <Button
            label="Add new"
            onClick={() => {
              onOpenAddLevel();
              reset();
            }}
          />
        </Flex>
        <Search
          instanceTable={instanceTable}
          instanceMultiple={instanceMultiple}
          instanceGetAll={instanceGetAllLevels}
          setSearch={setSearch}
          searchRedux={searchRedux}
        />
      </Flex>
      <Flex justifyContent="space-between" mt="16px">
        <PaginateTopPage
          meta={mapMeta}
          setPage={setPage}
          setPageSize={setPageSize}
          setLimit={setLimit}
          namePage="level"
        />
        <Box
          display="flex"
          alignItems="end"
          flexDirection={{ sm: "column-reverse", md: "row", lg: "row" }}
          rowGap="10px"
        >
          <Box>
            {checkedItemRedux && (
              <IconButton
                {...IconButtonStyle}
                title="Delete"
                aria-label="Delete a level"
                icon={<BiTrash />}
                onClick={onOpenDeleteLevel}
              />
            )}
          </Box>
        </Box>
      </Flex>
      <TableList
        instanceTable={instanceTable}
        instanceMultiple={instanceMultiple}
        instanceGetAll={instanceGetAllLevels}
        onOpenDelete={onOpenDeleteLevel}
        setSelectedItemIds={setSelectedItemIds}
        handleEdit={handleEditLevel}
      />
      {pageOptions.length > 0 && (
        <Box mt="20px">
          <PaginateBottom meta={mapMeta} setPage={setPage} />
        </Box>
      )}
      <ModalAddLevel
        isOpenAddLevel={isOpenAddLevel}
        onCloseAddLevel={onCloseAddLevel}
        instanceGetAllLevels={instanceGetAllLevels}
        instanceMultiple={instanceMultiple}
      />
      <ModalEditLevel
        isOpenEditLevel={isOpenEditLevel}
        onCloseEditLevel={onCloseEditLevel}
        instanceGetLevel={instanceGetLevel}
        instanceGetAllLevels={instanceGetAllLevels}
        instanceMultiple={instanceMultiple}
      />

      <ModalDelete
        isOpenDelete={isOpenDeleteLevel}
        onCloseDelete={onCloseDeleteLevel}
        instanceGet={instanceGetAllLevels}
        instanceMultiple={instanceMultiple}
        selectedItemIds={selectedItemIds}
        useDelete={useDeleteAllLevels}
        nameModal={"level"}
      />
    </Box>
  );
};

const IconButtonStyle = {
  width: "35px",
  height: "35px",
  marginLeft: "10px",
};
