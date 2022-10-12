import * as React from 'react'
import {Dimensions, Pressable, View} from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel'

const {width, height} = Dimensions.get('window')

const PAGE_WIDTH = 150
const PAGE_HEIGHT = 40
const DATA = ['Nông nghiệp', 'May (quần áo)', 'May lót tấm ghế']

function AnimTabBar() {
  const r = React.useRef<ICarouselInstance>(null)
  const [loop, setLoop] = React.useState(false)

  return (
    <View>
      <View style={{backgroundColor: '#f5f5f5'}}>
        <Carousel
          key={`${loop}`}
          ref={r}
          loop={loop}
          style={{
            width: width - 50,
            height: PAGE_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={DATA}
          renderItem={({item, animationValue}) => {
            return (
              <Item
                animationValue={animationValue}
                label={item}
                onPress={() =>
                  r.current?.scrollTo({
                    count: animationValue.value,
                    animated: true,
                  })
                }
              />
            )
          }}
        />
      </View>
    </View>
  )
}

export default AnimTabBar

interface Props {
  animationValue: Animated.SharedValue<number>
  label: string
  onPress?: () => void
}

const Item: React.FC<Props> = props => {
  const {animationValue, label, onPress} = props

  const translateY = useSharedValue(0)

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    )

    return {
      opacity,
    }
  }, [animationValue])

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    )

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['grey', 'black', 'grey'],
    )

    return {
      transform: [{scale}, {translateY: translateY.value}],
      color,
    }
  }, [animationValue, translateY])

  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-8, {duration: 250})
  }, [translateY])

  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, {duration: 250})
  }, [translateY])

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          containerStyle,
        ]}>
        <Animated.Text style={[{color: '#26292E'}, labelStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}
