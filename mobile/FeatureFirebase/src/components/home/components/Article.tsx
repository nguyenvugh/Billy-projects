import {Avatar, Box, Center, HStack, Image, Text} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ACTIONS, ICONS} from '../constants';
import {Article as IArticle} from '../interfaces';

type ArticleProps = {
  article: IArticle;
};
function Article({article}: ArticleProps) {
  return (
    <Box bg="white">
      {/* Header */}
      <Box p="3">
        <Box display="flex" flexDir="row" alignItems="center">
          <Avatar
            size="md"
            source={{
              uri: article.avatarUrl || '',
            }}
          />
          <Box ml="2">
            <Box display="flex" flexDir="row" alignItems="center">
              <Text fontSize="18" fontWeight="bold">
                {article.name}
              </Text>
              <Text ml="2" flexGrow={1}>
                {article.feeling}
              </Text>
            </Box>
            <Text color="gray.500">
              {article.time + ' ' + article.timeUnit}
            </Text>
          </Box>
        </Box>
        <Box mt="2" fontSize="16">
          {article.content}
        </Box>
      </Box>

      {/* image */}
      <Image
        source={{
          uri: article.image,
        }}
        alt="content"
        width="full"
        minH="300"
        maxH="500"
      />

      {/* footer */}
      <Box px="2" py="3">
        <HStack justifyContent="space-between">
          <HStack alignItems="center" space={1}>
            <Center>
              <Avatar.Group
                _avatar={{
                  size: '6',
                }}
                space={-2}
                max={3}>
                {article.emotions.map(emotion => {
                  return (
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: ICONS[emotion],
                      }}
                    />
                  );
                })}
              </Avatar.Group>
            </Center>
            <Text color="gray.600" fontSize="12">
              {article.interactNumber}
            </Text>
          </HStack>

          <HStack alignItems="center" space={1}>
            <Text color="gray.600" fontSize="12">
              {`${article.commentNumber} comments . ${article.sharingNumber} share`}
            </Text>
          </HStack>
        </HStack>

        <HStack borderTopWidth="0.5" borderTopColor="gray.300" mt="2">
          {ACTIONS.map(action => {
            return (
              <HStack
                alignItems="center"
                space={1}
                w="1/3"
                pt="3"
                pb="1"
                justifyContent="center">
                <Ionicons name={action.icon} size={20} color="gray" />
                <Text color="gray.600" fontSize="14">
                  {action.label}
                </Text>
              </HStack>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
}

export {Article};
