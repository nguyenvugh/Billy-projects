import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import Home from './Home'
import InputOTP from '@clvtube/components/auth/InputOTP'
import Login from '@clvtube/components/auth/Login'

type RootStackParamList = {
  Login: { navigation: any }
  InputOTP: { confirmation: any }
  Home: {}
}

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>
export type InputOTPProps = NativeStackScreenProps<
  RootStackParamList,
  'InputOTP'
>

const Stack = createNativeStackNavigator<RootStackParamList>()
const Root = () => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name={'InputOTP'}
        component={InputOTP}
        options={{ title: 'Input OTP', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Root
