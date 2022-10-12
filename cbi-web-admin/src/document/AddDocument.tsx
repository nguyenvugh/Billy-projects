import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { BREAD_CRUMB_DOCUMENT_ADD } from "src/common/constants/breadcrumb.config";
import { ROUTE_DOCUMENT } from "src/common/constants/routes.constants";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { usePresignImg } from "src/common/hooks/usePresignImg";
import { useToast } from "src/common/hooks/useToast";
import { DocumentForm } from "./components/DocumentForm";
import { useAddDocuments } from "./hooks/useAddDocuments";

function AddDocument() {
  const [fileId, setFileId] = useState("");
  const { handleUpload, isUploading } = usePresignImg();
  const toast = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { newDocument } = useAppSelector((state) => state.documentReducer);

  const { mutate } = useAddDocuments();

  async function handleUploadDocument(file?: File) {
    const thumbRes = await handleUpload(file);
    setFileId(thumbRes.id || "");
  }

  function handleAddDocument() {
    if (isUploading) {
      toast({ title: "Đang trong quá trình tải file!", status: "warning" });
      return;
    }
    if (!fileId) {
      toast({ title: "Xin hãy chọn file", status: "warning" });
      return;
    }
    if (!newDocument.title) {
      toast({ title: "Xin hãy chọn tiêu đề!", status: "warning" });
      return;
    }
    if (newDocument.error) return;

    mutate(
      { ...newDocument, fileId },
      {
        onSuccess() {
          navigate(ROUTE_DOCUMENT);
        },
        onError(error: any) {
          toast({
            status: "error",
            title: error?.data?.message,
          });
        },
      },
    );
  }
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_DOCUMENT_ADD} />
        <Stack direction="row" spacing={4}>
          <Button bg="green.primary" onClick={handleAddDocument}>
            {t("add-document")}
          </Button>
          <Button
            bg="white"
            color="black"
            border="1px solid #CBCBCB"
            onClick={() => navigate(ROUTE_DOCUMENT)}
          >
            {t("cancel")}
          </Button>
        </Stack>
      </Stack>

      <DocumentForm handleUploadDocument={handleUploadDocument} />
    </Box>
  );
}

export { AddDocument };
