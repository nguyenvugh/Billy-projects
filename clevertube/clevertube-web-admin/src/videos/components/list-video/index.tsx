import { Box, Button, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import ModalDelete from "src/common/components/modal-delete";
import PaginateBottom from "src/common/components/paginate-bottom";
import PaginateTopPage from "src/common/components/paginate-top";
import Search from "src/common/components/search";
import TableList from "src/common/components/table-list";
import { ROUTER } from "src/common/constants/routes.constants";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { toHHMMSS } from "src/common/utils/convertTime";
import { COLUMNS } from "../../constant";
import { useDeleteVideos } from "../../hooks/useDeleteVideos";
import { useGetVideos } from "../../hooks/useGetVideos";
import { setCheckedItem, setSearch } from "../../videolist.reducer";

const VideoList = () => {
  const { ADDVIDEO_PAGE } = ROUTER;

  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const [limit, setLimit] = useState<number>(10);

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  const instanceGetVideos = useGetVideos(page, limit);
  const { data: dtVideos, refetch } = instanceGetVideos;
  const mapMeta = dtVideos?.meta;
  const listIds = dtVideos?.items?.map((item) => item?.id) as number[];
  const instanceMultiple = useSelectMultiple(listIds, page, selectedItemIds);
  const { selectedIds } = instanceMultiple;

  const {
    isOpen: isOpenDeleteVideo,
    onOpen: onOpenDeleteVideo,
    onClose: onCloseDeleteVideo,
  } = useDisclosure();
  const searchRedux = useAppSelector((state) => state.video.search);
  const checkedItem = useAppSelector((state) => state.video.checkedItem);
  useEffect(() => {
    const dataTransfer = dtVideos?.items.map((item) => {
      const nameTopic = item.videosToTopics
        .map((topic) => topic.topic.translates.map((translate) => translate.name))
        .reduce((r, e) => {
          return r.push(...e), r;
        }, [])
        .toString();
      return {
        id: item.id,
        idVideo: item.id,
        code: item.videoCode,
        nameThumbnail: item.thumbnails.default.url,
        nameTitle: item.name,
        nameLink: item.link,
        nameLevel: item?.level?.translates[0]?.name,
        nameTopic,
        nameLength: toHHMMSS(item.length),
      };
    });
    if (dataTransfer) setData(dataTransfer);
  }, [dtVideos]);
  useEffect(() => {
    setSelectedItemIds(selectedIds);
    if (selectedIds.length >= 1) {
      dispatch(setCheckedItem(true));
    } else {
      dispatch(setCheckedItem(false));
    }
  }, [selectedIds]);
  useEffect(() => {
    if (page || limit) {
      refetch();
    }
  }, [page, limit]);

  const columns = useMemo(() => COLUMNS, []);
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

  return (
    <>
      <Flex justifyContent="space-between" mt="32px">
        <Link to={ADDVIDEO_PAGE}>
          <Button {...ButtonStyle}>Add new</Button>
        </Link>
        <Search
          instanceTable={instanceTable}
          instanceMultiple={instanceMultiple}
          instanceGetAll={instanceGetVideos}
          setSearch={setSearch}
          searchRedux={searchRedux}
        />
      </Flex>
      <Flex justifyContent="space-between" mt="14px">
        {/* <SelectMenu setFilter={setFilter} /> */}
        <PaginateTopPage
          meta={mapMeta}
          setPage={setPage}
          setPageSize={setPageSize}
          setLimit={setLimit}
          namePage="video"
        />
        <Box>
          {checkedItem && (
            <IconButton
              {...IconButtonStyle}
              title="Delete All"
              aria-label="Delete all podcast"
              icon={<BiTrash />}
              onClick={onOpenDeleteVideo}
            />
          )}
          {/* <Filter /> */}
        </Box>
      </Flex>

      <TableList
        instanceTable={instanceTable}
        instanceGetAll={instanceGetVideos}
        instanceMultiple={instanceMultiple}
        onOpenDelete={onOpenDeleteVideo}
        setSelectedItemIds={setSelectedItemIds}
      />
      {pageOptions?.length > 0 ? (
        <Box mt="15px">
          <PaginateBottom meta={dtVideos?.meta} setPage={setPage} />
        </Box>
      ) : (
        <></>
      )}
      <ModalDelete
        isOpenDelete={isOpenDeleteVideo}
        onCloseDelete={onCloseDeleteVideo}
        instanceGet={instanceGetVideos}
        instanceMultiple={instanceMultiple}
        selectedItemIds={selectedItemIds}
        useDelete={useDeleteVideos}
        nameModal={"video"}
      />
    </>
  );
};
export default VideoList;

const ButtonStyle = {
  px: "16px",
  py: "10px",
  h: "48px",
  bgColor: "color.primary",
  color: "white",
  _hover: { bg: "hover.primary" },
};

const IconButtonStyle = {
  width: "35px",
  height: "35px",
  marginRight: "10px",
};
