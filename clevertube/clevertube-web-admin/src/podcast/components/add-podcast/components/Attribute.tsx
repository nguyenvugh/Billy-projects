import Select from "react-select";
import ReactPlayer from "react-player";

import { useEffect, useRef, useState } from "react";
import { ROUTER } from "src/common/constants/routes.constants";
import { Link } from "react-router-dom";
import { secondsToTime } from "src/common/utils/secondsToTime.utils";
import { INITIAL_ERROR, INITIAL_STATE } from "src/podcast/constant";

import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AttributeType, ErrorType } from "src/podcast/interface";
import { AddPodcast } from "src/podcast/schemas/AddPodcast.schema";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { usePresignImg } from "src/common/hooks/usePresignImg";
import { useAddPodcast } from "src/podcast/hooks/useAddPodcast";
import { useGetAllTopics } from "src/topic/hooks/useGetAllTopics";
import { useGetAllLevels } from "src/level-user/hooks/useGetAllLevels";
import { useGetPodcast } from "src/podcast/hooks/useGetPodcast";
import { useAddConvertToText } from "src/podcast/hooks/useAddConvertToText";
import { useGetTranscribingStatus } from "src/podcast/hooks/useGetTranscribingStatus";
import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";

import DropZoneImage from "./DropZoneImage";
import DropZoneAudio from "./DropZoneAudio";

const Attribute = () => {
  const [state, setState] = useState<AttributeType>(INITIAL_STATE);
  const [messError, setMessError] = useState<ErrorType>(INITIAL_ERROR);
  const [urlAudio, setUrlAudio] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const {
    handleSubmit,
    control,
    reset: resetForm,
    resetField,
    formState: { errors },
  } = useForm<AttributeType>({
    resolver: yupResolver(AddPodcast),
  });

  const maxLength = {
    audioCode: 10,
    title: 100,
    desc: 200,
  };

  const { PODCAST_PAGE } = ROUTER;

  const levelKeyRef: any = useRef();
  const topicKeysRef: any = useRef();

  const pageTopicRedux = useAppSelector((state) => state.topic.page);
  const limitTopicRedux = useAppSelector((state) => state.topic.limit);

  const {
    data: dtAddPodcast,
    mutate: mutateAddPodcast,
    isSuccess: successAddPodcast,
  } = useAddPodcast();
  const { handleUpload } = usePresignImg();
  const { data: dtPodcast } = useGetPodcast();
  const { data: dtLevels } = useGetAllLevels();
  const { data: dtTopics } = useGetAllTopics(pageTopicRedux, limitTopicRedux);
  const { data: dtConvertToText, mutate: mutateConvertToText } = useAddConvertToText();
  const { data: dtTranscribingStatus, mutate: mutateTranscribingStatus } =
    useGetTranscribingStatus();

  const mapDtPodcast = dtPodcast?.data;
  const mapDtTopics = dtTopics?.data;
  const mapDtLevels = dtLevels?.data;
  const mapDtConvertToText = dtConvertToText?.data;
  const mapdtTranscribingStatus = dtTranscribingStatus?.data;

  const idConvertToText = mapDtConvertToText?.TranscriptionJob?.TranscriptionJobName;
  // const statusConvertToText =
  //   mapDtConvertToText?.TranscriptionJob?.TranscriptionJobStatus;
  const statusTranscribingStatus =
    mapdtTranscribingStatus?.TranscriptionJobSummaries?.map(
      (status) => status?.TranscriptionJobStatus
    );

  // console.log("stt", statusTranscribingStatus?.join());

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

  const handleDuration = (e) => {
    const minutes = secondsToTime(e);
    setTime(minutes);
  };

  const handleUploadFileThumb = async (file) => {
    let thumbnail;
    if (file) {
      const thumbnailRes = await handleUpload(file);
      thumbnail = thumbnailRes?.id;
    }
    setState({ ...state, audioThumbnailId: thumbnail });
  };

  const handleUploadFileAudio = async (file) => {
    let audio;
    if (file) {
      const audioRes = await handleUpload(file);
      audio = audioRes?.id;
    }
    setState({ ...state, fileId: audio });
  };

  const onSubmit = () => {
    if (time.length > 0 && typeof state.fileId === "number") {
      mutateAddPodcast(state);
    }
  };

  const handleTranscribe = () => {
    mutateConvertToText({
      audioId: dtAddPodcast?.data?.id,
    });
  };

  const handleSaveToDB = () => {
    console.log("save to db");
  };

  useEffect(() => {
    if (idConvertToText) {
      mutateTranscribingStatus(idConvertToText);
    }
  }, [dtConvertToText]);

  useEffect(() => {
    if (urlAudio) {
      setState({ ...state, audioTypeKey: "uploaded" });
    }
  }, [urlAudio]);

  useEffect(() => {
    if (successAddPodcast) {
      levelKeyRef.current.setValue("");
      topicKeysRef.current.clearValue("");
      setUrlAudio("");
      setTime("");
      resetField("audioCode");
      resetField("title");
      resetField("desc");
      resetField("topicKeys");
      resetField("levelKey");
      resetField("audioThumbnailId");
      resetField("fileId");
      setState({ ...state, audioCode: "", title: "", desc: "" });
      resetForm({ audioCode: "", title: "", desc: "" });
    }
  }, [successAddPodcast]);

  useEffect(() => {
    if (state.topicKeys.length <= 0) {
      resetField("topicKeys");
    }
  }, [state.topicKeys]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        columnGap="50px"
        mb="30px"
      >
        <Box w="70%" display="flex" flexDirection="column" rowGap="30px">
          <Text fontWeight="600" fontSize="20px">
            Attribute
          </Text>
          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Code
            </Text>
            <Box w="80%">
              <Controller
                name="audioCode"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    spellCheck="false"
                    type="text"
                    placeholder="Enter podcast code"
                    maxLength={maxLength.audioCode}
                    value={state.audioCode}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, audioCode: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.audioCode?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {state.audioCode.length}/{maxLength.audioCode}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Title
            </Text>
            <Box w="80%">
              <Controller
                name="title"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    spellCheck="false"
                    type="text"
                    placeholder="Enter podcast title"
                    maxLength={maxLength.title}
                    value={state.title}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, title: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.title?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {state.title.length}/{maxLength.title}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Description
            </Text>
            <Box w="80%">
              <Controller
                name="desc"
                control={control}
                render={({ field: { onChange } }) => (
                  <Textarea
                    spellCheck="false"
                    borderRadius="5px"
                    resize="none"
                    value={state.desc}
                    maxLength={maxLength.desc}
                    placeholder="Enter podcast description"
                    size="sm"
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, desc: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.desc?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {state.desc.length}/{maxLength.desc}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Level
            </Text>
            <Box w="80%">
              <Controller
                name="levelKey"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    ref={levelKeyRef}
                    placeholder="Choose the level"
                    options={levelOptions}
                    value={levelValue}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, levelKey: e.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.levelKey?.message} />
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Topics
            </Text>
            <Box w="80%">
              <Controller
                name="topicKeys"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    isMulti
                    ref={topicKeysRef}
                    placeholder="Choose the topics"
                    options={topicOptions}
                    value={topicValues}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, topicKeys: e.map((item) => item?.value) });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.topicKeys?.message} />
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Thumbnail
            </Text>
            <Box w="80%">
              <Controller
                name="audioThumbnailId"
                control={control}
                render={({ field: { onChange } }) => (
                  <DropZoneImage
                    state={state}
                    setState={setState}
                    messError={messError}
                    setMessError={setMessError}
                    handleUploadFileThumb={handleUploadFileThumb}
                    successAddPodcast={successAddPodcast}
                    onChange={onChange}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess
                  error={errors.audioThumbnailId?.message || messError?.audioThumbnailId}
                />
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              File
            </Text>
            <Box display="flex" alignItems="flex-start" w="80%" columnGap="20px">
              <Box w="100%">
                <Controller
                  name="fileId"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <DropZoneAudio
                      state={state}
                      setState={setState}
                      setUrlAudio={setUrlAudio}
                      time={time}
                      setTime={setTime}
                      messError={messError}
                      setMessError={setMessError}
                      handleUploadFileAudio={handleUploadFileAudio}
                      successAddPodcast={successAddPodcast}
                      onChange={onChange}
                    />
                  )}
                />
                <Box mt="12px" position="relative" display="flex" alignItems="center">
                  <ErrorMess error={errors.fileId?.message || messError?.fileId} />
                </Box>
                <Button
                  w="184px"
                  bg={urlAudio ? "#216BCD" : "#999999"}
                  fontSize="14px"
                  color="#fff"
                  mt="10px"
                  disabled={successAddPodcast}
                  onClick={
                    statusTranscribingStatus === "COMPLETED"
                      ? handleSaveToDB
                      : handleTranscribe
                  }
                >
                  Transcribe
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          w="30%"
          columnGap="20px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link style={{ width: "100%" }} to={PODCAST_PAGE}>
            <Button
              w="100%"
              bg="#fff"
              color="#216BCD"
              fontSize="14px"
              border="1px solid #216BCD"
            >
              Cancel
            </Button>
          </Link>
          <Button
            w="100%"
            type="submit"
            bg="color.primary"
            _hover={{ bg: "hover.primary" }}
            color="text.secondary"
            fontSize="14px"
          >
            Save Attributes
          </Button>
        </Box>
      </Box>

      <ReactPlayer
        onDuration={handleDuration}
        url={urlAudio || ".mp3"}
        width="100%"
        height="30px"
        controls={true}
      />
    </form>
  );
};

export default Attribute;
