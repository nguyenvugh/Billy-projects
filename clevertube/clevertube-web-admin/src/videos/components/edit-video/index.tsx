import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVideoById } from "../../hooks/useGetVideoById";
import Attributes from "./components/Attributes";
import TranscriptYoutube from "./components/TranscriptYoutube";

const EditVideo = () => {
  const params = useParams();
  const videoID = params.videoID as string;
  const instanceGetVideo = useGetVideoById(parseInt(videoID));
  const { data: dtVideo, isLoading } = instanceGetVideo;

  const [highlightWords, setHighlightWords] = useState([]);
  useEffect(() => {
    setHighlightWords(
      dtVideo?.videoHighlightWords.map((word) => {
        return word?.evDict?.word;
      }) || []
    );
  }, [JSON.stringify(dtVideo?.videoHighlightWords)]);

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <>
      <Attributes
        attributes={{
          videoID,
          title: dtVideo.name,
          description: dtVideo.desc,
          topics: dtVideo.videosToTopics.map((topic) => {
            return topic.topicKey;
          }),
          level: dtVideo.levelKey,
          feature: dtVideo.isFeature,
          highlightWords,
        }}
      />
      <TranscriptYoutube
        link={dtVideo.link}
        videoTranscripts={dtVideo.videoTranscripts.sort(
          (a, b) => a.startTime - b.startTime
        )}
        videoHighlightWords={highlightWords}
        setHighlightWords={setHighlightWords}
      />
    </>
  );
};
export default EditVideo;
