import { useState } from "react";
import { INITIAL_ERROR, INITIAL_STATE } from "src/topic/constant";
import { Controller, useForm } from "react-hook-form";
import { DataType, ErrorType, ModalAddTopicType } from "../interface";
import { useAddTopic } from "../hooks/useAddTopic";
import { usePresignImg } from "src/common/hooks/usePresignImg";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddTopic } from "../schemas/AddTopic.schema";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import DropZoneImage from "./DropZoneImage";
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

const ModalAddTopic = ({
  isOpenAddTopic,
  onCloseAddTopic,
  instanceGetAllTopics,
  instanceMultiple,
}: ModalAddTopicType) => {
  const [state, setState] = useState<DataType>(INITIAL_STATE);
  const [messError, setMessError] = useState<ErrorType>(INITIAL_ERROR);

  const {
    handleSubmit,
    control,
    reset: resetForm,
    resetField,
    formState: { errors },
  } = useForm<DataType>({
    resolver: yupResolver(AddTopic),
  });

  const maxLength = {
    key: 10,
    name: 100,
    description: 200,
  };

  const { reset: resetMultiple } = instanceMultiple;
  const { refetch } = instanceGetAllTopics;
  const { mutate: mutateAddTopic, isSuccess: successAddTopic } = useAddTopic(refetch);
  const { handleUpload } = usePresignImg();

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
    resetField("key");
    resetField("name");
    resetField("description");
    resetField("imageId");
    setState({ ...state, key: "", name: "", description: "", lang: "" });
    resetForm({ key: "", name: "", description: "" });
    onCloseAddTopic();
  };

  const onSubmit = () => {
    if (typeof state.imageId === "number") {
      mutateAddTopic(state);
      handleCloseModal();
    }
  };

  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      isOpen={isOpenAddTopic}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
          <ModalHeader color="text.primary">Create Topic</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="text.primary">Topic Key</FormLabel>
              <Controller
                name="key"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    type="text"
                    placeholder="Enter topic key"
                    maxLength={maxLength.key}
                    value={state.key}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, key: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.key?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {state?.key?.length}/{maxLength.key}
                </Text>
              </Box>
            </FormControl>

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
                    value={state.name}
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
                  {state.name.length}/{maxLength.name}
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
                    resize="none"
                    maxLength={maxLength.description}
                    value={state.description}
                    placeholder="Enter topic description"
                    size="sm"
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
                  {state.description.length}/{maxLength.description}
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
                    successAddTopic={successAddTopic}
                    onChange={onChange}
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
                    value={state.lang}
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
              Create
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

export default ModalAddTopic;
