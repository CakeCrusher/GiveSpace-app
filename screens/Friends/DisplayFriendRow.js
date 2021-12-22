import React, { useState } from 'react';
import {
  Pressable,
  Avatar,
  HStack,
  Text,
  Flex,
  Button,
  Icon,
  Spinner,
} from 'native-base';
import {
  friendState,
  acceptFriendRel,
  deleteFriendRel,
} from '../../utils/helperFunctions';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { acceptFriend, removeFriend } from '../../redux/actions/friends';

const DisplayFriendRow = ({
  friend,
  navigation,
  friendsState,
  userState,
  acceptFriend,
  removeFriend,
  isPending,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  //const handleLoadLists = () => {
  //  navigation.navigate('FriendsLists', { userId, screenName: 'FriendList' });
  //};

  const handleLoadAccount = () => {
    console.log('handleLoadAccount');
    navigation.navigate('FriendAccount', {
      userId: friend.id,
    });
  };

  const handleLoadLists = () => {
    navigation.navigate('FriendsLists', {
      tabName: 'Friends',
      userId: friend.id,
    });
  };

  const handleAcceptFriend = async () => {
    setIsLoading(true);
    const friendRes = await acceptFriendRel(userState.id, friend.id);
    console.log('!friendRes', friendRes);
    acceptFriend(friendRes.data.update_friend_rel.returning[0].user);
    setIsLoading(false);
  };

  const handleRemoveFriend = async (type) => {
    setIsLoading(true);
    const fetchRes = await deleteFriendRel(userState.id, friend.id);
    console.log('!fetchRes', fetchRes);
    removeFriend(friend.id, type);
    setIsLoading(false);
  };

  console.log(friend.profile_pic_url);

  return (
    <HStack pb="5" justifyContent="space-between">
      {/* Avatar */}
      <Flex flex="1" justifyContent="center">
        <Pressable onPress={isPending === false && handleLoadAccount}>
          <Avatar
            bg="#FAA"
            source={{
              uri: friend.profile_pic_url,
            }}
          />
        </Pressable>
      </Flex>
      <Flex flex="3" justifyContent="center">
        <Text onPress={isPending === false && handleLoadAccount} fontSize="lg">
          {friend.username}
        </Text>
      </Flex>
      {friendState(friend.id, friendsState) === 'friends' && (
        <HStack space="4" alignItems="center">
          <Button
            isDisabled={friend.username === 'GiveSpace'}
            isLoading={isLoading}
            onPress={() => handleRemoveFriend('friends')}
            h="9"
            w="9"
          >
            <Feather name="user-minus" size={16} color="white" />
          </Button>
          <Button
            _text={{ fontSize: 'md' }}
            _stack={{ px: 3, mt: -1.5 }}
            isLoading={isLoading}
            onPress={handleLoadLists}
            h="9"
          >
            Lists
          </Button>
        </HStack>
      )}
      {friendState(friend.id, friendsState) === 'pendingMe' && (
        <HStack space="4" alignItems="center">
          {isLoading && <Spinner />}
          <Button onPress={handleAcceptFriend} colorScheme="green" h="9" w="9">
            <Icon as={<Feather name="check" />} size="sm" color="white" />
          </Button>
          <Button
            onPress={() => handleRemoveFriend('pendingMe')}
            colorScheme="red"
            h="9"
            w="9"
          >
            <Icon as={<Feather name="x" />} size="sm" color="white" />
          </Button>
        </HStack>
      )}
      {friendState(friend.id, friendsState) === 'pendingThem' && (
        <HStack space="4" alignItems="center">
          {/* <Button
            isLoading={isLoading}
            onPress={() => handleRemoveFriend('pendingThem')}
          >
            <Feather name="user-minus" size={16} color="white" h="8" />
          </Button> */}
        </HStack>
      )}
    </HStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({
  acceptFriend: (friend) => dispatch(acceptFriend(friend)),
  removeFriend: (friendId, type) => dispatch(removeFriend(friendId, type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DisplayFriendRow);
