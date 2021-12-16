import React from 'react';
import {
  Icon,
  Avatar,
  Text,
  Box,
  VStack,
  HStack,
  ZStack,
  Pressable,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

const ActivityCard = (props) => {
  const { listData, avatar, username, onPress } = props;

  const created = new Date(listData.date_created);
  const modified = new Date(listData.date_modified);
  const dif = modified.getTime() - created.getTime();
  const isCreated = dif < 8640000;

  const message = isCreated ? 'created' : 'updated';
  const iconName = isCreated ? 'upload' : 'edit-3';

  const styles = { ...props };
  delete styles.listData;
  delete styles.avatar;
  delete styles.onPress;

  return (
    <ZStack minH={isCreated ? '16' : '16'}>
      {/* <ZStack minH={isCreated ? '16' : '22'}> */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        h="95%"
        w="95%"
        bg="#DEDEDE"
        borderRadius="8"
      />

      <Box
        position="absolute"
        bottom="2"
        left="2"
        h="95%"
        w="95%"
        bg="#FFF"
        borderRadius="8"
      >
        <Pressable onPress={onPress}>
          <HStack space="2" p="2">
            <Avatar size="xs" bg="secondary" source={{ uri: avatar }} />

            <VStack>
              <HStack alignItems="center" space="2">
                <Icon as={<Feather name={iconName} />} size="xs" />
                <HStack>
                  <Text>{username}</Text>
                  <Text color="secondary.500">{' ' + message}</Text>
                </HStack>
              </HStack>

              {isCreated ? (
                <VStack>
                  <Text fontSize="lg">{listData.title}</Text>
                </VStack>
              ) : (
                <VStack>
                  <Text fontSize="lg">{listData.title}</Text>
                </VStack>
              )}
            </VStack>
          </HStack>
        </Pressable>
      </Box>
    </ZStack>
  );
};

export default ActivityCard;
