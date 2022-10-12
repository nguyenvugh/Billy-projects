import React from 'react'

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

import Intro from '@clvtube/components/intro/component/Intro'
import Home from '../../common/navigators/Home'
import SearchPage from '../../components/search'
import VideoDetailPage from '@clvtube/components/video-details/components/index'
import {
  HOME_PAGE,
  SEARCH_PAGE,
  VIDEO_DETAILS_PAGE,
} from '../constants/route.constants'

export type RootStackParamList = {
  Login: { navigation: any }
  InputOTP: { confirmation: any }
  Intro: {}
  Home: {}
  Search: {}
  VideoDetails: {}
}

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>
export type InputOTPProps = NativeStackScreenProps<
  RootStackParamList,
  'InputOTP'
>
export type HomePageProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Stack = createNativeStackNavigator<RootStackParamList>()

const Root = () => {
  return (
    <Stack.Navigator initialRouteName={'Intro'}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_PAGE}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SEARCH_PAGE}
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={VIDEO_DETAILS_PAGE}
        component={VideoDetailPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Root
