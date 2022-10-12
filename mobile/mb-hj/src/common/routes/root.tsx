import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {Image} from 'react-native'
import Connection from '../../container/Connection'
import LabourExport from '../../container/LabourExport'
import Menu from '../../container/Menu'
import Tokutei from '../../container/Tokutei'
import Images from '../assets'

const Tab = createBottomTabNavigator()
const RootTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon = Images.ic_labourExport

          if (route.name === 'LabourExport') {
            icon = Images.ic_labourExport
          } else if (route.name === 'Tokutei') {
            icon = Images.ic_tokutei
          } else if (route.name === 'Menu') {
            icon = Images.ic_menu
          } else if (route.name === 'Connection') {
            icon = Images.ic_connection
          }

          // You can return any component that you like here!
          return <Image source={icon} />
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: () => <Image source={Images.ic_connection} />,
      })}>
      <Tab.Screen
        name="LabourExport"
        component={LabourExport}
        options={{tabBarLabel: 'XKLĐ'}}
      />
      <Tab.Screen
        name="Tokutei"
        component={Tokutei}
        options={{tabBarLabel: 'Đặc định1'}}
      />
      <Tab.Screen
        name="Connection"
        component={Connection}
        options={{tabBarLabel: 'Kết nối'}}
      />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  )
}

export default RootTab
