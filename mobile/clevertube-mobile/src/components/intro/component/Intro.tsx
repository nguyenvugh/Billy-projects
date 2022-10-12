import { slider } from '@clvtube/mocks/dataOnboarding';
import { Box, Button, Center, Text, VStack } from 'native-base';
import React, { useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';


const { width, height } = Dimensions.get('window')


const renderItemSlider = ({ item, index }) => {
  return (
      <VStack >
          <Image
              key={index}
              source={item?.image}
              style={{height: height * 0.5, width, resizeMode: 'contain'}}
          />
          <Center marginBottom={5}> 
            <Text
              color={'neutral.800'} 
              fontSize={'22px'}
              fontWeight={600}
              lineHeight={'46px'}
              textAlign={'center'}
            >
              {item?.title}
            </Text>
          </Center>
      </VStack>
  )
}

const Intro = () => {
  const [index, setIndex] = useState(0)
  const refCarousel = useRef<Carousel<any>>(null)

  const navigator = useNavigation()

  const nextSlider = () => {
    if(index !== slider.length - 1) {
        const nextSlideIndex = index + 1;
        setIndex(nextSlideIndex);
        refCarousel?.current?.snapToItem(nextSlideIndex)
    }
    else {
      navigator.navigate('Search')
    }
  }

  return (
    <VStack bgColor={'white'} height={height} justifyContent={'space-evenly'}>
      <VStack safeAreaY={10} flex={1}>
        <Carousel 
          layout={'default'}
          ref={refCarousel}
          data={slider}
          renderItem={({item, index})=>
            renderItemSlider({item, index})
          }
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => setIndex(index)}
        />
        <Pagination 
          dotsLength={slider.length}
          activeDotIndex={index}
          // carouselRef={refCarousel}
          // containerStyle={{width: width}}
          dotStyle={{
            height: 8,
            width: 40,
            backgroundColor: '#216BCD',
            marginHorizontal: -4,
            borderRadius: 4,
          }}
          inactiveDotStyle={{
            height: 8,
            width: 8,
            backgroundColor: '#D9D9D9',
            marginHorizontal: -4,
            borderRadius: 4,
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
          // tappableDots={true}
        />
      </VStack>

      <Box marginBottom={8} paddingBottom={8} safeAreaX={4}>
        <TouchableOpacity>
          <Button
            bgColor={'primary.100'}
            borderRadius={'8px'}
            height={'48px'}
            _text={{
              fontSize: '14px',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#FDFDFD',
            }}
            onPress={nextSlider}
            >
              {
                index == slider.length - 1 ? 'Bắt đầu' : 'Tiếp theo'
              }
          </Button>
        </TouchableOpacity>
      </Box>
    </VStack>
  )
}

export default Intro