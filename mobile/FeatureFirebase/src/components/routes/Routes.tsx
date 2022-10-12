import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {AuthProvider} from '../../hooks/useAuthContext';
import {Home} from '../home/Home';
import {Register} from '../register/Register';
import {Signing} from '../signing/Signing';

export type RootStackParamList = {
  Signing: undefined;
  Home: undefined;
  Register: undefined;
};
export type NavigateProps = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
function Routes() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Signing"
              component={Signing}
              options={{title: 'Signing'}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{title: 'Register'}}
            />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
  );
}

export {Routes};
