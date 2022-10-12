import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { Params } from "src/common/interfaces/common.interface";
import { Header } from "./components/Header";
import { TableContainer } from "./components/Table";
import { useDeleteDocuments } from "./hooks/useDeleteDocuments";
import { useGetDocuments } from "./hooks/useGetDocuments";
function Document() {
  const [params, setParams] = useState<Params>({ page: 1, limit: 6 });
  const { data } = useGetDocuments(params);
  const { mutate: deleteDocuments, invalidate } = useDeleteDocuments();
  const documents = data?.data.results || [];
  const allCurrentId = documents.map((doc) => doc.id);
  const { isCheckedAll, selectedIds, handleCheckAll, handleSelectItem, reset } = useSelectMultiple(
    allCurrentId,
    params.page,
  );

  function handlePageChange(page) {
    setParams({ ...params, page });
  }
  function handleSearch(searchText?: string) {
    setParams({ ...params, searchText, page: 1 });
  }
  function handleDeleteDocs() {
    deleteDocuments(selectedIds, {
      onSuccess() {
        reset();
        invalidate();
      },
    });
  }
  return (
    <Box ml={10}>
      <Header
        onSearch={handleSearch}
        handleSelectAllClick={handleCheckAll}
        listSelected={selectedIds}
        isCheckedAll={isCheckedAll}
        onDelete={handleDeleteDocs}
      />
      <Box w="full" pt="2">
        <TableContainer
          handleSelectRow={handleSelectItem}
          listSelected={selectedIds}
          documentData={data?.data}
          currentPage={params.page || 1}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export { Document };
