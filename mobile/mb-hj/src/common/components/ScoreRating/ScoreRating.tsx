import React, {useState} from 'react'
import {Image, Text, View} from 'react-native'
import Images from '../../assets'

const listRating = [1, 2, 3, 4, 5]

function ScoreRating({score}: {score: number}) {
  const [rating, setRating] = useState(4)
  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      {listRating.map(rate => (
        <View
          key={rate}
          style={{
            backgroundColor: rate <= rating ? '#F2B92A' : '#9B999A',
            height: 10,
            width: 15,
            marginRight: 2,
          }}
        />
      ))}
      <Image
        source={Images.circle_checked_filled}
        style={{width: 15, height: 15, marginRight: 5, marginLeft: 3}}
      />
      <Text style={{color: '#9B999A'}}>{score} điểm</Text>
    </View>
  )
}

export default ScoreRating
