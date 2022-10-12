import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GoCheck } from "react-icons/go";
import ImageDocument from "src/common/assets/icons/iconItemDocument.svg";
import { FilePreviewModal } from "src/common/components/file-loader-preview-modal/inedx";
import { Pagination } from "src/common/components/pagination/inedx";
import { toS3Url } from "src/common/utils/common.util";
import { Documents, TableContainerI } from "../interfaces";
function TableContainer({
  handleSelectRow,
  listSelected,
  documentData,
  onPageChange,
  currentPage,
}: TableContainerI) {
  const [isOpenPreview, setOpenPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ path: "", title: "" });
  const listDocument = documentData?.results || [];
  const totalPage = documentData?.totalPage || 0;
  const onChangePage = (page: number) => {
    onPageChange(page);
  };

  function handlePreview(path: string, title: string) {
    setSelectedFile({ title, path: toS3Url(path) });
    setOpenPreview(true);
  }

  return (
    <Box width={"751px"} m="auto">
      <Grid templateColumns="1fr 1fr 1fr" gridGap={"20px"}>
        {listDocument.map((document: Documents) => {
          const isSelected = listSelected.includes(document.id);
          return (
            <Box key={document.title} position="relative">
              <Box
                h="292px"
                borderRadius="8px"
                border="0.2px solid #979797"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                bg={isSelected ? "hsla(0, 0%, 76.86274509803923%, 0.47)" : ""}
                opacity={isSelected ? 0.47 : 1}
              >
                <Image
                  src={ImageDocument}
                  onClick={() => handlePreview(document.file.key, document.title)}
                  cursor="pointer"
                />
                <Box
                  py="14px"
                  px="23px"
                  fontSize={"20px"}
                  fontWeight="bold"
                  color="#3A3A3A"
                  onClick={() => {
                    handleSelectRow(document.id, !isSelected);
                  }}
                >
                  <Text maxW="150px" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
                    {document.title}
                  </Text>
                </Box>
              </Box>
              {isSelected && (
                <Flex
                  bg="#61a5335e"
                  borderRadius="6px"
                  alignItems={"center"}
                  justifyContent="center"
                  w="25px"
                  h="25px"
                  position={"absolute"}
                  bottom={4}
                  right={4}
                  zIndex={2}
                >
                  <GoCheck style={{ color: "#61A533" }} />
                </Flex>
              )}
            </Box>
          );
        })}
      </Grid>
      {!!totalPage && (
        <Flex mt={"48px"} justifyContent="flex-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onChangePage}
          />
        </Flex>
      )}
      <FilePreviewModal
        title={selectedFile.title}
        path={selectedFile.path}
        isOpen={isOpenPreview}
        onClose={() => setOpenPreview(false)}
      />
    </Box>
  );
}

export { TableContainer };
