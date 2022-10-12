import React, { useState } from "react";
import { AnswerDetail } from "./components/AnswerDetailUnchecked";
import { SubmittedAnswerList } from "./components/SubmittedAnswerList";
import { SubmittedAnswerResponse, SubmittedAnswerType, SubmittedScreen } from "./interfaces";

const SubmittedAnswer = () => {
  const [screen, setScreen] = useState<SubmittedScreen>(SubmittedScreen.LIST);
  const [id, setId] = useState<string>("");
  const [dataCbi, setDataCbi] = useState<any>();
  const handleGoToDetail = (data: SubmittedAnswerResponse, idDetail: string) => {
    setDataCbi(data);
    setId(idDetail);
    setScreen(SubmittedScreen.DETAIL);
  };
  if (screen === SubmittedScreen.DETAIL)
    return <AnswerDetail id={id} dataCbi={dataCbi} setScreen={setScreen} />;
  return (
    <SubmittedAnswerList type={SubmittedAnswerType.UNCHECKED} handleGoToDetail={handleGoToDetail} />
  );
};
export { SubmittedAnswer };
