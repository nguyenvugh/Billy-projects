import React from 'react'
import { Avatar, Box, CheckIcon, Heading, HStack, Icon } from 'native-base'
import { Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'


import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const HomeSearch = () => {
  const navigator = useNavigation()

  return (
    <HStack alignItems={'center'} justifyContent={'space-between'}>
      <HStack alignItems={'center'} space={2}>
        <Avatar
          width={'32px'}
          height={'32px'}
          borderRadius={'32px'}
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/77ba/8298/bd2ff0a419f7779827eb116ffacf6dd4?Expires=1655078400&Signature=WKeP2aPeKVV5Qki62c~OusMBnmqdoCyeGIV9GgflZKrcWhQ5TOV6B03xqwtyOxCM5ph8B3DwaAtMxuARZdKWL3XwfUf50nmZSnpq2wMKYMOTxL5oA4KGcFyBY37cmKPIFSbm0oudf4xE5AE0ZHu8oHTOMEhg4pO9fXwLlTiQvY6L076BTpMhdKcwu2Pbfc19IMp6yAHTivMtgrQ6qzbAss47dihQG46eU6M2RIJ2~XBpHjbPMncB7vsgTieaR9S~5xLG3DmTt1yEkMNVnt8V1j2aRgD7utnukq-G7VDYWe11UqXgU1~YVQqGvu-DNkfoHweWvzVA7fa3wTLST4ej~Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          }}
        />
        <Heading
          height={'24px'}
          lineHeight={'24px'}
          fontSize={'20px'}
          fontStyle={'normal'}
          fontWeight={600}
          textAlign={'center'}
          color={'black'}>
          CleverTube
        </Heading>
      </HStack>

      <AntDesign
        name="stepforward"
        size={20}
        onPress={() => navigator.navigate('Search')}
      />
    </HStack>
  )
}

export default HomeSearch
