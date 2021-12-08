import React from 'react';
import { VStack, Text, Button } from 'native-base';

const FriendRow = ({ username, navigation }) => {
  // TODO: Change userId for navigation
  const { userId } = { userId: 2 };

  const handleLoadLists = () => {
    navigation.navigate('FriendsLists', { userId, screenName: 'FriendList' });
  };

  return (
    <VStack>
      {/* Avatar */}
      <Text fontSize="xl">{username}</Text>
      <Button onPress={handleLoadLists}>Lists</Button>
    </VStack>
  );
};

export default FriendRow;
