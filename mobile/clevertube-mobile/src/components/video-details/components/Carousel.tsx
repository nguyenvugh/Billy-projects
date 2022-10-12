import React, { useState, useRef } from 'react'
import { FlatList, StyleSheet, Dimensions } from 'react-native'
import YouTube from 'react-native-youtube'
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated'
import { ItemProps } from '../interfaces'

const SRC_WIDTH = Dimensions.get('window').width
const CARD_LENGTH = SRC_WIDTH * 0.8
const SPACING = SRC_WIDTH * 0.02
const SIDE_CARD_LENGTH = (SRC_WIDTH * 0.18) / 2

const Item = ({ index, scrollX }: ItemProps) => {
  const youtubeRef = useRef<YouTube>(null)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const size = useSharedValue(0.8)
  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ]
  size.value = interpolate(scrollX, inputRange, [0.8, 1, 0.8])
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: size.value }],
    }
  })
  const handleYoutubeVideo = async () => {
    setIsPlayingVideo(true)
    const currentTime = await youtubeRef?.current?.getCurrentTime()
    if (currentTime === 2) setIsPlayingVideo(false)
  }
  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          marginLeft: index === 0 ? SIDE_CARD_LENGTH : SPACING,
          marginRight: index === 2 ? SIDE_CARD_LENGTH : SPACING,
        },
      ]}>
      <YouTube
        ref={youtubeRef}
        apiKey="hello world"
        videoId="Z9CbQ_JILko"
        play={isPlayingVideo}
        fullscreen={false}
        loop={false}
        onProgress={handleYoutubeVideo}
        style={styles.videoLearning}
      />
    </Animated.View>
  )
}

export const Carousel = () => {
  const [scrollX, setScrollX] = useState(0)
  return (
    <Animated.View>
      <FlatList
        data={[1, 2, 3]}
        horizontal={true}
        renderItem={({ item, index }) => {
          return <Item index={index} scrollX={scrollX} />
        }}
        onScroll={e => setScrollX(e.nativeEvent.contentOffset.x)}
      />
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  videoLearning: {
    height: 200,
  },
  card: {
    width: 300,
    height: 250,
    overflow: 'hidden',
  },
})
