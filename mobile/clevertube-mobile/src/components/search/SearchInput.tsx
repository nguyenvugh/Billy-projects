import { Box, HStack, Input } from 'native-base'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
import { useNavigation } from '@react-navigation/native';

const SearchInput = () => {
    const navigation = useNavigation()

  return (
        <HStack 
            justifyContent={'space-between'}
            height={'48px'}
            borderBottomWidth={'2px'}
            borderBottomColor={'gray.200'}
            alignItems={'center'}
            safeAreaX={4}
            space={2}
        >
            <Box>
                <AntDesign name="arrowleft" size={25} onPress={()=>navigation.goBack()} />
            </Box>
            <Box 
                flexGrow={1}
            >
                <Input 
                    variant={'outline'} 
                    color={'black'}
                    placeholder="Tìm kiếm" 
                    textAlignVertical={'center'}
                    borderWidth={0}
                    bgColor={'white'}
                    _focus={{
                        bg: 'white'
                    }}
                    fontSize={'16px'}
                    mx={'5px'}
                />
            </Box>
            <Box>
                <Foundation name="microphone" size={25}/>
            </Box>
            <Box>
                <AntDesign name="search1" size={25}/>
            </Box>
        </HStack>
  )
}

export default SearchInput
