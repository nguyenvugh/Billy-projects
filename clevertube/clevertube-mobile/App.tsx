/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { theme } from '@clvtube/common/theme/theme'
import Root from '@clvtube/common/navigators/Root'

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App
