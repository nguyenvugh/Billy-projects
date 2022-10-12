import React from 'react'
import { Button, View } from 'react-native'
import { MotiView } from 'moti'
import { Text } from 'native-base'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const PlayerAudio = () => {
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    }
  })

  /**
   * We can try to using native base animation.
   * https://docs.nativebase.io/presence-transition
   */

  return (
    <View>
      <Animated.View
        style={[
          { width: 50, height: 50, backgroundColor: 'red' },
          animatedStyles,
        ]}
      />
      <Button
        onPress={() => (offset.value = withSpring(Math.random()))}
        title="Move"
      />

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}>
        <Text color='primary.100'>Hello</Text>
      </MotiView>
    </View>
  )
}

export default PlayerAudio
