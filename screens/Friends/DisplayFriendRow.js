import React from 'react';
import { Pressable, Avatar, HStack, Text, Flex, Button } from 'native-base';

const DisplayFriendRow = ({ user, navigation }) => {
  //const handleLoadLists = () => {
  //  navigation.navigate('FriendsLists', { userId, screenName: 'FriendList' });
  //};

  const handleLoadAccount = () => {
    navigation.navigate('FriendAccount', {
      userId: user.id,
    });
  };

  const handleLoadLists = () => {
    navigation.navigate('FriendsLists', {
      tabName: 'Friends',
      userId: user.id,
    });
  };

  return (
    <HStack justifyContent="space-between">
      {/* Avatar */}
      <Flex flex="1" justifyContent="center">
        <Pressable onPress={handleLoadAccount}>
          <Avatar bg="#FAA" source={{ uri: '' }}>
            EX
          </Avatar>
        </Pressable>
      </Flex>
      <Flex flex="3" justifyContent="center">
        <Text fontSize="xl">{user.username}</Text>
      </Flex>
      <Flex flex="1" my="2" justifyContent="flex-end">
        <Button onPress={handleLoadLists}>Lists</Button>
      </Flex>
    </HStack>
  );
};

export default DisplayFriendRow;
