import Container from "@cbi/components/container";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { DocumentList } from "../climate-document/components/DocumentList";
import { Documents as DocumentsI } from "src/climate-document/documents.interface";
import { List } from "src/common/interfaces/common.interface";

function Documents({ documents }: { documents: List<DocumentsI> }) {
  return (
    <Container>
      <Box>
        <Text
          fontSize="36px"
          fontWeight="700"
          mt="64px"
          color="rgba(0, 0, 0, 0.8)"
        >
          Tài liệu
        </Text>
        <Text
          fontSize="16px"
          fontWeight="500"
          mt="18px"
          mb="30px"
          color="#2D3748"
        >
          Download các tài liệu về CEBI ở đây.
        </Text>
        <DocumentList documents={documents} />
      </Box>
    </Container>
  );
}

export { Documents };
