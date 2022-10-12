import React from 'react'
// import { Input, Text } from 'native-base'
// import { SafeAreaView } from 'react-native'
import { VideoDetailPageProps } from '../interfaces'
import VideoLearning from './VideoLearning'

const VideoDetailPage = ({ navigation, route }: VideoDetailPageProps) => {
  return <VideoLearning navigation={navigation} route={route} />
}
export default VideoDetailPage
