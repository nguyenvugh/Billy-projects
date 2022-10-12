import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { TYPE_QUESTION } from "@cbi/constants/index";
import { CheckboxGroup, Checkbox } from "@chakra-ui/checkbox";
import { FilePreviewModal } from "@cbi/components/file-loader-preview-modal/inedx";
import {
  optionQuestionI,
  QuestionsQuizLevelI,
  valuesOptionQuestionI,
} from "@cbi/services/cbi/cbi.interface";
import {
  customOptionQuestion,
  customOptionQuestionOnChange,
} from "@cbi/utils/cbiHelper";
import { PresignFile } from "@cbi/services/file";
import Lodash from "lodash";
import ToastSuccess from "@cbi/components/ToastSuccess";
import ToastError from "@cbi/components/ToastError";
import { QuestionsQuizLevelDefault } from "@cbi/services/cbi/constants";
const uploadFileProfile = async (
  value: { file: File },
  toast: Function,
  type: string
) => {
  try {
    const presignFile = await PresignFile({ type });
    let formData = new FormData();
    const fields = Lodash.get(presignFile, "presign.fields", {});
    const url = Lodash.get(presignFile, "presign.url", "");
    const id = Lodash.get(presignFile, "image.id", "");
    Object.keys(fields).map((key) => {
      formData.append(key, fields[key]);
    });
    formData.append("file", value.file);
    try {
      const resFile = await fetch(url, {
        body: formData,
        method: "post",
      });
      toast({
        position: "top",
        status: "success",
        isClosable: true,
        duration: 2000,
        render: () => <ToastSuccess message="Upload file thành công" />,
      });
      return { url: url + "/" + fields.key, name: value.file.name };
    } catch (error) {
      toast({
        position: "top",
        status: "error",
        isClosable: true,
        duration: 2000,
        render: () => (
          <ToastError message="Upload file thất bại, vui lòng thử lại" />
        ),
      });
      return { url: "", name: "" };
    }
  } catch (error) {
    toast({
      position: "top",
      status: "error",
      isClosable: true,
      duration: 2000,
      render: () => (
        <ToastError message="Upload file thất bại, vui lòng thử lại" />
      ),
    });
    return { url: "", name: "" };
  }
};

const renderMultipleQuiz = (
  item: optionQuestionI,
  onChangeData: Function,
  isDisable: boolean,
  ItemQuestion: QuestionsQuizLevelI
) => {
  useEffect(() => {
    const optionQuestion = ItemQuestion.options.find((el) => el.id === item.id);
    let valueCheck = optionQuestion?.values.reduce(
      (arr: any, cur: valuesOptionQuestionI) =>
        cur.status_right_option_value === 1 ? [...arr, cur.id] : arr,
      []
    );
    setDataCheckbox(valueCheck);
  }, [JSON.stringify(ItemQuestion)]);
  const [dataCheckbox, setDataCheckbox] = useState<string[]>([]);
  return (
    <Fragment>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <CheckboxGroup
          isDisabled={isDisable}
          onChange={(value: string[]) => {
            setDataCheckbox(value);
            typeof onChangeData === "function" &&
              onChangeData(item.id, item.type, value);
          }}
          value={dataCheckbox}
        >
          {item.values?.map((item_values) => (
            <Checkbox
              value={item_values.id}
              key={item_values.id}
              alignItems="baseline"
              disabled={isDisable}
            >
              <Text
                fontSize={{ base: "13px", md: "14px", lg: "16px" }}
                mt="15px"
              >
                {item_values.title}
              </Text>
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Box h="10px" />
      </Box>
    </Fragment>
  );
};
const renderUploadFile = (
  item: optionQuestionI,
  onChangeData: Function,
  toast: Function,
  isDisable: boolean,
  ItemQuestion: QuestionsQuizLevelI
) => {
  const optionQuestion = ItemQuestion.options.find((el) => el.id === item.id);
  let valueCheck = (optionQuestion?.values.length &&
    optionQuestion?.values[0]) || { status_right_option_value: "" };
  const [FileUpload, setFileUpload] = useState({
    name: valueCheck.status_right_option_value,
    url: valueCheck.status_right_option_value,
  });
  const [isOpenPreview, setOpenPreview] = useState(false);
  return (
    <Fragment>
      {item.values.map((item_values) => (
        <Box>
          <Box h="16px" />
          <Button
            bg="rgba(97, 165, 51, 0.15)"
            _hover={{
              bg: "rgba(97, 165, 51, 0.15)",
            }}
            _active={{
              bg: "rgba(97, 165, 51, 0.15)",
            }}
            w="327px"
          >
            <Image src="/img/global/ic_upload_file.svg" />
            <Text color="#61A533" ml="10px">
              Tải tài liệu
            </Text>
            <input
              disabled={isDisable}
              type="file"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "100%",
                opacity: 0,
                zIndex: 2,
              }}
              accept=".csv, .docx, .xlsx, .xls, .pdf, .doc"
              onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                const input = event.target as HTMLInputElement;
                if (!input.files?.length) {
                  return;
                }
                const dataFile = await uploadFileProfile(
                  { file: input.files[0] },
                  toast,
                  "pdf"
                );
                if (dataFile.url) {
                  setFileUpload(dataFile);
                  onChangeData(item_values.id, item.type, dataFile.url);
                }
              }}
            />
          </Button>
          {
            <Text
              fontSize={{ base: "13px", md: "14px", lg: "16px" }}
              pt="5px"
              cursor={"pointer"}
              color="#178de1"
              onClick={() => setOpenPreview(true)}
            >
              {FileUpload?.name}
            </Text>
          }
        </Box>
      ))}
      <FilePreviewModal
        title={""}
        path={FileUpload.url}
        isOpen={isOpenPreview}
        onClose={() => setOpenPreview(false)}
      />
    </Fragment>
  );
};
const renderEssayQuiz = (
  item: optionQuestionI,
  onChangeData: Function,
  isDisable: boolean,
  ItemQuestion: QuestionsQuizLevelI
) => {
  const optionQuestion = ItemQuestion.options.find((el) => el.id === item.id);
  let valueCheck = (optionQuestion?.values.length &&
    optionQuestion?.values[0]) || { status_right_option_value: "" };
  const [text, setText] = useState(valueCheck?.status_right_option_value);
  return (
    <Fragment>
      {item.values.map((el) => (
        <Box my="10px">
          <Text mt="8px">Mô tả tài liệu</Text>
          <Textarea
            disabled={isDisable}
            placeholder={el.title}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onBlur={() => {
              if (!isDisable) onChangeData(el.id, item.type, text);
            }}
          />
        </Box>
      ))}
    </Fragment>
  );
};
function AnswerCBI({
  data,
  setAnswered,
  listAnswer = [],
  ItemAnswerCBI,
  isDisable = false,
}: {
  data: optionQuestionI[];
  setAnswered?: Function;
  listAnswer?: QuestionsQuizLevelI[];
  ItemAnswerCBI: QuestionsQuizLevelI;
  isDisable?: boolean;
}) {
  const ItemQuestion =
    listAnswer.find((el) => el.id === ItemAnswerCBI.id) ||
    QuestionsQuizLevelDefault;
  const optionQuestionSingle = ItemQuestion.options.find(
    (el: optionQuestionI) => el.type === TYPE_QUESTION.SINGLE_CHOICE
  );
  let valueCheckSingle = optionQuestionSingle?.values.find(
    (el: valuesOptionQuestionI) => el.status_right_option_value === 1
  );
  const toast = useToast();
  const onChangeData = (
    itemChange: string,
    order_display: Number,
    value?: string
  ) => {
    if (!isDisable) {
      if (!listAnswer.find((e) => e?.id === ItemAnswerCBI.id)) {
        if (
          order_display === TYPE_QUESTION.MULTI_CHOICE &&
          value?.length === 0
        ) {
          return;
        } else if (order_display === TYPE_QUESTION.ENTER_ANSWER && !value) {
          return;
        }
        const option_custom = data.map((el: optionQuestionI) => {
          if (el.type === order_display) {
            const values_custom = customOptionQuestionOnChange(
              el,
              itemChange,
              value
            );
            return { ...el, values: values_custom };
          }
          return el;
        });
        typeof setAnswered === "function" &&
          setAnswered((prev: QuestionsQuizLevelI[]) => [
            ...prev,
            {
              ...ItemAnswerCBI,
              options: option_custom,
            },
          ]);
      } else {
        const findIndex = listAnswer.findIndex(
          (e) => e?.id === ItemAnswerCBI.id
        );
        let data_custom = listAnswer;
        if (
          order_display === TYPE_QUESTION.MULTI_CHOICE &&
          value?.length === 0 &&
          listAnswer[findIndex].options.length === 1
        ) {
          data_custom = data_custom.filter((el) => el.id !== ItemAnswerCBI.id);
        } else if (
          order_display === TYPE_QUESTION.ENTER_ANSWER &&
          !value &&
          listAnswer[findIndex].options.length === 1
        ) {
          data_custom = data_custom.filter((el) => el.id !== ItemAnswerCBI.id);
        } else {
          data_custom = listAnswer.map((e, index) => {
            if (index === findIndex) {
              const option_custom = e.options.map((el: optionQuestionI) => {
                if (el.type === order_display) {
                  const values_custom = customOptionQuestionOnChange(
                    el,
                    itemChange,
                    value
                  );
                  return { ...el, values: values_custom };
                }
                return el;
              });
              return { ...e, options: option_custom };
            }
            return e;
          });
        }
        typeof setAnswered === "function" && setAnswered(data_custom);
      }
    }
  };

  return (
    <Box cursor={!isDisable ? "initial" : "none"}>
      {data.length &&
        data.map((item_option) => {
          if (item_option.type === TYPE_QUESTION.SINGLE_CHOICE)
            return (
              <RadioGroup
                value={valueCheckSingle?.id}
                isDisabled={isDisable}
                onChange={(e) => {
                  onChangeData(e, item_option.type);
                }}
                __css={{
                  ".chakra-radio__control": {
                    marginTop: 1,
                  },
                }}
              >
                <Stack>
                  {item_option.values.map((item) => {
                    return (
                      <Box>
                        <Radio
                          disabled={isDisable}
                          value={item.id}
                          key={item.id}
                          cursor={!isDisable ? "initial" : "not-allowed"}
                          alignItems="flex-start"
                        >
                          <Text
                            fontSize={{ base: "13px", md: "14px", lg: "16px" }}
                          >
                            {item.title}
                          </Text>
                        </Radio>
                      </Box>
                    );
                  })}
                </Stack>
              </RadioGroup>
            );
          if (item_option.type === TYPE_QUESTION.MULTI_CHOICE) {
            return renderMultipleQuiz(
              item_option,
              onChangeData,
              isDisable,
              ItemQuestion
            );
          }
          if (item_option.type === TYPE_QUESTION.ENTER_ANSWER) {
            return renderEssayQuiz(
              item_option,
              onChangeData,
              isDisable,
              ItemQuestion
            );
          }
          if (item_option.type === TYPE_QUESTION.UPLOAD_FILE) {
            return renderUploadFile(
              item_option,
              onChangeData,
              toast,
              isDisable,
              ItemQuestion
            );
          }
        })}
    </Box>
  );
}

export { AnswerCBI };
