import React, { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { NewsHeader } from "./components/NewsHeader";
import { NewsTable } from "./components/NewsTable";
import { PAGE_SIZE } from "src/common/constants/common.constant";
import { ArticleParams } from "./interfaces";
import { useImmer } from "use-immer";

function News() {
  const [articleParams, setArticleParams] = useState<ArticleParams>({
    limit: PAGE_SIZE,
    page: 1,
  });
  const [selectIds, setSelectIds] = useImmer<string[]>([]);
  function handleUpdateParams(newParams: ArticleParams) {
    setArticleParams({ ...articleParams, ...newParams });
  }

  return (
    <VStack>
      <NewsHeader
        articleParams={articleParams}
        updateArticleParams={handleUpdateParams}
        selectIds={selectIds}
      />
      <Box w="full" pt="2">
        <NewsTable
          articleParams={articleParams}
          updateArticleParams={handleUpdateParams}
          selectIds={selectIds}
          updateSelectedIds={setSelectIds}
        />
      </Box>
    </VStack>
  );
}

export { News };
