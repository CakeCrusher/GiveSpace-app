import React from 'react';
import { Avatar, HStack, Text, Flex, Button } from 'native-base';

const DisplayFriendRow = ({ user, navigation }) => {
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
        <Text fontSize="xl">{user.username}</Text>
      </Flex>
      <Flex flex="1" my="2" justifyContent="flex-end">
        <Button onPress={() => {}}>Lists</Button>
      </Flex>
    </HStack>
  );
};

export default DisplayFriendRow;
