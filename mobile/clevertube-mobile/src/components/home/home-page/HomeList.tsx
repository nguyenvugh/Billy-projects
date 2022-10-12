import {
  VStack,
  Text,
  Container,
  HStack,
  Image,
  Box,
  Button,
  Divider,
  Center,
  Heading,
} from 'native-base'
import React from 'react'

import ListBottom from '../ListBottom'

export default function HomeList() {
  return (
    <VStack space={5}>
      <Text
        color={'black'}
        w={'64px'}
        h={'28px'}
        lineHeight={'28px'}
        fontWeight={700}
        fontSize={'18px'}>
        Podcast
      </Text>

      <HStack alignItems="center" space={2}>
        <Image
          source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
          alt="Alternate Text"
          width={'25%'}
          height={'80px'}
          borderRadius={'12px'}
        />
        <VStack justifyContent="space-between" space={1} w={'73%'}>
          <Text
            height={'44px'}
            lineHeight={'22px'}
            fontSize={'16px'}
            fontStyle={'normal'}
            fontWeight={600}
            letterSpacing={'0.1px'}
            color={'black'}>
            NativeBase is an developer UI across Android, iOS and Web
          </Text>
          <ListBottom />
        </VStack>
      </HStack>

      <HStack alignItems="center" space={2}>
        <Image
          source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
          alt="Alternate Text"
          width={'25%'}
          height={'80px'}
          borderRadius={'12px'}
        />
        <VStack justifyContent="space-between" space={1} w={'73%'}>
          <Text
            height={'44px'}
            lineHeight={'22px'}
            fontSize={'16px'}
            fontStyle={'normal'}
            fontWeight={600}
            letterSpacing={'0.1px'}
            color={'black'}>
            NativeBase is an developer UI across Android, iOS and Web
          </Text>
          <ListBottom />
        </VStack>
      </HStack>

      <HStack alignItems="center" space={2}>
        <Image
          source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
          alt="Alternate Text"
          width={'25%'}
          height={'80px'}
          borderRadius={'12px'}
        />
        <VStack justifyContent="space-between" space={1} w={'73%'}>
          <Text
            height={'44px'}
            lineHeight={'22px'}
            fontSize={'16px'}
            fontStyle={'normal'}
            fontWeight={600}
            letterSpacing={'0.1px'}
            color={'black'}>
            NativeBase is an developer UI across Android, iOS and Web
          </Text>
          <ListBottom />
        </VStack>
      </HStack>
    </VStack>
  )
}
