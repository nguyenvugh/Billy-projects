import { useEffect, useState } from "react";
import { DataType, ErrorType, LengthType, ModalEditTopicType } from "../interface";
import { useEditTopic } from "../hooks/useEditTopic";
import { usePresignImg } from "src/common/hooks/usePresignImg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditTopic } from "../schemas/EditTopic.schema";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import DropZoneImage from "./DropZoneImage";
import { INITIAL_ERROR, INITIAL_LENGTH, INITIAL_STATE } from "src/topic/constant";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";

const ModalEditTopic = ({
  isOpenEditTopic,
  onCloseEditTopic,
  instanceGetTopic,
  instanceGetAllTopics,
  instanceMultiple,
}: ModalEditTopicType) => {
  const [state, setState] = useState<DataType>(INITIAL_STATE);
  const [length, setLength] = useState<LengthType>(INITIAL_LENGTH);
  const [messError, setMessError] = useState<ErrorType>(INITIAL_ERROR);

  const {
    handleSubmit,
    setValue,
    control,
    resetField,
    reset: resetForm,
    formState: { errors },
  } = useForm<DataType>({
    resolver: yupResolver(EditTopic),
  });

  const maxLength = {
    name: 100,
    description: 200,
  };

  const { data: dtGetTopic, isSuccess: successGetTopic } = instanceGetTopic;
  const { refetch } = instanceGetAllTopics;
  const { reset: resetMultiple } = instanceMultiple;
  const { mutate: mutateEditTopic } = useEditTopic(refetch);
  const { handleUpload } = usePresignImg();

  const getData = dtGetTopic?.data;
  const getDataTranslates = getData?.translates;

  const key = getData?.key;
  const description = getData?.description;
  const imageId = getData?.image?.id;
  const imageUrl = getData?.image?.url;
  const name = getDataTranslates?.map((item) => item?.name).toString();
  const lang = getDataTranslates
    ?.map((item) => item?.lang)
    .flat(1)
    .join();

  const inputData = {
    key: state.key || key,
    name: state.name || name,
    description: state.description || description,
    imageId: state.imageId || imageId,
    lang: state.lang || lang,
  };

  const handleUploadFileThumb = async (file) => {
    let thumbnail;
    if (file) {
      const thumbnailRes = await handleUpload(file);
      thumbnail = thumbnailRes?.id;
    }
    setState({ ...state, imageId: thumbnail });
  };

  const handleCloseModal = () => {
    resetMultiple();
    resetField("name");
    resetField("description");
    resetField("imageId");
    resetField("lang");
    setState({ ...state, name: "", description: "", lang: "" });
    resetForm({ name: "", description: "", lang: "" });
    onCloseEditTopic();
  };

  const onSubmit = () => {
    if (typeof state.imageId === "number") {
      mutateEditTopic([key, inputData]);
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (name || description || imageId || lang) {
      setState({ name, description, imageId, lang });
      setValue("name", name);
      setValue("description", description);
      setValue("imageId", imageId);
      setValue("lang", lang);
      setLength({
        name: name?.length,
        description: description?.length,
      });
    }
  }, [successGetTopic]);

  useEffect(() => {
    if (!state.name) {
      setLength({ ...length, name: 0 });
    } else {
      setLength({ ...length, name: state?.name?.length });
    }
  }, [state.name]);

  useEffect(() => {
    if (!state.description) {
      setLength({ ...length, description: 0 });
    } else {
      setLength({ ...length, description: state?.description?.length });
    }
  }, [state.description]);

  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      isOpen={isOpenEditTopic}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
          <ModalHeader color="text.primary">Edit Topic</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Topic Name</FormLabel>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    type="text"
                    placeholder="Enter topic name"
                    maxLength={maxLength.name}
                    defaultValue={inputData.name}
                    onKeyDown={(e) => {
                      if (e.code === "Backspace" || e.code === "Delete") {
                        setLength({ ...length, name: 0 });
                        setState({ ...state, name: "" });
                        resetField("name");
                      }
                    }}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, name: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.name?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {length.name}/{maxLength.name}
                </Text>
              </Box>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="text.primary">Description</FormLabel>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange } }) => (
                  <Textarea
                    spellCheck="false"
                    borderRadius="5px"
                    placeholder="Enter topic description"
                    maxLength={maxLength.description}
                    defaultValue={inputData.description}
                    size="sm"
                    resize="none"
                    onKeyDown={(e) => {
                      if (e.code === "Backspace" || e.code === "Delete") {
                        setLength({ ...length, description: 0 });
                        setState({ ...state, description: "" });
                        resetField("description");
                      }
                    }}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, description: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.description?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {length.description}/{maxLength.description}
                </Text>
              </Box>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="text.primary">Image Topic</FormLabel>
              <Controller
                name="imageId"
                control={control}
                render={({ field: { onChange } }) => (
                  <DropZoneImage
                    state={state}
                    setState={setState}
                    messError={messError}
                    setMessError={setMessError}
                    handleUploadFileThumb={handleUploadFileThumb}
                    onChange={onChange}
                    url={imageUrl}
                  />
                )}
              />
              <ErrorMess
                mt={"5px"}
                error={errors.imageId?.message || messError?.imageId}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="text.primary">Language</FormLabel>
              <Controller
                name="lang"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    placeholder="Choose the language"
                    value={inputData.lang}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, lang: e.target.value });
                    }}
                  >
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                  </Select>
                )}
              />
              <ErrorMess mt={"5px"} error={errors.lang?.message} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              bg="color.primary"
              _hover={{ bg: "hover.primary" }}
              color="text.secondary"
              mr={3}
            >
              Save
            </Button>
            <Button color="text.primary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
};

export default ModalEditTopic;
