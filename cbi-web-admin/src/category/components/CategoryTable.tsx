import { Box, Checkbox, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEdit.svg";
import { Pagination } from "src/common/components/pagination/inedx";
import Skeleton from "src/common/components/skeleton";
import { PAGE_SIZE } from "src/common/constants/common.constant";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { useToast } from "src/common/hooks/useToast";
import { toTotalPage } from "src/common/lib/common.lib";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { useEditCategory } from "../hooks/useEditCategory";
import { useGetCategories } from "../hooks/useGetCategory";
import { updateSelectedIds, updatecountSubmitDelete } from "../reducers";
import { CategoryModal } from "./CategoryModal";

function CategoryTable() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCateId, setSelectedCategory] = useState("");
  const [paramsCate, setParamCate] = useState({ page: 1, limit: PAGE_SIZE });
  const { t } = useTranslation("translation");
  const { data, isLoading } = useGetCategories(paramsCate);
  const articleCategory = data?.data?.results || [];
  const articleCategoryIds = articleCategory.map((cate) => cate.id);
  const totalPages = toTotalPage(data?.data.total, PAGE_SIZE);
  const queryClient = useQueryClient();
  const editCate = useEditCategory();
  const deleteCate = useDeleteCategory();
  const { countSubmitDelete } = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const { handleCheckAll, handleSelectItem, isCheckedAll, reset, selectedIds } = useSelectMultiple(
    articleCategoryIds,
    paramsCate.page,
  );

  useEffect(() => {
    if (!countSubmitDelete) return;
    deleteCate.mutate(
      { ids: selectedIds },
      {
        onSuccess() {
          reset();
          deleteCate.invalidate();
          dispatch(updatecountSubmitDelete(0));
        },
      },
    );
  }, [countSubmitDelete]);

  useEffect(() => {
    dispatch(updateSelectedIds(selectedIds));
  }, [JSON.stringify(selectedIds)]);

  const handleEditCategory = (category: string) => {
    editCate.mutate(
      {
        id: selectedCateId,
        name: category,
      },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST);
        },
        onError(error: any) {
          toast({
            status: "error",
            title: error?.data?.message,
          });
        },
      },
    );
    return;
  };

  const defaultCateName = articleCategory.find((cate) => cate.id === selectedCateId)?.translates[0]
    .name;

  return isLoading ? (
    <Skeleton />
  ) : (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>
              {articleCategory.length > 0 && (
                <Checkbox
                  isChecked={isCheckedAll}
                  onChange={(e) => handleCheckAll(e.target.checked)}
                />
              )}
            </Th>
            <Th>{t("category-name")}</Th>
            <Th>{t("creator-name")}</Th>
            <Th>{t("edit")}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {articleCategory.map((cate) => {
            const isChecked = selectedIds.includes(cate.id);
            return (
              <Tr key={cate.id}>
                <Td>
                  {articleCategory.length > 0 && (
                    <Checkbox
                      isChecked={isChecked}
                      onChange={(e) => handleSelectItem(cate.id, e.target.checked)}
                    />
                  )}
                </Td>
                <Td>{cate.translates[0].name}</Td>
                <Td>{cate.creator.fullName}</Td>
                <Td>
                  <EditIcon
                    fill="#979797"
                    cursor="pointer"
                    onClick={() => {
                      setSelectedCategory(cate.id);
                      onOpen();
                    }}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <CategoryModal
          defaultCateName={defaultCateName}
          title={t("edit-new-category")}
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleEditCategory}
        />
      </Table>
      <Box mt="15px" w="full" display="flex" justifyContent="flex-end" pr="5">
        {articleCategory.length > 0 && (
          <Pagination
            currentPage={paramsCate.page}
            totalPages={totalPages}
            onPageChange={(page) => setParamCate({ ...paramsCate, page })}
          />
        )}
      </Box>
    </Box>
  );
}

export { CategoryTable };
