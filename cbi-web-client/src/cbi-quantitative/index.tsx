import Container from "@cbi/components/container";
import { ModalConfirm } from "@cbi/components/modal";
import { getIsCanOpenSecretCbi } from "@cbi/services/cbi";
import { getAccessToken } from "@cbi/utils/index";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { get, setWith } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCheckCebiQuantitative } from "src/common/hooks/useCheckCebiQuantitative";
import { useImmer } from "use-immer";
import { CBI_QUANTITATIVE } from "./constants";
import { CbiQuantitativeResult } from "./interface";
import { QuanMainContent } from "./QuanMainContent";
import { QuanResult } from "./QuanResult";
import { QuanResultMobile } from "./QuanResultMobile";
import { QuanTableContent } from "./QuanTableContent";
import {
  calcEight,
  calcEleven,
  calcFive,
  calcFour,
  calcNine,
  calcOne,
  calcSeven,
  calcSix,
  calcTen,
  calcThirteen,
  calcThree,
  calcTwelve,
  calcTwo,
} from "./utils";
function CbiQuantitative() {
  const router = useRouter();
  const [resultCbi, setResultCbi] = useImmer<CbiQuantitativeResult[]>([]);
  const [isShowResult, setShowResult] = useState(false);
  const [data, setData] = useImmer<any>({});
  const { isCanOpenCebiQuan } = useCheckCebiQuantitative(onCheckCanViewPage);

  const QUESTION_NAME = CBI_QUANTITATIVE.reduce<Record<number, string>>((rs, current) => {
    rs[current.code] = current.title;
    return rs;
  }, {});

  function onCheckCanViewPage(isCanView: boolean) {
    !isCanView && router.push("/");
  }

  function handleSubmit() {
    calcOne({ getTrueVal, updateCbiResult, name: QUESTION_NAME[1] });
    calcTwo({ getTrueVal, updateCbiResult, name: QUESTION_NAME[2] });
    calcThree({ getTrueVal, updateCbiResult, name: QUESTION_NAME[3] });
    calcFour({ getTrueVal, updateCbiResult, name: QUESTION_NAME[4] });
    calcFive({ getTrueVal, updateCbiResult, name: QUESTION_NAME[5] });
    calcSix({ getTrueVal, updateCbiResult, name: QUESTION_NAME[6] });
    calcSeven({ getTrueVal, updateCbiResult, name: QUESTION_NAME[7] });
    calcEight({ getTrueVal, updateCbiResult, name: QUESTION_NAME[8] });
    calcNine({ getTrueVal, updateCbiResult, name: QUESTION_NAME[9] });
    calcTen({ getTrueVal, updateCbiResult, name: QUESTION_NAME[10] });
    calcEleven({ getTrueVal, updateCbiResult, name: QUESTION_NAME[11] });
    calcTwelve({ getTrueVal, updateCbiResult, name: QUESTION_NAME[12] });
    calcThirteen({ getTrueVal, updateCbiResult, name: QUESTION_NAME[13] });
    setShowResult(true);
    window.scrollTo({
      top: 0,
    });
  }

  function handleUpdateData(
    rootCode: string,
    questionCode: string,
    valuesCode: string,
    detailValCode: string = valuesCode,
    value: string
  ) {
    let path = `[${rootCode}][${questionCode}][${valuesCode}][${detailValCode}]`;
    if (detailValCode === "undefined" || detailValCode === valuesCode) {
      path = `[${rootCode}][${questionCode}][${valuesCode}]`;
    }
    setData((draft: any) => {
      setWith(draft, path, value);
    });
  }

  function getTrueVal(patch: any[]) {
    return +get(data, patch, "0") || 0;
  }

  function updateCbiResult({ name, vdx = 0, vht = 0, vtd = 0, total }: CbiQuantitativeResult) {
    setResultCbi((draft) => {
      draft.push({ name, vdx, vht, vtd, total });
    });
  }

  if (!isCanOpenCebiQuan) return null;
  return isShowResult ? (
    <>
      <QuanResult resultCbi={resultCbi} />
      <QuanResultMobile resultCbi={resultCbi} />
    </>
  ) : (
    <Container zIndex="100000 !important">
      <HStack
        justifyContent="space-between"
        spacing={{
          lg: "7",
          base: "none",
        }}
        alignItems="flex-start"
        position="sticky"
        top="10px"
      >
        <Box display={{ lg: "block", base: "none" }}>
          <QuanTableContent onSubmit={handleSubmit} />
        </Box>
        <VStack>
          <QuanMainContent handleUpdateData={handleUpdateData} onSubmit={handleSubmit} />
        </VStack>
      </HStack>
      <ModalConfirm
        title="Đánh giá thành công!"
        content="Chúc mừng bạn đã hoàn thành bài đánh giá định lượng. Hãy xem kết quả đánh giá phản ánh về doanh nghiệp của bạn!"
        textBtn="Xem kết quả"
        isOpen={false}
        onConfirm={() => {}}
        onClose={() => {}}
      />
    </Container>
  );
}

export { CbiQuantitative };
