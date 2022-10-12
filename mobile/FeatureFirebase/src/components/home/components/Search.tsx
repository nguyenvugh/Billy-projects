import {Avatar, HStack, Input} from 'native-base';
import React from 'react';
import {useAuthContext} from '../../../hooks/useAuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
const widthInput = Dimensions.get('screen').width - 110;

function Search() {
  const {user} = useAuthContext();
  return (
    <HStack maxW="full" space={3} alignItems="center" p="2" bg="white">
      <Avatar source={{uri: user?.user.photoURL || ''}} size={'md'} />
      <Input
        placeholder="What are you thinking?"
        borderRadius={20}
        w={widthInput}
        h="10"
      />
      <Ionicons name="images-outline" size={24} color="green" />
    </HStack>
  );
}

export {Search};
