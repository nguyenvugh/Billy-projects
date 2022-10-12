import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Text,
  VStack,
} from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Pressable } from 'react-native'
import YouTube from 'react-native-youtube'
import Carousel from 'react-native-snap-carousel'
import Lodash from 'lodash'
import Tts from 'react-native-tts'
import { sampleTranscript } from '@clvtube/mocks/sampleTranscript'

// When user touch and move slide, we need to pause video
const renderItemSlide = ({ item, speakWord, index }) => {
  const words = Lodash.words(item.text)

  return (
    <Box alignItems={'center'} key={index}>
      <HStack>
        {words.map((word, idx) => {
          return (
            <Pressable key={idx} onPress={() => speakWord(word)}>
              <Text fontSize={'lg'}>{`${word} `}</Text>
            </Pressable>
          )
        })}
      </HStack>
    </Box>
  )
}

const { width } = Dimensions.get('window')
const YoutubeView = () => {
  const [dataTranscript, setDataTranscript] = useState(sampleTranscript)
  const refYoutube = useRef<YouTube>(null)
  const refCarousel = useRef<Carousel<any>>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isProgress, setIsProgress] = useState(false)


  const handleSnapToItem = (index: number) => {
    if (index !== currentIndex) {
      const transcript = dataTranscript[index]
      refYoutube?.current?.seekTo(transcript.offset / 1000)
      setCurrentIndex(index)
    }
  }

  const handleProgress = (time: number) => {
    const timeMili = time * 1000
    const indexTranscript = Lodash.findLastIndex(dataTranscript, obj => {
      return timeMili >= obj.offset
    })

    if (currentIndex < indexTranscript) {
      refCarousel?.current?.snapToItem(indexTranscript)
      setCurrentIndex(indexTranscript)
    }
  }

  const speakWord = (word: string) => {
    Tts.speak(word)
  }

  
  useEffect(() => {
    Tts.addEventListener('tts-start', event => {})
    Tts.addEventListener('tts-progress', event => {})
    Tts.addEventListener('tts-finish', event => {})
    Tts.addEventListener('tts-cancel', event => {})

    return () => {
      // remove listener here.
    }
  }, [])

  return (
    <Container>
      <VStack space={2}>
        <YouTube
          ref={refYoutube}
          apiKey={'AIzaSyBc9fuDCQVHKOv-5D4IQh0IqobFpTKhRFs'}
          videoId="IdQMcHLXGuc" // The YouTube video ID
          play={false} // control playback of video with true/false
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop={false} // control whether the video should loop when ended
          onProgress={e => {
            handleProgress(e.currentTime)
          }}
          style={{ alignSelf: 'stretch', height: (width * 9) / 16, width }}
        />

        <Carousel
          ref={refCarousel}
          data={dataTranscript}
          renderItem={({ item, index }) =>
            renderItemSlide({ item, speakWord, index })
          }
          sliderWidth={width}
          itemWidth={width}
          inactiveSlideScale={1}
          onSnapToItem={handleSnapToItem}
        />

        <Button onPress={() => speakWord('hello world!')}>
          Speech Hello world
        </Button>
      </VStack>
    </Container>
  )
}

export default YoutubeView
