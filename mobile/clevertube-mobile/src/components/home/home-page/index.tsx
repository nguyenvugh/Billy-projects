import React from 'react'
import { ScrollView, VStack } from 'native-base'
import HomeSearch from './HomeSearch'
import HomeSlider from './HomeSlider'
import HomeList from './HomeList'
import { SafeAreaView } from 'react-native'
import { HomePageProps } from '@clvtube/common/navigators/Root'

const HomePage = ({ navigation, route }: HomePageProps) => {
  return (
    <SafeAreaView>
      <VStack space={5} safeAreaX={4}>
        <HomeSearch />
        <HomeSlider navigation={navigation} route={route} />
        <HomeList />
      </VStack>
    </SafeAreaView>
  )
}

export default HomePage
