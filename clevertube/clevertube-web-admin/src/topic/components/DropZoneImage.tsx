import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Image, Link } from "@chakra-ui/react";
import { AddImageIcon } from "src/common/assets/icons/addimage";
import { byteToMb } from "src/common/utils/byteToMb.utils";
import { DropZoneImageTopicType } from "src/topic/interface";

const DropZoneImage = ({
  state,
  setState,
  messError,
  setMessError,
  handleUploadFileThumb,
  successAddTopic,
  onChange,
  url,
}: DropZoneImageTopicType) => {
  const [files, setFiles] = useState<any>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png", ".gif"],
    },
    maxFiles: 1,
    maxSize: 2000000,
    // maxSize: 31457280,
    onDropRejected: () => {
      setMessError({
        ...messError,
        imageId: "The file format is incorrect or the file size has been exceeded",
      });
    },
    onFileDialogCancel: () => {
      setMessError({
        ...messError,
        imageId: "",
      });
      setState({ ...state, imageId: 0 });
      setFiles([]);
    },
    onDrop: (acceptedFiles) => {
      setMessError({
        ...messError,
        imageId: "",
      });
      onChange(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumb = files.map((file) => (
    <Box key={file.name}>
      <Image
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file);
          setState({ ...state, imageId: file.name });
        }}
      />
    </Box>
  ));

  const thumb2 = <Image src={url} />;

  const name = files.map((file) => (
    <Box key={file.name}>
      <Box>
        {file.name} - {byteToMb(file.size)} MB
      </Box>
    </Box>
  ));

  const name2 = <Box>{url}</Box>;

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file));
  }, []);

  useEffect(() => {
    files.map((file) => handleUploadFileThumb(file));
  }, [files]);

  useEffect(() => {
    if (successAddTopic) {
      setFiles([]);
    }
  }, [successAddTopic]);

  return (
    <Box>
      <Box
        w="100%"
        h="200px"
        px="20px"
        py="20px"
        borderRadius="5px"
        textAlign="center"
        border="2px dashed #E6E6E6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {url?.length > 0 || acceptedFiles.length > 0 || files.length > 0 ? (
          <Box w="100%" h="100%" display="flex" alignItems="center" columnGap="20px">
            <Box w="30%">{files.length > 0 ? thumb : thumb2}</Box>
            <Box w="70%" color="#999999" fontSize="14px">
              {files.length > 0 ? name : name2}
            </Box>
          </Box>
        ) : (
          <Box
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <AddImageIcon boxSize="7" stroke="#216BCD" />

            <Box color="#999999" fontSize="18px">
              Drop your image here, of{" "}
              <Link cursor="pointer" color="#216BCD">
                Browse
              </Link>
            </Box>

            <Box color="#999999" fontSize="14px">
              Use a JPG, PNG file is less than 30MB
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DropZoneImage;
