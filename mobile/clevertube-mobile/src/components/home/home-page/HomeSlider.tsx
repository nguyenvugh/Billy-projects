import React, { useRef, useState } from 'react'

import { Text, VStack, Image, Box, HStack } from 'native-base'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { VIDEO_DETAILS_PAGE } from '@clvtube/common/constants/route.constants'
import { HomePageProps } from '@clvtube/common/navigators/Root'

import { imagePath } from '@clvtube/common/constants/imagePath'

const slider = [
  {
    id: '1',
    image: imagePath.ONBOARDING1,
    title:
      'Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
  },
  {
    id: '2',
    image: imagePath.ONBOARDING2,
    title:
      'Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
  },
  {
    id: '3',
    image: imagePath.ONBOARDING3,
    title:
      'Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
  },
]

const renderItemSlide = ({ item, index }) => {
  return (
    <VStack>
      <Image
        key={index}
        source={item?.image}
        style={{ height: height * 0.75, width, resizeMode: 'contain' }}
        alt="taodzo"
      />
      <Text color={'black'}>{item?.title}</Text>
    </VStack>
  )
}

const { width, height } = Dimensions.get('window')

const HomeSlider = ({ navigation, route }: HomePageProps) => {
  const refCarousel = useRef<Carousel<any>>(null)

  const [dataSilder, setDataSilder] = useState(slider)

  const onMoveVideoDetail = () => {
    navigation.navigate('VideoDetails', VIDEO_DETAILS_PAGE)
  }

  return (
    <VStack space={3}>
      <Text
        color={'black'}
        w={'64px'}
        h={'28px'}
        lineHeight={'28px'}
        onPress={onMoveVideoDetail}
        fontWeight={700}
        fontSize={'18px'}>
        Video
      </Text>

      <Carousel
        layout={'default'}
        ref={refCarousel}
        data={dataSilder}
        renderItem={renderItemSlide}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideScale={1}
      />
    </VStack>
  )
}

export default HomeSlider
