import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { COLUMNS } from "src/topic/constant";

import { BiTrash } from "react-icons/bi";

import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import {
  setCheckedItem,
  // setIsFetching,
  setIsLoading,
  setLimit as setLimitRedux,
  setPage as setPageRedux,
  setSearch,
  setSelectedItemIds,
} from "src/topic/reducer/topic.reducer";
import { useGetAllTopics } from "../hooks/useGetAllTopics";
import { useGetTopic } from "../hooks/useGetTopic";

import { useAppSelector } from "src/common/hooks/useAppSelector";
import Button from "src/topic/components/Button";
import PaginateBottom from "src/topic/components/PaginateBottom";
import PaginateTop from "src/topic/components/PaginateTop";
import IconButton from "./IconButton";
import ModalAddTopic from "./ModalAddTopic";
import ModalDeleteAllTopics from "./ModalDeleteAllTopics";
import ModalDeleteTopic from "./ModalDeleteTopic";
import ModalEditTopic from "./ModalEditTopic";
import TableList from "./TableList";
import Search from "src/common/components/search";

export const Topic = () => {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useAppDispatch();
  const selectedItemIds = useAppSelector((state) => state.topic.selectedItemIds);

  const searchRedux = useAppSelector((state) => state.topic.search);

  const instanceGetTopic = useGetTopic();

  const instanceGetAllTopics = useGetAllTopics(page, limit);
  const { data: dtTopics, isLoading, refetch } = instanceGetAllTopics;

  const mapMetaTopics = dtTopics?.data?.meta;
  const mapDtTopics = dtTopics?.data?.items;

  const listIds = mapDtTopics?.map((item) => item?.key);
  const mapTopics1 = mapDtTopics?.map((item) => {
    console.log(item?.translates);
    return [{ ...item?.translates[0], image: item?.image?.url }];
  });
  const mapTopics2 = mapTopics1?.map((item) => item);
  const mapTopics3 = mapTopics2?.flat(1);

  const instanceMultiple = useSelectMultiple(listIds, page, selectedItemIds);
  const { selectedIds, reset } = instanceMultiple;

  const columns = useMemo(() => COLUMNS, []);
  const dataApi = mapTopics3;

  const instanceTable = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { pageOptions, setPageSize } = instanceTable;

  const {
    isOpen: isOpenAddTopic,
    onOpen: onOpenAddTopic,
    onClose: onCloseAddTopic,
  } = useDisclosure();

  const {
    isOpen: isOpenEditTopic,
    onOpen: onOpenEditTopic,
    onClose: onCloseEditTopic,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteTopic,
    onOpen: onOpenDeleteTopic,
    onClose: onCloseDeleteTopic,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteAllTopics,
    onOpen: onOpenDeleteAllTopics,
    onClose: onCloseDeleteAllTopics,
  } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isLoading]);

  // useEffect(() => {
  //   if (isFetching) {
  //     dispatch(setIsFetching(true));
  //   } else {
  //     dispatch(setIsFetching(false));
  //   }
  //   // reset();
  //   handleCheckAll(false);
  //   // dispatch(setSelectedItemIds(selectedIds));
  // }, [isFetching]);

  useEffect(() => {
    if (selectedIds.length === 1) {
      dispatch(setCheckedItem(true));
    } else {
      dispatch(setCheckedItem(false));
    }
  }, [selectedIds]);

  useEffect(() => {
    dispatch(setSelectedItemIds(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    dispatch(setPageRedux(page));
  }, [page]);

  useEffect(() => {
    dispatch(setLimitRedux(limit));
  }, [limit]);

  useEffect(() => {
    if (page || limit) {
      refetch();
    }
  }, [page, limit]);

  useEffect(() => {
    if (dataApi) {
      setData(dataApi);
    } else {
      setData([]);
    }
  }, [dtTopics, setData]);

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
              onOpenAddTopic();
              reset();
            }}
          />
        </Flex>
        <Search
          instanceTable={instanceTable}
          instanceMultiple={instanceMultiple}
          instanceGetAll={instanceGetAllTopics}
          setSearch={setSearch}
          searchRedux={searchRedux}
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt="16px">
        <PaginateTop
          meta={mapMetaTopics}
          setPage={setPage}
          setPageSize={setPageSize}
          setLimit={setLimit}
        />
        <Box display="flex" alignItems="center">
          <Box>
            {selectedIds.length >= 1 && (
              <IconButton
                {...IconButtonStyle}
                title="Delete All"
                aria-label="Delete all topic"
                icon={<BiTrash />}
                onClick={onOpenDeleteAllTopics}
              />
            )}
          </Box>
        </Box>
      </Flex>
      <Box>
        <TableList
          instanceTable={instanceTable}
          instanceGetTopic={instanceGetTopic}
          instanceGetAllTopics={instanceGetAllTopics}
          instanceMultiple={instanceMultiple}
          onOpenDeleteTopic={onOpenDeleteTopic}
          onOpenEditTopic={onOpenEditTopic}
        />
      </Box>
      {pageOptions?.length > 0 ? (
        <Box mt="15px">
          <PaginateBottom meta={mapMetaTopics} setPage={setPage} />
        </Box>
      ) : (
        ""
      )}
      <ModalAddTopic
        isOpenAddTopic={isOpenAddTopic}
        onCloseAddTopic={onCloseAddTopic}
        instanceGetAllTopics={instanceGetAllTopics}
        instanceMultiple={instanceMultiple}
      />
      <ModalEditTopic
        isOpenEditTopic={isOpenEditTopic}
        onCloseEditTopic={onCloseEditTopic}
        instanceGetTopic={instanceGetTopic}
        instanceGetAllTopics={instanceGetAllTopics}
        instanceMultiple={instanceMultiple}
      />
      <ModalDeleteTopic
        isOpenDeleteTopic={isOpenDeleteTopic}
        onCloseDeleteTopic={onCloseDeleteTopic}
        instanceGetAllTopics={instanceGetAllTopics}
        instanceMultiple={instanceMultiple}
      />
      <ModalDeleteAllTopics
        isOpenDeleteAllTopics={isOpenDeleteAllTopics}
        onCloseDeleteAllTopics={onCloseDeleteAllTopics}
        instanceGetAllTopics={instanceGetAllTopics}
        instanceMultiple={instanceMultiple}
      />
    </Box>
  );
};

const IconButtonStyle = {
  width: "35px",
  height: "35px",
  marginLeft: "10px",
};
