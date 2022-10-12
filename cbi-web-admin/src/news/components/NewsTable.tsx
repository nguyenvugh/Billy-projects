import { Box, Checkbox, Image, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "src/common/components/loading-page";
import { Pagination } from "src/common/components/pagination/inedx";
import { S3_IMG_URL } from "src/common/constants/common.constant";
import { ROUTE_DETAIL_NEWS } from "src/common/constants/routes.constants";
import { replacePathParams } from "src/common/lib/common.lib";
import { useImmer } from "use-immer";
import { useChangeStatusArticle } from "../hooks/useChangeStatusArticle";
import { useGetArticle } from "../hooks/useGetArticle";
import { NewsTableProps } from "../interfaces";

function NewsTable({
  articleParams,
  updateArticleParams,
  selectIds = [],
  updateSelectedIds = () => {},
}: NewsTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectAllByPage, setSelectAllByPage] = useImmer<Record<number, boolean>>({
    1: false,
  });

  const { mutate } = useChangeStatusArticle();
  const { data: articleRes, isLoading } = useGetArticle(articleParams);
  const data = articleRes?.data.results || [];
  const totalPage = articleRes?.data.totalPage || 0;
  const isHasArticle = data.length > 0;

  useEffect(() => {
    setPage(articleParams.page || 1);
  }, [articleParams.page]);
  function handleSelectAll(isSelected: boolean) {
    setSelectAllByPage((old) => {
      old[page] = isSelected;
    });
    const currentIds = data.map((it) => it.id);
    if (isSelected) {
      updateSelectedIds((oldSelected) => [...new Set([...oldSelected, ...currentIds])]);
    } else {
      const ids = selectIds.filter((id) => !currentIds.includes(id));
      updateSelectedIds(() => ids);
    }
  }

  function handleSelectArticle(isSelected: boolean, idArt: string) {
    if (isSelected) {
      updateSelectedIds((oldSelected) => {
        const currentIds = data.map((it) => it.id);
        const newIds = [...oldSelected, idArt];
        if (currentIds.every((id) => newIds.includes(id || ""))) {
          setSelectAllByPage((old) => {
            old[page] = true;
            return old;
          });
        }
        return newIds;
      });
    } else {
      setSelectAllByPage((old) => {
        old[page] = false;
        return old;
      });
      updateSelectedIds((oldSelected) => oldSelected.filter((id) => id !== idArt));
    }
  }

  function handleNavigateToDetail(newId: string) {
    navigate(
      replacePathParams(ROUTE_DETAIL_NEWS, {
        newId,
      }),
    );
  }

  return (
    <LoadingPage isLoading={isLoading}>
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
            <Th>
              {isHasArticle && (
                <Checkbox
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  isChecked={selectAllByPage[page]}
                />
              )}
            </Th>
            <Th>Thumbnail</Th>
            <Th>Tiêu đề</Th>
            <Th>Chuyên mục </Th>
            <Th>Ngày đăng</Th>
            <Th>Trạng thái</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.map((it) => {
            const thumnailUrl = `${S3_IMG_URL}/${it.thumbnail?.key}`;
            const statusColor = it.status === "DRAFT" ? "#858585" : "#00B41D";
            const status = it.status === "DRAFT" ? "Bản nháp" : "Xuất bản";
            return (
              <Tr>
                <Td alignItems="center">
                  <Checkbox
                    isChecked={selectIds.includes(it.id || "")}
                    onChange={(e) => handleSelectArticle(e.target.checked, it.id || "")}
                  />
                </Td>
                <Td onClick={() => handleNavigateToDetail(it.id)}>
                  <Image src={thumnailUrl} w="78px" h="37px" objectFit="cover" />
                </Td>
                <Td color="#2154FF" onClick={() => handleNavigateToDetail(it.id)}>
                  {it.translates[0].title}
                </Td>
                <Td onClick={() => handleNavigateToDetail(it.id)}>
                  {it.articleCategory?.translates[0]?.name}
                </Td>
                <Td onClick={() => handleNavigateToDetail(it.id)}>
                  {dayjs(it.publishAt).format("DD/MM/YYYY")}
                </Td>
                <Td color={statusColor} cursor="pointer" onClick={() => mutate(it.id)}>
                  {status}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot position="relative" h="80px">
          <Box position="absolute" mt="5" right="5">
            {!!totalPage && (
              <Pagination
                currentPage={page}
                totalPages={totalPage}
                onPageChange={(page) => {
                  updateArticleParams({ page });
                  setPage(page);
                }}
              />
            )}
          </Box>
        </Tfoot>
      </Table>
    </LoadingPage>
  );
}

export { NewsTable };
