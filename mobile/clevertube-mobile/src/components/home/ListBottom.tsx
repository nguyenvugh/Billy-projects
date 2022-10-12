import React from 'react'
import { HStack, Center, Text, Heading, Box, CheckIcon } from 'native-base';

const ListBottom = () => {
  return (
    <HStack justifyContent='space-between' alignItems={'center'}>
    <HStack>
        <CheckIcon size="5" mt="0.5" color="emerald.500" />
        <Text 
          fontSize={'14px'}
          color={'#9B9B9B'}
          letterSpacing={'0.25px'}
        >
          01:30
        </Text>
    </HStack>
    <Heading
        color='#9B9B9B' 
        isTruncated 
        width="78px" 
        height='25px' 
        lineHeight='23px' 
        borderColor='#9B9B9B' 
        top="2px" 
        borderWidth='1px' 
        fontWeight='400' 
        fontSize='13px' 
        letterSpacing='0.25px'
        pl="8px" 
        pr="3px" 
        borderRadius='13px'
    >
        Entertaiment
    </Heading>
</HStack>
  )
}

export default ListBottom