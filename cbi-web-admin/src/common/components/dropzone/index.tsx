import React, { useEffect, useState } from "react";
import { Box, Button, Image as ChakraImg, ChakraProps, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "src/common/assets/icons/iconUpload.svg";
import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEdit.svg";
import CloseIcon from "../CloseIcon";
import { useToast } from "src/common/hooks/useToast";
import { FILE_TYPE, MAX_FILE_SIZE } from "src/common/constants/common.constant";

type DropzoneProps = {
  onChange: (file?: File) => void;
  defaultImg?: string;
  disabled?: boolean;
  upTitle?: string;
  downTitle?: string;
  minDimension?: number[];
  accept?: string[];
  maxSize?: number;
  bgColor?: string;
  thumbnail?: string;
  containerStype?: ChakraProps;
  children?: React.ReactNode;
};
function Dropzone({
  onChange,
  defaultImg = "",
  disabled,
  upTitle,
  downTitle,
  accept = ["image/png", "image/jpg", "image/jpeg"],
  maxSize = MAX_FILE_SIZE,
  bgColor,
  thumbnail,
  containerStype,
  children,
}: DropzoneProps) {
  const [file, setFile] = useState("");
  const toast = useToast();
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: accept.join(","),
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length <= 0) {
        toast({ title: "File không hợp lệ! Xin hãy chọn một file!", status: "error" });
        return;
      }
      if (acceptedFiles[0].size > maxSize) {
        toast({ title: "File quá lớn, xin hãy chọn file nhỏ hơn 3mb!", status: "error" });
        return;
      }

      if (FILE_TYPE.img.includes(acceptedFiles[0].type)) {
        const imgSrc = URL.createObjectURL(acceptedFiles[0]);
        const imgInstant = new Image();
        imgInstant.src = imgSrc;
        imgInstant.onload = function () {
          // if (imgInstant.width < minDimension[0] || imgInstant.height < minDimension[1]) {
          //   toast({ title: "Kích thước ảnh không hợp lệ!", status: "error" });
          // } else {
          onChange(acceptedFiles[0]);
          setFile(imgSrc);
          // }
        };
      }
      !children && onChange(acceptedFiles[0]);
      thumbnail && setFile(thumbnail);
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

  return children ? (
    <Box {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <Box onClick={open}>{children}</Box>
    </Box>
  ) : (
    <Box
      w="full"
      h="full"
      bg="#EDF3FD"
      border="1px solid #E2E2E2"
      borderRadius="4px"
      flexDir="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      {...containerStype}
    >
      {file ? (
        <PreView
          disabled={disabled}
          file={file}
          handleClear={handleClearFile}
          handleOpenUload={open}
        />
      ) : (
        <>
          <Box {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {upTitle && (
              <Text mb="2" fontSize="14px" color="#373737">
                {upTitle}
              </Text>
            )}
            <Button bg={bgColor} onClick={open} leftIcon={<UploadIcon />} w="136px">
              Upload
            </Button>
          </Box>
          {downTitle && (
            <Text
              mt="1"
              fontSize="14px"
              fontStyle={bgColor ? "normal" : "italic"}
              color="#6A6A6A"
              px="6"
              textAlign="center"
            >
              {downTitle}
            </Text>
          )}
        </>
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
      <ChakraImg
        src={props.file}
        objectFit="contain"
        h="full"
        alignSelf="center"
        maxHeight="230px"
      />
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
