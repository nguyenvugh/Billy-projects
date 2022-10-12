import { FilePreviewModal } from "@cbi/components/file-loader-preview-modal/inedx";
import { downloadFile, toImageEndoint } from "@cbi/utils/index";
import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { DocumentItem } from "../documents.interface";

function DocumentItem({ title, fileKey }: DocumentItem) {
  const [isOpenPreview, setOpenPreview] = useState(false);
  return (
    <Box
      cursor="pointer"
      w="255px"
      h="390px"
      p="4"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      borderRadius="12px"
      border="1px solid #E2E8F0"
      transition=".2s"
      _hover={{
        transform: "scale(1.01)",
      }}
      m="auto"
    >
      <Image
        src="/img/documents/iconItemDocument.svg"
        objectFit="cover"
        h="85%"
        w="full"
        onClick={() => setOpenPreview(true)}
      />
      <Box display="flex" alignItems="center" mt="4">
        <Image src="/img/documents/pdfIcon.png" />
        <Text
          fontSize="16px"
          fontWeight="500"
          color="#61A533"
          ml="2"
          maxWidth="200px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          _hover={{
            textDecoration: "underline",
          }}
          onClick={() =>
            downloadFile(toImageEndoint(fileKey), `${fileKey}.pdf`)
          }
        >
          {title}
        </Text>
      </Box>
      <FilePreviewModal
        title={title}
        path={toImageEndoint(fileKey)}
        isOpen={isOpenPreview}
        onClose={() => setOpenPreview(false)}
      />
    </Box>
  );
}

export default DocumentItem;
