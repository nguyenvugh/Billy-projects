import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from '@clvtube/components/home/home-page/index'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeVideo from '@clvtube/components/home/home-video'
import HomePodcast from '@clvtube/components/home/home-podcast/index'

const Tab = createBottomTabNavigator()

const Home = () => {
  return (
    <Tab.Navigator
      //   initialRouteNames={"Trang chủ"}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Trang chủ"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => {
            return <AntDesign name="search1" size={20} />
          },
        }}
      />

      <Tab.Screen
        name="Video"
        component={HomeVideo}
        options={{
          tabBarIcon: ({ focused }) => {
            return <AntDesign name="search1" size={20} />
          },
        }}
      />

      <Tab.Screen
        name="Podcast"
        component={HomePodcast}
        options={{
          tabBarIcon: ({ focused }) => {
            return <AntDesign name="search1" size={20} />
          },
        }}
      />

      <Tab.Screen
        name="Tài khoản"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => {
            return <AntDesign name="search1" size={20} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default Home
