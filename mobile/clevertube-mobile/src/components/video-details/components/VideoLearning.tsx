import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Box, Flex, Button, HStack } from 'native-base'
// import Carousel from 'react-native-reanimated-carousel'
import YouTube from 'react-native-youtube'
import { Text } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { VideoDetailPageProps } from '../interfaces'
import { useAppSelector } from '@clvtube/hooks/useAppSelector'
import { loopVideo } from '../redux/videoDetails'
import { useAppDispatch } from '@clvtube/hooks/useAppDispatch'
import { Carousel } from './Carousel'

const transcript = [
  {
    text: "hey there in this video we'll be",
    duration: 3680,
    offset: 480,
  },
]
const VideoLearning = ({ navigation, route }: VideoDetailPageProps) => {
  const dispatch = useAppDispatch()
  const numberTranscipt = useAppSelector(
    state => state.videoDetails.numberTranscipt,
  )
  const totalTranscipt = useAppSelector(
    state => state.videoDetails.totalTranscipt,
  )
  const isLoopVideo = useAppSelector(state => state.videoDetails.loopVideo)
  return (
    <>
      <SafeAreaView>
        <Flex
          marginLeft="20px"
          mr="20px"
          direction="row"
          justifyContent="space-between">
          <AntDesign
            name="arrowleft"
            size={25}
            onPress={() => navigation.goBack()}
          />
          <AntDesign name="setting" size={25} />
        </Flex>
        <YouTube
          apiKey="hello world"
          videoId="Z9CbQ_JILko"
          play={true}
          fullscreen={false}
          loop={isLoopVideo}
          style={styles.videoLearning}
        />
        <Box
          bg="primary.250"
          width="327px"
          margin="auto"
          marginTop="20px"
          height="245px"
          borderRadius="10px"
          padding="10px">
          <HStack>
            <Button
              width="60px"
              height="40px"
              onPress={() => console.log('hello world')}
              borderRadius="20px"
              backgroundColor="#F4F4F4">
              <Text style={styles.increaseSpeed}>0.75x</Text>
            </Button>
            <Button
              width="60px"
              height="40px"
              ml="18px"
              onPress={() => dispatch(loopVideo(true))}
              borderRadius="20px"
              backgroundColor="#F4F4F4">
              <Text style={styles.increaseSpeed}>0.75x</Text>
            </Button>
          </HStack>
          {transcript.map(item => (
            <Text style={styles.transcript}>{item.text}</Text>
          ))}
          <Text style={styles.textNumberAndTotal}>
            {numberTranscipt}/ {totalTranscipt}
          </Text>
        </Box>
      </SafeAreaView>
      <Box bg="primary.250" marginTop="15px" height="350px" padding="10px">
        <Text style={styles.textSuggestion}>Video đề xuất</Text>
        <Carousel />;
      </Box>
    </>
  )
}
const styles = StyleSheet.create({
  videoLearning: {
    height: 230,
    marginTop: 10,
  },
  transcript: {
    marginTop: 20,
    color: '#000000',
    fontWeight: '400',
    fontSize: 24,
  },
  videoSuggestion: {
    height: 250,
    margin: 'auto',
  },
  textSuggestion: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
    marginLeft: 10,
  },
  increaseSpeed: {
    fontSize: 14,
  },
  textNumberAndTotal: {
    marginTop: 60,
    color: '#9B9B9B',
    fontWeight: '400',
    fontSize: 16,
  },
})
export default VideoLearning
