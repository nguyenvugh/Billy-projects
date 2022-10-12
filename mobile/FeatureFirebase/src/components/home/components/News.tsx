import {Avatar, Box, HStack, Image, Text} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
import {useAuthContext} from '../../../hooks/useAuthContext';
import {NEWS_TABS} from '../constants';

function News() {
  const [selectedTab, setSelectedTab] = useState(NEWS_TABS[0]);
  let fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
    });
    animate.reset();
    animate.start();
  }, [fadeAnim, selectedTab]);

  return (
    <Box bg="white" mt="3">
      <Box w="full" display="flex" flexDir="row" justifyContent="space-between">
        {NEWS_TABS.map(tab => {
          const isSelected = tab.key === selectedTab.key;
          return (
            <Box
              onTouchStart={() => setSelectedTab(tab)}
              key={tab.key}
              p="3"
              w="1/3"
              borderBottomWidth={2}
              borderBottomColor={isSelected ? 'blue.600' : 'transparent'}
              display="flex"
              alignItems="center"
              shadow={'5px 5px 15px 5px #000'}>
              <Text fontSize="16" fontWeight="medium" color="gray.500">
                {tab.label}
              </Text>
            </Box>
          );
        })}
      </Box>

      <Animated.View // Special animatable View
        style={{
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        <ScrollView horizontal>
          <HStack p="3" overflow="scroll" space={3}>
            <NewsCards />
            <NewsCards />
            <NewsCards />
            <NewsCards />
            <NewsCards />
            <NewsCards />
          </HStack>
        </ScrollView>
      </Animated.View>
    </Box>
  );
}

function NewsCards() {
  const {user} = useAuthContext();

  return (
    <Box w="100" h="150" bg="amber.300" borderRadius="10" overflow="hidden">
      <Image
        source={{
          uri: 'https://picsum.photos/200/300?v=1',
        }}
        alt="bg"
        w="full"
        h="full"
        position="absolute"
      />
      <Avatar
        source={{uri: user?.user.photoURL || ''}}
        size={'sm'}
        borderWidth="2"
        borderColor="blue.500"
        m="2"
      />
      <Text color="white" fontWeight="medium" m="auto" mb="2">
        {user?.user.displayName}
      </Text>
    </Box>
  );
}

export {News};
