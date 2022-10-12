import { useEffect, useRef, useState } from "react";
import { toHHMMSS } from "src/common/utils/convertTime";

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { CloseIcon } from "src/common/assets/icons/close";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { arrayWithNoDuplicates } from "src/common/utils/arrayWithNoDuplicates";
import { useEditTranscript } from "src/videos/hooks/useEditTranscript";
import { ITranscriptEdit, TranscriptType } from "src/videos/interface";
import { EditTranscript } from "src/videos/schemas/EditTranscript.schema";
import Transcript from "../../add-video/Transcript";
import { useMutation } from "react-query";
import { deleteTranscript } from "src/videos/services";

const TranscriptYoutube = ({
  link,
  videoTranscripts,
  videoHighlightWords,
  setHighlightWords,
}: any) => {
  const [state, setState] = useState<TranscriptType>(() => {
    videoTranscripts = videoTranscripts.map((transcript) => {
      return {
        ...transcript,
        text: transcript.content,
        duration: transcript.duration,
        offset: transcript.startTime,
      };
    });
    return {
      videoUrl: link,
      transcripts: videoTranscripts,
    };
  });
  const [time, setTime] = useState<number>(0);
  const [sentences, setSentences] = useState<string>("");
  const [sentencesEdit, setSentencesEdit] = useState<ITranscriptEdit>(
    {} as ITranscriptEdit
  );
  const [isLoadingEditTranscript, setIsLoadingEditTranscript] = useState(false);
  const [isLoadingDeleteTranscript, setIsLoadingDeleteTranscript] = useState(false);

  const { mutate: mutateEditTranscript, isSuccess: successEditTranscript } =
    useEditTranscript();

  const { mutate: mutateDeleteTranscript, isSuccess: successDeleteTranscript } =
    useMutation(deleteTranscript);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<TranscriptType>({
    resolver: yupResolver(EditTranscript),
  });

  const playerRef = useRef<ReactPlayer>(null);

  const onSubmit = () => {};

  useEffect(() => {
    if (successEditTranscript) {
      setIsLoadingEditTranscript(false);
      const newTranscript = state.transcripts.map((transcript) => {
        if (transcript.id === sentencesEdit.id) {
          return {
            ...transcript,
            text: sentencesEdit.text,
          };
        }
        return transcript;
      });
      setState({ ...state, transcripts: newTranscript });
    }
  }, [successEditTranscript]);
  useEffect(() => {
    if (successDeleteTranscript) {
      setIsLoadingDeleteTranscript(false);
      const newTranscript = state.transcripts.filter(
        (transcript) => transcript.id !== sentencesEdit.id
      );
      setState({ ...state, transcripts: newTranscript });
      setSentencesEdit({} as ITranscriptEdit);
    }
  }, [successDeleteTranscript]);

  const handleProgress = (state) => {
    setTime(Math.floor(state.playedSeconds));
  };

  const handleSplitSentences = () => {
    if (sentences.trim() === "") return;
    const arrWord = sentences.trim().split(/\s+/);
    const myArr = arrWord.concat(videoHighlightWords);

    setHighlightWords(arrayWithNoDuplicates(myArr));
  };

  const handleRemoveWord = (word) => {
    const newArr = videoHighlightWords.filter((item) => item !== word);
    setHighlightWords(newArr);
  };

  const handleEditSentences = () => {
    setIsLoadingEditTranscript(true);
    mutateEditTranscript({
      text: sentencesEdit.text,
      duration: sentencesEdit.duration,
      offset: sentencesEdit.offset,
      transcriptId: sentencesEdit.id,
    });
  };
  const handleDeleteTranscript = () => {
    setIsLoadingDeleteTranscript(true);
    mutateDeleteTranscript(sentencesEdit.id);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="space-between" w="100%" columnGap="20px">
          <Box w="90%">
            <Input
              disabled={true}
              spellCheck="false"
              type="text"
              placeholder="Upload URL video"
              value={state.videoUrl}
            />
            <Box mt="12px" position="relative" display="flex" alignItems="center">
              <ErrorMess error={errors.videoUrl?.message} />
            </Box>
          </Box>
          <Button disabled={true}>Convert</Button>
        </Box>

        <>
          <Flex w="100%">
            <Flex w="50%"></Flex>
            <Flex w="50%" justifyContent="space-between">
              <Input
                w="70%"
                type="text"
                placeholder="Keyword"
                value={sentencesEdit?.text ? sentencesEdit?.text : ""}
                onChange={(e) => {
                  setSentencesEdit({ ...sentencesEdit, text: e.target.value });
                }}
              />
              <Button
                disabled={sentences === ""}
                onClick={() => handleDeleteTranscript()}
                isLoading={isLoadingDeleteTranscript}
                loadingText="Delete"
                spinnerPlacement="start"
              >
                Delete
              </Button>
              <Button
                disabled={sentences === ""}
                onClick={() => handleEditSentences()}
                isLoading={isLoadingEditTranscript}
                loadingText="Edit"
                spinnerPlacement="start"
              >
                Edit
              </Button>
            </Flex>
          </Flex>
          <Flex marginTop="20px" w="100%">
            <Box w="50%">
              {link ? (
                <ReactPlayer
                  ref={playerRef}
                  width="90%"
                  height="400px"
                  controls
                  url={link}
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
                    {videoHighlightWords.map((word, index) => {
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

export default TranscriptYoutube;
