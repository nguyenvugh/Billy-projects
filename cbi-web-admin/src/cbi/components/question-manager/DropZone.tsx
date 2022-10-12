import React, { useEffect, useState } from "react";
import { Box, Button, Image as ChakraImg } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "src/common/assets/icons/iconUploadFile.svg";
import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEdit.svg";
import { useToast } from "src/common/hooks/useToast";
import { MAX_FILE_SIZE } from "src/common/constants/common.constant";
import CloseIcon from "src/common/components/CloseIcon";

type DropzoneProps = {
  onChange: (file?: File) => void;
  defaultImg?: string;
  disabled?: boolean;
  onClick?: () => void;
};
function Dropzone({ onChange, defaultImg = "", disabled, onClick }: DropzoneProps) {
  const [file, setFile] = useState("");
  const toast = useToast();
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: "image/png,imge/jpg",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length <= 0) {
        toast({ title: "File không hợp lệ! Xin hãy chọn một file!", status: "error" });
        return;
      }
      if (acceptedFiles[0].size > MAX_FILE_SIZE) {
        toast({ title: "File quá lớn, xin hãy chọn file nhỏ hơn 3mb!", status: "error" });
        return;
      }

      const imgSrc = URL.createObjectURL(acceptedFiles[0]);
      const imgInstant = new Image();
      imgInstant.src = imgSrc;
      imgInstant.onload = function () {
        if (imgInstant.width < 776 || imgInstant.height < 424) {
          toast({ title: "Kích thước ảnh không hợp lệ!", status: "error" });
        } else {
          onChange(acceptedFiles[0]);
          setFile(imgSrc);
        }
      };
    },
  });

  useEffect(() => {
    setFile(defaultImg);
  }, [defaultImg]);

  function handleClearFile() {
    URL.revokeObjectURL(file);
    setFile("");
    onChange();
  }

  return (
    <Box
      w="full"
      h="full"
      bg="#61A53326"
      border="1px solid #E2E2E2"
      borderRadius="4px"
      flexDir="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      {file ? (
        <PreView
          disabled={disabled}
          file={file}
          handleClear={handleClearFile}
          handleOpenUload={open}
        />
      ) : (
        <Box {...getRootProps({ className: "dropzone" })} w="full">
          <input {...getInputProps()} />
          <Button
            bg="#61A53326"
            onClick={onclick ? onClick : open}
            leftIcon={<UploadIcon fill="primary" />}
            w="100%"
            color="#61A533"
            fontWeight="600"
          >
            Tải tài liệu
          </Button>
        </Box>
      )}
    </Box>
  );
}

type PreViewProps = {
  disabled?: boolean;
  file?: string;
  handleClear: () => void;
  handleOpenUload: () => void;
};
function PreView(props: PreViewProps) {
  return (
    <Box
      position="relative"
      w="full"
      h="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="zone-box"
    >
      <ChakraImg src={props.file} objectFit="contain" h="full" alignSelf="center" />
      {!props.disabled && (
        <CloseIcon position="absolute" top="2" right="2" onClick={props.handleClear} />
      )}
      <Box
        w="full"
        h="full"
        position="absolute"
        display="none"
        bg="rgba(43, 43, 43, 0.6)"
        sx={{
          ".zone-box:hover &": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {!props.disabled && (
          <Button
            leftIcon={<EditIcon fill="white" />}
            border="1px solid white"
            bg="transparent"
            onClick={props.handleOpenUload}
          >
            Chỉnh sửa
          </Button>
        )}
      </Box>
    </Box>
  );
}

export { Dropzone };
