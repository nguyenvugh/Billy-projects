import { Box, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { PAGE_SIZE } from "src/common/constants/common.constant";
import { Params } from "src/common/interfaces/common.interface";
import { CbiHeader } from "./CbiHeader";
// import Phase from "./Phase";
import { CBIQuizTable } from "./CBIQuizTable";

function QuestionDetail() {
  const [params, setParams] = useState<Params>({
    limit: PAGE_SIZE,
    page: 1,
  });
  const handleUpdateParams = (newParams: Params) => {
    setParams({ ...params, ...newParams });
  };

  return (
    <VStack>
      {/* <Phase /> */}
      <CbiHeader />
      <Box w="full" pt="2">
        <CBIQuizTable quizGroupListParams={params} handleUpdateParams={handleUpdateParams} />
      </Box>
    </VStack>
  );
}

export { QuestionDetail };
