import { Box, FormControl, Grid, GridItem, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { Dropzone } from "src/common/components/dropzone";
import { ErrorMess } from "src/common/components/error-message-form";
import { Label } from "src/common/components/label";
import { Wrapper } from "src/common/components/wrapper/inedx";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { updatenewDocument } from "../reducers";
import ImageDocument from "src/common/assets/icons/iconItemDocument.svg";

type DocumentFormProps = {
  isDisabled?: boolean;
  handleUploadDocument: (_file?: File) => void;
};
function DocumentForm({ isDisabled, handleUploadDocument }: DocumentFormProps) {
  const dispatch = useAppDispatch();
  const { newDocument } = useAppSelector((state) => state.documentReducer);

  function onTitleChange(title: string = "") {
    const isInValid = title?.length > 250;
    dispatch(updatenewDocument({ error: isInValid ? "Tiêu đề phải dưới 250 ký tự!" : "", title }));
  }
  return (
    <Wrapper mt="20px">
      <Stack w="full">
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(3, 1fr)"
          rowGap="29px"
          columnGap="34px"
        >
          <GridItem>
            <FormControl isRequired h="80px">
              <Label label="Tiêu đề" />
              <Input
                id="first-name"
                placeholder="Nhập tên tiêu đề"
                disabled={isDisabled}
                onChange={(e) => onTitleChange(e.target.value)}
              />
              <ErrorMess error={newDocument.error} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2} />
          <GridItem rowSpan={3} display="flex" flexDir="column">
            <Label label="Tải File" isRequired={true} />
            <Box flexGrow={1}>
              <Dropzone
                onChange={handleUploadDocument}
                upTitle="Kéo file vào đây hoặc:"
                accept={["application/pdf"]}
                thumbnail={ImageDocument}
              />
            </Box>
          </GridItem>
        </Grid>
      </Stack>
    </Wrapper>
  );
}

export { DocumentForm };
