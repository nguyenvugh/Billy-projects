
import { Box, Heading, HStack, Text, VStack } from 'native-base'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SearchHistory = () => {
    return (
        <VStack 
            safeArea={4} 
            borderBottomWidth={1}
            borderBottomColor={'gray.200'}
        >
            <Text
                fontSize={'16px'}
                color={'#9B9B9B'}
            >
                Lịch sử tìm kiếm
            </Text>
            <Box py={2}>
                <HStack 
                    alignItems={'center'} 
                    justifyContent={'space-between'} 
                    py={1} 
                >
                    <Text
                        fontSize={'16px'}
                        color={'black'}
                        >
                        education
                    </Text>
                    <AntDesign name="close" />
                </HStack>
                <HStack 
                    alignItems={'center'} 
                    justifyContent={'space-between'} 
                    py={1} 
                >
                    <Text
                        fontSize={'16px'}
                        color={'black'}
                        >
                        travel
                    </Text>
                    <AntDesign name="close" />
                </HStack>
                <HStack 
                    alignItems={'center'} 
                    justifyContent={'space-between'} 
                    py={1} 
                >
                    <Text
                        fontSize={'16px'}
                        color={'black'}
                        >
                        video nói chào buổi sáng
                    </Text>
                    <AntDesign name="close" />
                </HStack>
            </Box>
            <Text
                fontSize={'16px'}
                color={'#9B9B9B'}
                textAlign={'center'}
            >
                Xoá lịch sử tìm kiếm
            </Text>
        </VStack>
  )
}

export default SearchHistory

