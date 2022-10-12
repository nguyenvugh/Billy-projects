/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toHHMMSS } from "src/common/utils/convertTime";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { CloseIcon } from "src/common/assets/icons/close";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { useLazyQuery } from "src/common/hooks/useLazyQuery";
import { arrayWithNoDuplicates } from "src/common/utils/arrayWithNoDuplicates";
import { useGetAllLevels } from "src/level-user/hooks/useGetAllLevels";
import { useGetPodcast } from "src/podcast/hooks/useGetPodcast";
import { useGetAllTopics } from "src/topic/hooks/useGetAllTopics";
import { INITIAL_STATE } from "../../constant";
import { useAddVideo } from "../../hooks/useAddVideo";
import { useGetTranscrip } from "../../hooks/useGetTranscript";
import { AttributeType, ITranscript } from "../../interface";
import { AddVideo } from "../../schemas/AddVideo.schema";
import Transcript from "./Transcript";

const Attribute = () => {
  const [state, setState] = useState<AttributeType>(INITIAL_STATE);
  const [time, setTime] = useState<number>(0);
  const [isLoadingConvert, setIsLoadingConvert] = useState<boolean>(false);
  const [urlVideo, setUrlVideo] = useState<string>("");
  const [sentences, setSentences] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sentencesEdit, setSentencesEdit] = useState<ITranscript>({} as ITranscript);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AttributeType>({
    resolver: yupResolver(AddVideo),
  });

  const maxLength = {
    title: 100,
    desc: 200,
  };

  const levelKeyRef: any = useRef();
  const topicKeysRef: any = useRef();
  const playerRef = useRef<ReactPlayer>(null);

  const pageTopicRedux = useAppSelector((state) => state.topic.page);
  const limitTopicRedux = useAppSelector((state) => state.topic.limit);

  const {
    mutate: mutateAddVideo,
    isSuccess: successAddVideo,
    isError: errorAddVideo,
  } = useAddVideo();
  const { data: dtPodcast } = useGetPodcast();
  const { data: dtTopics } = useGetAllTopics(pageTopicRedux, limitTopicRedux);
  const { data: dtLevels } = useGetAllLevels();
  const { data: dtTranscript = [], execute } = useLazyQuery(useGetTranscrip);

  const mapDtTranscript = dtTranscript as ITranscript[];
  // console.log(mapDtTranscript);

  useEffect(() => {
    setState({ ...state, transcripts: mapDtTranscript });
  }, [JSON.stringify(mapDtTranscript)]);
  const mapDtTopics = dtTopics?.data;
  const mapDtLevels = dtLevels?.data;
  const mapDtPodcast = dtPodcast?.data;

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

  const onSubmit = () => {
    setIsLoading(true);
    mutateAddVideo(state);
  };

  useEffect(() => {
    if (successAddVideo) {
      cancel();
    }
    setIsLoading(false);
  }, [successAddVideo]);
  useEffect(() => {
    if (errorAddVideo) setIsLoading(false);
  }, [errorAddVideo]);

  const cancel = () => {
    levelKeyRef.current.setValue("");
    topicKeysRef.current.clearValue();
    setState(INITIAL_STATE);
    setSentences("");
    setUrlVideo("");
    setSentencesEdit({} as ITranscript);
    setTime(0);
  };

  const handleProgress = (state) => {
    setTime(Math.floor(state.playedSeconds));
  };

  const handleConvertTranscript = async () => {
    if (state.videoUrl === "") return;
    setUrlVideo(state.videoUrl);
    setIsLoadingConvert(true);
    try {
      await execute(state.videoUrl);
      setIsLoadingConvert(false);
    } catch (e) {
      setIsLoadingConvert(false);
    }
  };

  const handleSplitSentences = () => {
    if (sentences.trim() === "") return;
    const arrWord = sentences.trim().split(/\s+/);
    const myArr = arrWord.concat(state.highlightWords);

    setState({ ...state, highlightWords: arrayWithNoDuplicates(myArr) });
  };

  const handleRemoveWord = (word) => {
    const newArr = state.highlightWords.filter((item) => item !== word);
    setState({ ...state, highlightWords: newArr });
  };

  const handleEditSentences = () => {
    const newTranscript = state.transcripts.map((transcript) => {
      if (transcript.offset === sentencesEdit.offset) {
        return {
          ...transcript,
          text: sentencesEdit.text,
        };
      }
      return transcript;
    });
    setState({ ...state, transcripts: newTranscript });
  };

  return (
    <Box>
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
            {/* <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Code
            </Text>
            <Box w="80%">
              <Controller
                name="videoCode"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    spellCheck="false"
                    type="text"
                    placeholder="Enter video code"
                    maxLength={maxLength.audioCode}
                    value={state.videoCode}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setState({ ...state, videoCode: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.videoCode?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {state.videoCode.length}/{maxLength.audioCode}
                </Text>
              </Box>
            </Box>
          </Box> */}

            <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
              <Text w="20%" mt="10px">
                Title
              </Text>
              <Box w="80%">
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Input
                      spellCheck="false"
                      type="text"
                      placeholder="Enter video title"
                      maxLength={maxLength.title}
                      value={state.name}
                      onChange={(e) => {
                        onChange(e.target.value);
                        setState({ ...state, name: e.target.value });
                      }}
                    />
                  )}
                />
                <Box mt="12px" position="relative" display="flex" alignItems="center">
                  <ErrorMess error={errors.name?.message} />
                  <Text position="absolute" right="0" color="#999999" fontSize="14px">
                    {state.name.length}/{maxLength.title}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              w="100%"
              columnGap="40px"
              alignItems="center"
            >
              <Text w="20%">Feature</Text>
              <Box w="80%">
                <Controller
                  name="isFeature"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      isChecked={state.isFeature}
                      onChange={(e) => {
                        onChange(e.target.checked);
                        setState({ ...state, isFeature: e.target.checked });
                      }}
                    />
                  )}
                />
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
                      onChange={(e) => {
                        onChange(e.target.value);
                        setState({ ...state, desc: e.target.value });
                      }}
                      placeholder="Enter video description"
                      size="sm"
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
          </Box>

          <Box
            w="30%"
            columnGap="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              w="100%"
              bg="#fff"
              color="#216BCD"
              fontSize="14px"
              border="1px solid #216BCD"
              onClick={() => {
                cancel();
              }}
            >
              Cancel
            </Button>

            <Button
              w="100%"
              type="submit"
              bg="color.primary"
              _hover={{ bg: "hover.primary" }}
              color="text.secondary"
              fontSize="14px"
              spinnerPlacement="start"
              loadingText="Save"
              isLoading={isLoading}
            >
              Save Attributes
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" w="100%" columnGap="20px">
          <Box w="90%">
            <Controller
              name="videoUrl"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  spellCheck="false"
                  type="text"
                  placeholder="Upload URL video"
                  value={state.videoUrl}
                  onChange={(e) => {
                    onChange(e.target.value.trim());
                    setState({ ...state, videoUrl: e.target.value.trim() });
                  }}
                />
              )}
            />
            <Box mt="12px" position="relative" display="flex" alignItems="center">
              <ErrorMess error={errors.videoUrl?.message} />
            </Box>
          </Box>
          <Button
            spinnerPlacement="start"
            loadingText="Convert"
            // eslint-disable-next-line no-unneeded-ternary
            disabled={state.videoUrl === "" ? true : false}
            isLoading={isLoadingConvert}
            onClick={() => handleConvertTranscript()}
          >
            Convert
          </Button>
        </Box>

        <>
          <Flex w="100%">
            <Flex w="50%">
              <Flex alignItems={"center"} marginRight="20px">
                <Text marginRight={"10px"}>Start</Text>
                <Input w="150px" type="text" placeholder="----:----:----" />
              </Flex>
              <Flex alignItems={"center"}>
                <Text marginRight={"10px"}>End</Text>
                <Input w="150px" type="text" placeholder="----:----:----" />
              </Flex>
            </Flex>
            <Flex w="50%" justifyContent="space-between">
              <Input
                w="80%"
                type="text"
                placeholder="Keyword"
                value={sentencesEdit?.text ? sentencesEdit?.text : ""}
                onChange={(e) => {
                  setSentencesEdit({ ...sentencesEdit, text: e.target.value });
                }}
              />
              <Button disabled={sentences === ""} onClick={() => handleEditSentences()}>
                Edit
              </Button>
            </Flex>
          </Flex>
          <Flex marginTop="20px" w="100%">
            <Box w="50%">
              {urlVideo ? (
                <ReactPlayer
                  ref={playerRef}
                  width="90%"
                  height="400px"
                  controls
                  url={urlVideo}
                  onProgress={handleProgress}
                  onReady={() => playerRef.current?.seekTo(0, "seconds")}
                  playing={true}
                  config={{
                    file: {
                      attributes: {
                        crossorigin: "anonymous",
                      },
                    },
                  }}
                  youtubeConfig={{ playerVars: { start: 0 } }}
                />
              ) : (
                <Image src="/assets/images/video.png" mt="10px" />
              )}
            </Box>
            <Box w="50%" h="400px" overflowY="auto">
              {state.transcripts.map((transcript, index) => {
                const currentOffset = Math.floor(transcript.offset / 1000);
                let nextOffset = 0;
                if (index + 1 >= state.transcripts.length) {
                  nextOffset = Number.MAX_VALUE;
                } else {
                  nextOffset = Math.floor(state.transcripts[index + 1]?.offset / 1000);
                }
                const color =
                  currentOffset <= time && time < nextOffset ? "#216BCD" : "#1A1A1A";

                return (
                  <Transcript
                    color={color}
                    setSentences={setSentences}
                    setSentencesEdit={setSentencesEdit}
                    transcript={transcript}
                    playerRef={playerRef}
                    time={toHHMMSS(currentOffset)}
                  />
                );
              })}
            </Box>
          </Flex>
          <Flex mt="30px" justifyContent="space-between" mb="10px">
            <Text fontSize="20px" fontWeight="800">
              Keywords
            </Text>
            {/* <Flex>
            <Button
              w="100px"
              bg="#fff"
              color="#216BCD"
              fontSize="14px"
              border="1px solid #216BCD"
              mr="10px"
            >
              Cancel
            </Button>
            <Button
              w="200px"
              type="submit"
              bg="color.primary"
              _hover={{ bg: "hover.primary" }}
              color="text.secondary"
              fontSize="14px"
            >
              Save Highlights
            </Button>
          </Flex> */}
          </Flex>
          <Flex w="100%">
            <Tabs variant="enclosed" w="100%">
              <TabList>
                <Tab>Highlight keyword</Tab>
                <Tab>Highlight Sentences</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    w="100%"
                    columnGap="20px"
                    mb="10px"
                  >
                    <Box w="90%">
                      <Input
                        spellCheck="false"
                        type="text"
                        placeholder="Input sentences"
                        value={sentences}
                        onChange={(e) => {
                          setSentences(e.target.value);
                        }}
                      />
                    </Box>
                    <Button
                      // eslint-disable-next-line no-unneeded-ternary
                      disabled={sentences === "" ? true : false}
                      onClick={() => {
                        handleSplitSentences();
                      }}
                    >
                      Split up
                    </Button>
                    <Button
                      // eslint-disable-next-line no-unneeded-ternary
                      disabled={sentences === "" ? true : false}
                      // onClick={}
                    >
                      Random
                    </Button>
                  </Box>
                  <Box
                    height="370px"
                    w="100%"
                    border="1px solid #E6E6E6"
                    borderRadius="6px"
                    overflowY="auto"
                  >
                    {state.highlightWords.map((word, index) => {
                      return (
                        <Flex
                          key={index}
                          display="inline-block"
                          bg="#F5F5F5"
                          p="5px 10px"
                          m="10px"
                          justifyContent="center"
                          alignItems="center"
                          border="1px solid #E6E6E6"
                          borderRadius="6px"
                          textAlign="center"
                        >
                          <Flex alignItems="center">
                            <Text mr="10px">{word}</Text>
                            <Flex
                              onClick={() => {
                                handleRemoveWord(word);
                              }}
                              cursor="pointer"
                            >
                              <CloseIcon />
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    })}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box></Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </>
      </form>
    </Box>
  );
};

export default Attribute;
