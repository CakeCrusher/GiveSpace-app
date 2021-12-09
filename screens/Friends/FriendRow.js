import React from 'react';
import { Avatar, HStack, Text, Flex, Button } from 'native-base';

const FriendRow = ({ username, navigation }) => {
  // TODO: Change userId for navigation
  const { userId } = { userId: 2 };

  //const handleLoadLists = () => {
  //  navigation.navigate('FriendsLists', { userId, screenName: 'FriendList' });
  //};

  return (
    <HStack justifyContent="space-between">
      {/* Avatar */}
      <Flex flex="1" justifyContent="center">
        <Avatar bg="#FAA" source={{ uri: '' }}>
          EX
        </Avatar>
      </Flex>
      <Flex flex="3" justifyContent="center">
        <Text fontSize="xl">{username}</Text>
      </Flex>
      <Flex flex="1" my="2" justifyContent="flex-end">
        <Button onPress={() => {}}>Lists</Button>
      </Flex>
    </HStack>
  );
};

export default FriendRow;
