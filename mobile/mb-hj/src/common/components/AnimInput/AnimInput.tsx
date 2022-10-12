import React from 'react'
import {Dimensions, Image, TextInput, View} from 'react-native'
import Images from '../../assets'

const {width, height} = Dimensions.get('window')

function AnimInput() {
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <TextInput
        placeholder="Tìm kiếm ngành nghề, công việc, ..."
        style={{
          height: 50,
          width: width - 90,
          borderColor: '#D2D2D2',
          borderWidth: 1,
          paddingHorizontal: 15,
        }}
      />
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#0D8DC8',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={Images.search} style={{width: 30, height: 30}} />
      </View>
    </View>
  )
}

export default AnimInput
