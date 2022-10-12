import { Box, Button, Stack, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AlertModal } from "src/common/components/confirm-modal/AlertModal";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import {
  BREAD_CRUMB_NEWS_DETAIL,
  BREAD_CRUMB_NEWS_EDIT,
} from "src/common/constants/breadcrumb.config";
// import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
import { S3_IMG_URL } from "src/common/constants/common.constant";
import { ROUTE_NEWS } from "src/common/constants/routes.constants";
import { useToast } from "src/common/hooks/useToast";
import { NewsForm } from "./components/NewsForm/NewsForm";
import { useDeleteMultiArticle } from "./hooks/useDeleteMultiArticle";
import { useDetailArticle } from "./hooks/useDetailArticle";
import { useEditArticle } from "./hooks/useEditArticle";
import { ArticleCreate } from "./interfaces";
import { schema } from "./news.schema";

function DetailNews() {
  const [isDetailMode, setIsDetailMode] = useState(true);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const search = useParams();
  const { data } = useDetailArticle(search?.newId || "");
  const newDetail = data?.data;
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate } = useEditArticle(onEditSuccess, onEditError);
  const mutationDeleteArt = useDeleteMultiArticle();

  const formRef = useRef<any>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ArticleCreate>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (newDetail) {
      setValue("title", newDetail.translates[0].title);
      setValue("authorName", newDetail.authorName);
      setValue("status", newDetail.status);
      setValue("idCategory", newDetail?.articleCategory?.id);
      setValue("description", newDetail?.description);
    }
  }, [newDetail]);

  function handleEditNew(data: ArticleCreate) {
    if (!search?.newId) return;
    const { isUploading, ...extraData } = formRef.current?.getExtraData() || {};
    if (isUploading) {
      toast({ title: "Đang trong quá tình tải ảnh!", status: "warning" });
      return;
    }
    const publishAt = dayjs(extraData.publishAt || new Date()).format();
    const article = { ...data, ...extraData, publishAt };
    if (!article.thumbnailId) {
      toast({
        title: "Xin hãy chọn ảnh!",
        status: "error",
      });
      return;
    }
    mutate({ article, id: search?.newId });
  }

  function onEditSuccess() {
    toast({
      title: "Cập nhật thành công!",
    });
    navigate(ROUTE_NEWS);
  }

  function onEditError(error: AxiosResponse) {
    toast({
      title: error.data?.message,
      status: "error",
    });
  }

  function handleDeleteNew() {
    search?.newId && mutationDeleteArt.mutate([search?.newId]);
    navigate(ROUTE_NEWS);
  }

  function BtnDetailMode() {
    return (
      <Stack direction="row" spacing={4}>
        <Button bg="green.primary" onClick={() => setIsDetailMode(false)}>
          {t("edit")}
        </Button>
        <Button bg="red.primary" onClick={onOpen}>
          {t("delete")}
        </Button>
      </Stack>
    );
  }

  function BtnEditMode() {
    return (
      <Stack direction="row" spacing={4}>
        <Button
          bg="white"
          color="black"
          border="1px solid #CBCBCB"
          onClick={() => setIsDetailMode(true)}
        >
          {t("cancel")}
        </Button>
        <Button
          bg="green.primary"
          onClick={handleSubmit((data) => {
            handleEditNew(data);
          })}
        >
          {t("save")}
        </Button>
      </Stack>
    );
  }

  const thumbnailImg = `${S3_IMG_URL}/${newDetail?.thumbnail.key}`;
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
        <RenderBreadcrumb
          breadcrumbConfigs={isDetailMode ? BREAD_CRUMB_NEWS_DETAIL : BREAD_CRUMB_NEWS_EDIT}
        />
        {isDetailMode ? <BtnDetailMode /> : <BtnEditMode />}
      </Stack>

      <NewsForm
        type="edit"
        isDisabled={isDetailMode}
        register={register}
        errors={errors}
        ref={formRef}
        publishAt={newDetail?.publishAt}
        content={newDetail?.translates[0]?.content}
        isFeature={newDetail?.isFeature}
        thumbnailId={newDetail?.thumbnail?.id}
        thumbnailImg={thumbnailImg}
      />
      {/* <ConfirmModal
        title={"XÓA TIN TỨC"}
        isOpen={isOpen}
        onCancel={onClose}
        onDelete={handleDeleteNew}
        content={"Bạn có chắc muốn xóa những tin tức đã chọn?"}
      /> */}
      <AlertModal
        title="Thông báo"
        content="Bạn có chắc muốn đăng xuất tài khoản?"
        isOpen={isOpen}
        onCancel={onClose}
        onDelete={handleDeleteNew}
      />
    </Box>
  );
}

export { DetailNews };
