/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {NativeBaseProvider, Box} from 'native-base'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import RootTab from './src/common/routes/root'

global.__reanimatedWorkletInit = () => {} // eslint-disable-line no-use-before-define

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootTab />
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  )
}

export default App
