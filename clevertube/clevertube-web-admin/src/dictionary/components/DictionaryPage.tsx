import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { LabelText } from "src/common/components/label-text/index";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { v4 } from "uuid";
import { DictionarySchema } from "../Dictionary.schema";
import { DictionaryForm } from "../interface";
import {
  addNewDescription,
  addNewExample,
  addNewWord,
  listenValueExample,
  removeExample,
  validateExample,
} from "../redux/dictionary.reducer";

export const DictionaryPage = () => {
  const dispatch = useAppDispatch();
  const examples = useAppSelector((state) => state.dictionary.examples);
  const error = useAppSelector((state) => state.dictionary.validateExample);
  const exampleValue = useAppSelector((state) => state.dictionary.exampleValue);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<DictionaryForm>({
    resolver: yupResolver(DictionarySchema),
  });
  useEffect(() => {
    register("description");
  });
  const onSubmit = (data: DictionaryForm) => {
    if (examples.length === 0) return;
    dispatch(addNewWord(data.newWord));
    dispatch(addNewDescription(data.description));
  };
  const handleAddNewExample = () => {
    if (exampleValue) {
      dispatch(addNewExample({ id: v4(), content: exampleValue }));
      dispatch(listenValueExample(""));
    }
  };
  const handleRemoveExample = (id) => {
    dispatch(removeExample(id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box ml={"24px"}>
        {/* <HStack spacing={"10px"} marginTop="16px" cursor="pointer">
          <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_DICTIONARY} />
        </HStack> */}
        <Box mt="32px" height="100px">
          <LabelText content=" New word" />
          <Input
            width="1156px"
            placeholder="Input new word"
            mt="16px"
            {...register("newWord")}
          />
          {<ErrorMess marginTop="5px" error={errors?.newWord?.message} />}
        </Box>
        <Box mt="16px" height="250px">
          <LabelText content="Description" />
          <Box
            mt={"16px"}
            sx={{
              ".ck-content": {
                minHeight: "140px",
              },
            }}
          >
            <CKEditor
              editor={ClassicEditor}
              onChange={(value, editor) => {
                setValue("description", editor.getData());
              }}
            />
            {<ErrorMess marginTop="5px" error={errors?.description?.message} />}
          </Box>
        </Box>
        <Box mt="16px" height="100px">
          <LabelText content="Example" />
          <InputGroup mt="16px">
            <Input
              placeholder="Input example"
              value={exampleValue}
              onChange={(e) => dispatch(listenValueExample(e.target.value))}
            />
            <InputRightElement width="173px">
              <Button width="173px" onClick={handleAddNewExample}>
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <OrderedList
          border="2px solid #DEDEDE"
          mt="12px"
          padding="20px"
          ml={"-3px"}
          minHeight="150px"
        >
          {examples.map((example) => (
            <Flex justify="space-between" mt="5px">
              <ListItem>{example.content}</ListItem>
              <Button onClick={() => handleRemoveExample(example.id)}>X</Button>
            </Flex>
          ))}
        </OrderedList>
        {error && <ErrorMess error={"Vui lòng nhập ví dụ cho từ mới!"} />}
        <Flex justify="flex-end" mt="16px">
          <Button>Cancel</Button>
          <Button
            marginLeft="36px"
            type="submit"
            onClick={() => {
              if (!examples.length) dispatch(validateExample(true));
              else dispatch(validateExample(false));
            }}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </form>
  );
};
