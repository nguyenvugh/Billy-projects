import { Text, VStack, Box } from 'native-base';
import React from 'react'

const SearchRecommend = () => {
  return (
    <VStack
        safeArea={4}
    >
        <Text
            fontSize={'16px'}
            color={'#9B9B9B'}
            mb={'3px'}
        >
            Gợi ý tìm kiếm
        </Text>
        <Box>
            <Text 
                fontSize={'16px'} 
                color={'black'}
                py={2}
            >
                good morning
            </Text>
            <Text 
                fontSize={'16px'} 
                color={'black'}
                py={2}
            >
                shopping
            </Text>
            <Text 
                fontSize={'16px'} 
                color={'black'}
                py={2}
            >
                developer
            </Text>

        </Box>
    </VStack>
  )
}

export default SearchRecommend
