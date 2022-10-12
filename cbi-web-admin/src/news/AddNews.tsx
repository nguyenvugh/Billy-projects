import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTE_NEWS } from "src/common/constants/routes.constants";
import { useToast } from "src/common/hooks/useToast";
import { NewsForm } from "./components/NewsForm/NewsForm";
import { useAddArticle } from "./hooks/useAddArticle";
import { ArticleCreate } from "./interfaces";
import { schema } from "./news.schema";

function AddNews() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const formRef = useRef<any>();
  const { mutate, isLoading } = useAddArticle();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ArticleCreate>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      authorName: "",
      status: undefined,
      idCategory: "",
    },
  });

  function handleSave(data: ArticleCreate) {
    const { isUploading, ...extraData } = formRef.current?.getExtraData() || {};
    if (isUploading) {
      toast({ title: "Đang trong quá tình tải ảnh!", status: "warning" });
      return;
    }
    const publishAt = dayjs(extraData.publishAt || new Date()).format();
    const article = { ...data, ...extraData, publishAt };
    if (!article.thumbnailId) {
      toast({
        position: "top",
        title: "Xin hãy chọn ảnh!",
        status: "error",
      });
      return;
    }
    mutate(article);
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
        <Text variant="page-title">Danh sách tin tức &gt; Thêm mới</Text>
        <Stack direction="row" spacing={4}>
          <Button
            bg="white"
            color="black"
            border="1px solid #CBCBCB"
            onClick={() => navigate(ROUTE_NEWS)}
          >
            {t("cancel")}
          </Button>
          <Button
            isLoading={isLoading}
            bg="green.primary"
            onClick={handleSubmit((data) => {
              handleSave(data);
            })}
          >
            {t("save")}
          </Button>
        </Stack>
      </Stack>

      <NewsForm type="add" register={register} errors={errors} ref={formRef} />
    </Box>
  );
}

export { AddNews };
