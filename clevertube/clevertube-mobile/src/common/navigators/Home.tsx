import AudioBook from '@clvtube/components/home/AudioBook'
import PlayerAudio from '@clvtube/components/home/PlayerAudio'
import YoutubeView from '@clvtube/components/home/YoutubeView'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
// import Icon from 'react-native-vector-icons/Ionicons' 

const Tab = createBottomTabNavigator()
const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName = ''

        //   if (route.name === 'Youtube') {
        //     iconName = 'logo-youtube'
        //   } else if (route.name === 'AudioBook') {
        //     iconName = 'headset-outline'
        //   } else if (route.name === 'PlayerAudio') {
        //     iconName = 'headset-outline'
        //   }

        //   // You can return any component that you like here!
        //   return <Icon name={iconName} size={size} color={color} />
        // },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="AudioBook" component={AudioBook} />
      <Tab.Screen name="Youtube" component={YoutubeView} />
      <Tab.Screen name="PlayerAudio" component={PlayerAudio} />
    </Tab.Navigator>
  )
}

export default Home
