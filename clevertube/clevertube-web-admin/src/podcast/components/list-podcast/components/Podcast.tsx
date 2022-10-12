import { useEffect, useMemo, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useGlobalFilter, usePagination, useTable } from "react-table";

import { ROUTER } from "src/common/constants/routes.constants";
import { Link } from "react-router-dom";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { useGetPodcast } from "src/podcast/hooks/useGetPodcast";
import { useGetAllPodcasts } from "src/podcast/hooks/useGetAllPodcasts";
import { COLUMNS } from "src/podcast/constant";
import {
  setCheckedItem,
  setCheckedItemAll,
  setIsChecked,
  setIsFetching,
  setIsLoading,
  setSelectedItemIds,
} from "src/podcast/reducer/podcast.reducer";

import IconButton from "./IconButton";
import Button from "./Button";
import Filter from "./Filter";
import Search from "./Search";
import TableList from "./TableList";
import ModalEditPodcast from "./ModalEditPodcast";
import ModalDeletePodcast from "./ModalDeletePodcast";
import ModalDeleteAllPodcasts from "./ModalDeleteAllPodcasts";
import PaginateBottom from "./PaginateBottom";
import PaginateTop from "./PaginateTop";

export const Podcast = () => {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { ADD_PODCAST_PAGE } = ROUTER;

  const dispatch = useAppDispatch();

  const checkedItemRedux = useAppSelector((state) => state.podcast.checkedItem);

  const instanceGetPodcast = useGetPodcast();
  const { mutate: mutateGetPodcast } = instanceGetPodcast;

  const instanceGetAllPodcasts = useGetAllPodcasts(page, limit);
  const { data: dtPodcasts, isLoading, isFetching, refetch } = instanceGetAllPodcasts;

  const mapMetaPodcasts = dtPodcasts?.data?.meta;
  const mapDtPodcasts = dtPodcasts?.data?.items;

  const id = mapDtPodcasts?.map((item) => item?.id);
  const code = mapDtPodcasts?.map((_, i) => i + 1);
  const idAudio = mapDtPodcasts?.map((item) => item?.audioCode);
  const nameAudio = mapDtPodcasts?.map((item) => item?.title);
  const nameLevel = mapDtPodcasts?.map((item) =>
    item?.level?.translates?.map((item) => item?.name)
  );
  const nameTopic: string[] = [];

  const mapTopic1 = mapDtPodcasts
    ?.map((item) =>
      item?.audiosToTopics?.map((value) =>
        value?.topic?.translates?.map((it) => {
          return { audioId: value?.audioId, name: [it?.name] };
        })
      )
    )
    .flat(1);

  const mapTopic2 = mapTopic1?.flat(1)?.reduce((prev, cur) => {
    const index = prev?.findIndex((v) => v?.audioId === cur?.audioId);

    if (index === -1 || cur === undefined) {
      prev?.push(cur);
    } else {
      prev[index]?.name?.push(...cur.name);
    }
    return prev;
  }, []);

  const mapTopic3 = mapTopic2?.map((item) => item?.name);

  for (let i = 0; i < mapTopic3?.length; i++) {
    nameTopic.push(mapTopic3[i]?.join(", "));
  }

  const obj = {
    id,
    code,
    idAudio,
    nameAudio,
    nameLevel,
    nameTopic,
  };

  const result = Object.values(obj)[0]?.reduce((a, b, i) => {
    a.push(Object.fromEntries(Object.keys(obj)?.map((e) => [e, obj[e][i]])));
    return a;
  }, []);

  const listIds = result?.map((item) => item?.id);

  const columns = useMemo(() => COLUMNS, []);
  const dataApi = result;

  const instanceMultiple = useSelectMultiple(listIds, page);
  const { selectedIds, reset, handleCheckAll } = instanceMultiple;

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

  const handleClickIconReload = () => {
    dispatch(setCheckedItem(false));
    dispatch(setCheckedItemAll(false));
    dispatch(setIsChecked(false));
    refetch();
  };

  const {
    isOpen: isOpenEditPodcast,
    onOpen: onOpenEditPodcast,
    onClose: onCloseEditPodcast,
  } = useDisclosure();

  const {
    isOpen: isOpenDeletePodcast,
    onOpen: onOpenDeletePodcast,
    onClose: onCloseDeletePodcast,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteAllPodcasts,
    onOpen: onOpenDeleteAllPodcasts,
    onClose: onCloseDeleteAllPodcasts,
  } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isLoading]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setIsFetching(true));
    } else {
      dispatch(setIsFetching(false));
    }
    reset();
    handleCheckAll(false);
    dispatch(setSelectedItemIds(selectedIds));
  }, [isFetching]);

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
    if (checkedItemRedux) {
      mutateGetPodcast(selectedIds);
    }
  }, [checkedItemRedux]);

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
  }, [dtPodcasts, setData]);

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
          <Link to={ADD_PODCAST_PAGE}>
            <Button label="Add new" />
          </Link>
        </Flex>
        <Search
          instanceTable={instanceTable}
          instanceMultiple={instanceMultiple}
          instanceGetAllPodcasts={instanceGetAllPodcasts}
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt="16px">
        <PaginateTop
          meta={mapMetaPodcasts}
          setPage={setPage}
          setPageSize={setPageSize}
          setLimit={setLimit}
        />
        <Box display="flex" alignItems="center">
          <Box mr="10px">
            {selectedIds.length > 1 ? (
              <IconButton
                {...IconButtonStyle}
                title="Delete All"
                aria-label="Delete all podcast"
                icon={<BiTrash />}
                onClick={onOpenDeleteAllPodcasts}
              />
            ) : (
              ""
            )}
            <IconButton
              {...IconButtonStyle}
              title="Reload"
              aria-label="Reload data"
              icon={<AiOutlineReload />}
              isLoading={isLoading || isFetching}
              onClick={handleClickIconReload}
            />
          </Box>
          <Filter />
        </Box>
      </Flex>
      <Box>
        <TableList
          instanceTable={instanceTable}
          instanceGetPodcast={instanceGetPodcast}
          instanceGetAllPodcasts={instanceGetAllPodcasts}
          instanceMultiple={instanceMultiple}
          onOpenDeletePodcast={onOpenDeletePodcast}
          onOpenEditPodcast={onOpenEditPodcast}
        />
      </Box>
      {pageOptions?.length > 0 ? (
        <Box mt="15px">
          <PaginateBottom meta={mapMetaPodcasts} setPage={setPage} />
        </Box>
      ) : (
        ""
      )}
      <ModalEditPodcast
        isOpenEditPodcast={isOpenEditPodcast}
        onCloseEditPodcast={onCloseEditPodcast}
        instanceGetPodcast={instanceGetPodcast}
        instanceGetAllPodcasts={instanceGetAllPodcasts}
        instanceMultiple={instanceMultiple}
      />
      <ModalDeletePodcast
        isOpenDeletePodcast={isOpenDeletePodcast}
        onCloseDeletePodcast={onCloseDeletePodcast}
        instanceGetAllPodcasts={instanceGetAllPodcasts}
        instanceMultiple={instanceMultiple}
      />
      <ModalDeleteAllPodcasts
        isOpenDeleteAllPodcasts={isOpenDeleteAllPodcasts}
        onCloseDeleteAllPodcasts={onCloseDeleteAllPodcasts}
        instanceGetAllPodcasts={instanceGetAllPodcasts}
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
