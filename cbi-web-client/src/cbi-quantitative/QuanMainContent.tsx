import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { debounce, get, setWith } from "lodash";
import React from "react";
import { useImmer } from "use-immer";
import { CBI_QUANTITATIVE, CBI_QUANTITATIVE_CONTAINER_ID } from "./constants";
import { CbiQuantitativeQuestionType, CbiQuantitativeResult } from "./interface";
import {
  LabelInput,
  LabelInputInput,
  LabelInputSelect,
  LabelSelect,
  LabelSelectInput,
  RadioEl,
  RowEl,
  SelectInput,
  SubAnswersProps,
} from "./SubAnswers";

const MAP_ELEMENT: Record<CbiQuantitativeQuestionType, React.ReactNode> = {
  radio: (props: SubAnswersProps) => <RadioEl {...props} />,
  row: (props: SubAnswersProps) => <RowEl {...props} />,
  label_input_select: (props: SubAnswersProps) => <LabelInputSelect {...props} />,
  label_select: (props: SubAnswersProps) => <LabelSelect {...props} />,
  label_select_input: (props: SubAnswersProps) => <LabelSelectInput {...props} />,
  label_input: (props: SubAnswersProps) => <LabelInput {...props} />,
  label_input_input: (props: SubAnswersProps) => <LabelInputInput {...props} />,
  select_input: (props: SubAnswersProps) => <SelectInput {...props} />,
};
function QuanMainContent({
  handleUpdateData,
  onSubmit,
}: {
  onSubmit: () => void;
  handleUpdateData: (
    rootCode: string,
    questionCode: string,
    valuesCode: string,
    detailValCode: string,
    value: string
  ) => void;
}) {
  const handleUpdateDataDebounce = debounce(
    (
      rootCode: string,
      questionCode: string,
      valuesCode: string,
      detailValCode: string,
      value: string
    ) => {
      handleUpdateData(rootCode, questionCode, valuesCode, detailValCode, value);
    },
    300
  );
  return (
    <Box id={CBI_QUANTITATIVE_CONTAINER_ID}>
      <HStack w="full" mt="3">
        <Text
          fontSize={{
            lg: "30px",
            base: "16px",
          }}
          fontWeight="700"
          color="#2D3748"
        >
          Đánh giá định lượng
        </Text>
        <Button
          display={{
            lg: "none",
            base: "block",
          }}
          m="10px !important"
          bg="#61A533"
          borderRadius="6px"
          color="white"
          _hover={{
            bg: "#61A533",
          }}
          onClick={onSubmit}
        >
          Hoàn thành
        </Button>
      </HStack>
      {CBI_QUANTITATIVE.map((element) => {
        const rootCode = element.code + "";
        return (
          <Box id={rootCode} w="full">
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              border="1px solid #EBEFF2"
              w={{
                lg: "full",
                base: "100vw",
              }}
            >
              <AccordionItem>
                <AccordionButton borderRadius="unset" bg="#EBEFF2" _focus={{ shadow: "unset" }}>
                  <AccordionIcon />
                  <Text
                    textAlign="left"
                    fontSize={{
                      lg: "16px",
                      base: "14px",
                    }}
                    fontWeight="700"
                  >
                    {element.title}
                  </Text>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {element.questions.map((question) => {
                    const questionCode = question.code;
                    return (
                      <VStack justifyContent="flex-start" alignItems="flex-start">
                        <Text
                          fontSize={{
                            lg: "16px",
                            base: "14px",
                          }}
                          fontWeight="600"
                          my="3"
                        >
                          {question.title}
                        </Text>
                        {(question.values || []).map((answer) => {
                          const valuesCode = answer.code;
                          const Comp = MAP_ELEMENT[answer.type] as typeof React.Component;
                          return (
                            <Comp
                              {...answer}
                              onChange={(value: string, code: string) =>
                                handleUpdateDataDebounce(
                                  rootCode,
                                  questionCode,
                                  valuesCode,
                                  code,
                                  value
                                )
                              }
                            />
                          );
                        })}
                      </VStack>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
}
export { QuanMainContent };
