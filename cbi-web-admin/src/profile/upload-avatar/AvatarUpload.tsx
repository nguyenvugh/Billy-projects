import React, { useEffect, useState } from "react";
import { Box, Button, ChakraProps, Img } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEdit.svg";
import { useToast } from "src/common/hooks/useToast";
import { MAX_FILE_SIZE } from "src/common/constants/common.constant";
import { getFile } from "../reducer";

type AvatarUploadProps = {
  onChange: (file?: File) => void;
  defaultImg?: string;
  disabled?: boolean;
  styleProps?: ChakraProps;
  data?: object;
  editInfo: boolean;
} & any;
function AvatarUpload({
  onChange,
  defaultImg = "",
  disabled,
  data,
  editInfo,
  ...rest
}: AvatarUploadProps) {
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFile(file));
  }, [file]);
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
        if (imgInstant.width < 168 || imgInstant.height < 168) {
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
    <>
      <Box
        w="300px"
        h="full"
        bg="#EDF3FD"
        border="1px solid #E2E2E2"
        borderRadius="4px"
        flexDir="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        {...rest}
      >
        <PreView
          disabled={disabled}
          file={file}
          handleClear={handleClearFile}
          handleOpenUload={open}
          data={data}
          editInfo={editInfo}
        />
      </Box>

      {editInfo && (
        <>
          <Box {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
          </Box>
          <Button
            ml={"130px"}
            mt={"26px"}
            onClick={open}
            bg="white"
            w="136px"
            color={"#61A533"}
            border={"1px solid #61A533"}
          >
            Chọn ảnh
          </Button>
        </>
      )}
    </>
  );
}

type PreViewProps = {
  disabled?: boolean;
  file?: string;
  data?: any;
  handleClear: () => void;
  handleOpenUload: () => void;
  editInfo?: boolean;
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
      <Img
        src={props.file || props.data?.data?.avatar?.url}
        objectFit="contain"
        h="full"
        alignSelf="center"
      />
      {props.editInfo && (
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
      )}
    </Box>
  );
}
export { AvatarUpload };
