import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Link } from "@chakra-ui/react";
import { SoundIcon } from "src/common/assets/icons/sound";
import { byteToMb } from "src/common/utils/byteToMb.utils";

const DropZoneAudio = ({
  state,
  setState,
  setUrlAudio,
  time,
  setTime,
  setMessError,
  messError,
  handleUploadFileAudio,
  successAddPodcast,
  onChange,
}) => {
  const [files, setFiles] = useState<any>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3"],
    },
    maxFiles: 1,
    onDropRejected: () => {
      setMessError({
        ...messError,
        fileId: "The file format is incorrect or the file size has been exceeded",
      });
    },
    onFileDialogCancel: () => {
      setMessError({
        ...messError,
        fileId: "",
      });
      setState({ ...state, fileId: 0 });
      setFiles([]);
      setUrlAudio("");
      setTime("");
    },
    onDrop: (acceptedFiles) => {
      setMessError({
        ...messError,
        fileId: "",
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

  const name = files.map((file) => (
    <Box key={file.name}>
      {file.name} - {byteToMb(file.size)} MB
    </Box>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file));
  }, []);

  useEffect(() => {
    if (files) {
      files.map((file) => {
        const revoke = URL.revokeObjectURL(file);
        setState({ ...state, fileId: file });
        setUrlAudio(file?.preview);
        return revoke;
      });
    }
  }, [files]);

  useEffect(() => {
    if (time.length > 0) {
      files.map((file) => handleUploadFileAudio(file));
    }
  }, [time]);

  useEffect(() => {
    if (successAddPodcast) {
      setFiles([]);
    }
  }, [successAddPodcast]);

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
        {acceptedFiles.length === 0 || files.length === 0 ? (
          <Box
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <SoundIcon boxSize="7" stroke="#216BCD" />

            <Box color="#999999" fontSize="18px">
              Drop your audio here, of{" "}
              <Link cursor="pointer" color="#216BCD">
                Browse
              </Link>
            </Box>

            <Box color="#999999" fontSize="14px">
              Use a MP3 file
            </Box>
          </Box>
        ) : (
          <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box color="#999999" fontSize="14px">
              {name}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DropZoneAudio;
