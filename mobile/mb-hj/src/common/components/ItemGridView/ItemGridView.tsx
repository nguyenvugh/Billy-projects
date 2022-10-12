import React from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Images from '../../assets'
import ScoreRating from '../ScoreRating/ScoreRating'

const {width} = Dimensions.get('window')

function ItemGridView({item, index}) {
  return (
    <View
      style={{
        width: '48%',
      }}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: item.image}}
        style={{
          height: (width - 40) / 2,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            backgroundColor: '#AFC536',
            width: 50,
            textAlign: 'center',
            margin: 10,
          }}>
          {item.tag}
        </Text>
        <View>
          <Text
            style={{
              backgroundColor: 'white',
              textAlign: 'center',
              marginHorizontal: 10,
              color: '#F2B92A',
              marginVertical: 5,
              width: '70%',
            }}>
            Thưc nhận: {item.offer}
          </Text>
          <Text
            style={{
              backgroundColor: '#0D8DC8',
              textAlign: 'center',
              marginHorizontal: 10,
              marginBottom: 10,
              color: 'white',
              width: '70%',
            }}>
            Thực nhận: {item.real_receive}
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          padding: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>{item.title}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 12, color: '#9B999A'}}>
            Đăng bởi: <Text style={{color: '#0D8DC8'}}>{item.posted_by}</Text>{' '}
          </Text>
          <Image source={Images.logo} style={{height: 20, width: 40}} />
        </View>
        <View style={{
          marginVertical: 5
        }}>
          <ScoreRating score={4} />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 5,
          }}>
          <Image
            source={Images.ic_location_filled}
            style={{width: 15, height: 15, marginRight: 5}}
          />
          <Text style={{color: '#9B999A'}}>Okayama</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#0D8DC8',
            padding: 10,
            borderRadius: 4,
            marginVertical: 10,
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Tư vấn miễn phí
          </Text>
        </TouchableOpacity>
        <Text style={{color: '#9B999A', fontSize: 12, marginVertical: 5}}>
          Hạn ứng tuyển: {item.expired_apply}
        </Text>
      </View>
    </View>
  )
}

export default ItemGridView
