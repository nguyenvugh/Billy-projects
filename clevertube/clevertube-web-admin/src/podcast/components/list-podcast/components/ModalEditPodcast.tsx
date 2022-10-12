import Select from "react-select";
import { useEffect, useState } from "react";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataType, ModalEditPodcastType } from "src/podcast/interface";
import { EditPodcast } from "src/podcast/schemas/EditPodcast.schema";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { useEditPodcast } from "src/podcast/hooks/useEditPodcast";
import { useGetAllTopics } from "src/topic/hooks/useGetAllTopics";
import { useGetAllLevels } from "src/level-user/hooks/useGetAllLevels";
import {
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
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const ModalEditPodcast = ({
  isOpenEditPodcast,
  onCloseEditPodcast,
  instanceGetPodcast,
  instanceGetAllPodcasts,
  instanceMultiple,
}: ModalEditPodcastType) => {
  const [state, setState] = useState<DataType>({
    audioCode: "",
    audioTypeKey: "",
    title: "",
    desc: "",
    fileId: 0,
    audioThumbnailId: 0,
    topicKeys: [],
    levelKey: "",
  });

  const {
    handleSubmit,
    register,
    control,
    resetField,
    formState: { errors },
  } = useForm<DataType>({
    resolver: yupResolver(EditPodcast),
  });

  const pageTopicRedux = useAppSelector((state) => state.topic.page);
  const limitTopicRedux = useAppSelector((state) => state.topic.limit);

  const { reset } = instanceMultiple;
  const { refetch } = instanceGetAllPodcasts;
  const { mutate } = useEditPodcast(refetch);
  const { data: dtPodcast, isLoading } = instanceGetPodcast;
  const { data: dtTopics } = useGetAllTopics(pageTopicRedux, limitTopicRedux);
  const { data: dtLevels } = useGetAllLevels();

  const mapDtPodcast = dtPodcast?.data;
  const mapDtTopics = dtTopics?.data;
  const mapDtLevels = dtLevels?.data;

  const id = mapDtPodcast?.id;
  const audioCode = mapDtPodcast?.audioCode;
  const title = mapDtPodcast?.title;
  const desc = mapDtPodcast?.desc;
  const audioTypeKey = mapDtPodcast?.audioTypeKey;
  const audioThumbnailId = mapDtPodcast?.audioThumbnail?.thumbnail?.id;
  const fileId = mapDtPodcast?.audioThumbnail?.file?.id;

  const topicOptions = mapDtTopics?.items
    ?.map((item) => {
      return item?.translates?.map((item) => ({
        value: item?.topicKey,
        label: item?.name,
      }));
    })
    .flat(1);

  const levelOptions = mapDtLevels?.items
    ?.map((item) => {
      return item?.translates?.map((item) => ({
        value: item?.levelKey,
        label: item?.name,
      }));
    })
    .flat(1);

  const levelKey = mapDtPodcast?.level?.translates?.map((item) => item?.levelKey);
  const topicKeys = mapDtPodcast?.audiosToTopics
    ?.map((item) => {
      return item?.topicKey;
    })
    .flat(1);

  const levelValue = mapDtPodcast?.level?.translates?.map((item) => {
    return { value: item?.levelKey, label: item?.name };
  });

  const topicValues = mapDtPodcast?.audiosToTopics
    ?.map((item) => {
      return item?.topic?.translates?.map((item) => ({
        value: item?.topicKey,
        label: item?.name,
      }));
    })
    .flat(1);

  const inputData = {
    audioCode: state.audioCode || audioCode,
    title: state.title || title,
    desc: state.desc || desc,
    audioTypeKey: state.audioTypeKey || audioTypeKey,
    fileId: state.fileId || fileId,
    audioThumbnailId: state.audioThumbnailId || audioThumbnailId,
    topicKeys: state.topicKeys || topicKeys,
    levelKey: state.levelKey || levelKey?.join(""),
  };

  const handleCloseModal = () => {
    reset();
    resetField("title");
    resetField("fileId");
    resetField("audioThumbnailId");
    resetField("desc");
    onCloseEditPodcast();
  };

  const onSubmit = () => {
    handleCloseModal();
    mutate([id, inputData]);
  };

  useEffect(() => {
    if (isLoading) {
      setState({
        audioCode,
        audioTypeKey,
        title,
        desc,
        fileId,
        audioThumbnailId,
        topicKeys,
        levelKey,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof state.fileId === "string") {
      setState({ ...state, fileId: parseInt(state.fileId) });
    }
  }, [state.fileId]);

  useEffect(() => {
    if (typeof state.audioThumbnailId === "string") {
      setState({ ...state, audioThumbnailId: parseInt(state.audioThumbnailId) });
    }
  }, [state.audioThumbnailId]);

  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      isOpen={isOpenEditPodcast}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
          <ModalHeader color="text.primary">Edit Podcast</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Podcast Name</FormLabel>
              <Input
                {...register("title")}
                type="text"
                placeholder="Enter podcast name"
                value={inputData.title}
                onChange={({ target: { value } }) => setState({ ...state, title: value })}
              />
              <ErrorMess mt="5px" error={errors.title?.message} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Description</FormLabel>
              <Textarea
                {...register("desc")}
                resize="none"
                value={inputData.desc}
                onChange={({ target: { value } }) => setState({ ...state, desc: value })}
                placeholder="Enter podcast description"
                size="sm"
              />
              <ErrorMess mt="5px" error={errors.desc?.message} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">fileId</FormLabel>
              <Input
                {...register("fileId")}
                type="number"
                min="0"
                placeholder="Enter fileId"
                value={inputData.fileId}
                onChange={({ target: { value } }) =>
                  setState({ ...state, fileId: value })
                }
              />
              <ErrorMess mt="5px" error={errors.fileId?.message} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">audioThumbnailId</FormLabel>
              <Input
                {...register("audioThumbnailId")}
                type="number"
                min="0"
                placeholder="Enter audioThumbnailId"
                value={inputData.audioThumbnailId}
                onChange={({ target: { value } }) =>
                  setState({ ...state, audioThumbnailId: value })
                }
              />
              <ErrorMess mt="5px" error={errors.audioThumbnailId?.message} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">AudioTypeKey</FormLabel>
              <Controller
                name="fileId"
                control={control}
                render={({ field: { onChange } }) => (
                  <RadioGroup
                    value={inputData.audioTypeKey?.toString()}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, audioTypeKey: e });
                    }}
                  >
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="green" value="internet">
                        Internet
                      </Radio>
                      <Radio colorScheme="green" value="uploaded">
                        Uploaded
                      </Radio>
                    </Stack>
                  </RadioGroup>
                )}
              />
            </FormControl>

            <FormLabel color="text.primary">Level</FormLabel>
            <Controller
              name="levelKey"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  value={levelValue}
                  name="colors"
                  options={levelOptions}
                  onChange={(e) => {
                    onChange(e);
                    setState({ ...state, levelKey: e.value });
                  }}
                />
              )}
            />

            <FormControl mt={4}>
              <FormLabel color="text.primary">Topic</FormLabel>
              <Select
                defaultValue={topicValues}
                isMulti
                name="colors"
                options={topicOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) =>
                  setState({ ...state, topicKeys: e.map((item) => item?.value) })
                }
              />
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
      </form>
    </Modal>
  );
};

export default ModalEditPodcast;
