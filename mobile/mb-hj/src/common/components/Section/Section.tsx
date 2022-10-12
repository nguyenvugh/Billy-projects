import React, {useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import ItemGridView from '../ItemGridView/ItemGridView'

function Section({dataJob, title}) {
  const [isShowMore, setIsShowMore] = useState(false)
  return (
    <View>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
      }}>{title}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {dataJob.map((item, index) => {
          if (index > 3 && !isShowMore) return
          return <ItemGridView key={index} item={item} index={index} />
        })}
      </View>
      {!isShowMore && (
        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}
          onPress={() => setIsShowMore(!isShowMore)}>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 10,
              color: '#0D8DC8',
            }}>
            See more
          </Text>
        </TouchableOpacity>
      )}
      {isShowMore && (
        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}
          onPress={() => setIsShowMore(!isShowMore)}>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 10,
              color: '#0D8DC8',
            }}>
            See less
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Section
