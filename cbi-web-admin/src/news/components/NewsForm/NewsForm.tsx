import {
  Box,
  Checkbox,
  Divider,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DatePicker } from "src/common/components/date-picker";
import { Dropzone } from "src/common/components/dropzone";
import { CustomCkEditor } from "src/common/components/editor";
import { ErrorMess } from "src/common/components/error-message-form";
import { Label } from "src/common/components/label";
import { Select } from "src/common/components/select";
import { Wrapper } from "src/common/components/wrapper/inedx";
import { usePresignImg } from "src/common/hooks/usePresignImg";
import { useCheckIsFullPublish } from "src/news/hooks/useCheckIsFullPublish";
import { useGetCategory } from "src/news/hooks/useGetCategory";
import { ArticleCreate } from "src/news/interfaces";

type NewsFormProps = {
  isDisabled?: boolean;
  register: UseFormRegister<ArticleCreate>;
  errors: FieldErrors<ArticleCreate>;
  thumbnailImg?: string;
  type: "edit" | "add";
} & Partial<ArticleCreate>;
function NewsFormRef(
  {
    isDisabled,
    register,
    errors,
    publishAt,
    content,
    isFeature,
    thumbnailId,
    thumbnailImg,
    type,
  }: NewsFormProps,
  ref,
) {
  const { handleUpload, isUploading } = usePresignImg();
  const [extraDataForm, setExtraDataForm] = useState<any>({});
  const [isPublishLocal, setIsPublishLocal] = useState(0);
  const { data: checkPublishRes } = useCheckIsFullPublish();
  const disabledPublishCheckbox = checkPublishRes?.data.isFullPublished && type !== "edit";

  useEffect(() => {
    setIsPublishLocal(isFeature || 0);
  }, [isFeature]);
  useEffect(() => {
    setExtraDataForm({
      publishAt: publishAt ? dayjs(publishAt).toDate() : new Date(),
      content: content || "",
      isFeature,
      thumbnailId: thumbnailId || "",
    });
  }, [publishAt, content, isFeature, thumbnailId]);
  const { t } = useTranslation();
  const { data: categories } = useGetCategory();
  useImperativeHandle(ref, () => ({
    getExtraData() {
      return {
        ...extraDataForm,
        thumbnailId: extraDataForm.thumbnailId || thumbnailId,
        isUploading,
      };
    },
  }));

  async function handleFileChange(file?: File) {
    let thumbnailId;
    if (file) {
      const thumbRes = await handleUpload(file);
      thumbnailId = thumbRes.id;
    }
    setExtraDataForm({ ...extraDataForm, thumbnailId });
  }

  const cateMapToOptions = categories?.data.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <Wrapper mt="20px">
      <Stack w="full">
        <Text fontWeight="600">{t("news")}</Text>
        <Divider />

        <Grid templateColumns="repeat(3, 1fr)" rowGap="29px" columnGap="34px">
          <GridItem>
            <Label label="Ti??u ????? ti???ng Vi???t" isRequired />
            <Input
              placeholder="Nh???p t??n ti??u ????? ti???ng Vi???t"
              disabled={isDisabled}
              {...register("title")}
            />
            <ErrorMess error={errors.title?.message} />
          </GridItem>

          <GridItem>
            <Label label="Chuy??n m???c" isRequired />
            <Select
              placeholder="-Ch???n chuy??n m???c-"
              options={cateMapToOptions}
              disabled={isDisabled}
              {...register("idCategory")}
            />
            <ErrorMess error={errors.idCategory?.message} />
          </GridItem>

          <GridItem rowSpan={3} colSpan={1} display="flex" flexDir="column">
            <FormLabel htmlFor="first-name">???nh thumbnail</FormLabel>
            <Box flexGrow={1}>
              <Dropzone
                disabled={isDisabled}
                onChange={handleFileChange}
                defaultImg={thumbnailImg}
                upTitle="Drag files to here or"
                downTitle="(K??ch th?????c ???nh: 776x424)"
              />
            </Box>
          </GridItem>

          <GridItem>
            <Label label="Tr???ng th??i" isRequired />
            <Select
              disabled={isDisabled}
              placeholder="Ch???n tr???ng th??i"
              options={[
                {
                  label: "B???n nh??p",
                  value: "DRAFT",
                },
                {
                  label: "Xu???t b???n",
                  value: "PUBLISH",
                },
              ]}
              {...register("status")}
            />
            <ErrorMess error={errors.status?.message} />
          </GridItem>

          <GridItem>
            <Label label="Ng??y xu???t b???n" isRequired={true}></Label>
            <DatePicker
              error=""
              onChange={(date) => setExtraDataForm({ ...extraDataForm, publishAt: date })}
              showTimeInput
              timeInputLabel="Time:"
              disabled={isDisabled}
              selected={extraDataForm.publishAt}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <Label label="T??c gi???" isRequired />
            <Input placeholder="T??c gi???" disabled={isDisabled} {...register("authorName")} />
            <ErrorMess error={errors.authorName?.message} />
          </GridItem>

          {/* <GridItem>
            <Label label="Ng??y s???a g???n nh???t" isRequired={true}></Label>
            <DatePicker
              error=""
              onChange={() => {}}
              dateFormat="dd/MM/yyyy"
              disabled={isDisabled}
            />
          </GridItem> */}

          <GridItem colSpan={1}>
            <Label label="M?? t???" isRequired />
            <Input placeholder="Nh???p m?? t???" disabled={isDisabled} {...register("description")} />
            <ErrorMess error={errors.description?.message} />
          </GridItem>

          <GridItem colSpan={2}>
            <Label label="Ch???n lo???i tin:" isRequired />
            <Box display="flex">
              <Checkbox
                isDisabled={isDisabled || disabledPublishCheckbox}
                onChange={(e) => {
                  setExtraDataForm({ ...extraDataForm, isFeature: e.target.checked });
                  setIsPublishLocal(e.target.checked ? 1 : 0);
                }}
                isChecked={!!isPublishLocal}
              >
                Slider
              </Checkbox>
            </Box>
          </GridItem>

          <GridItem colSpan={3}>
            <FormLabel htmlFor="first-name">N???i dung *</FormLabel>
            <CustomCkEditor
              disabled={isDisabled}
              data={extraDataForm.content}
              onChange={(content) => setExtraDataForm({ ...extraDataForm, content })}
            />
          </GridItem>
        </Grid>
      </Stack>
    </Wrapper>
  );
}

const NewsForm = React.forwardRef(NewsFormRef);
export { NewsForm };
