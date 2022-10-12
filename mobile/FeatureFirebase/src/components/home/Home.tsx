import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Newfeeds} from './components/Newfeeds';

export type RootTabParamList = {
  Market: undefined;
  Home: undefined;
  Notifications: undefined;
  Setting: undefined;
};
export type NavigateTabProps = NativeStackScreenProps<RootTabParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();

function Home() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Newfeeds}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Newfeeds}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="albums-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Newfeeds}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons
              name="notifications-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Newfeeds}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export {Home};
