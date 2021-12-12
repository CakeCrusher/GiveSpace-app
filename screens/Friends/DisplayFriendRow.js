import React, { useState } from 'react';
import { Pressable, Avatar, HStack, Text, Flex, Button } from 'native-base';
import { friendState, acceptFriendRel, deleteFriendRel } from '../../utils/helperFunctions';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { acceptFriend, removeFriend } from '../../redux/actions/friends';

const DisplayFriendRow = ({ friend, navigation, friendsState, userState, acceptFriend, removeFriend }) => {
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
    acceptFriend(friendRes.data.update_friend_rel.returning[0].user)
    setIsLoading(false);
  }

  const handleRemoveFriend = async (type) => {
    setIsLoading(true)
    const fetchRes = await deleteFriendRel(userState.id, friend.id);
    console.log('!fetchRes', fetchRes);
    removeFriend(friend.id, type)
    setIsLoading(false)
  }

  console.log(friend.profile_pic_url)
  
  return (
    <HStack pb="5" justifyContent="space-between">
      {/* Avatar */}
      <Flex flex="1" justifyContent="center">
        <Pressable onPress={handleLoadAccount}>
          <Avatar
            bg="#FAA"
            source={{
              uri: friend.profile_pic_url || "https://via.placeholder.com/50/66071A/FFFFFF?text=GS",
            }}
          >
            EX
          </Avatar>
        </Pressable>
      </Flex>
      <Flex flex="3" justifyContent="center">
        <Text fontSize="xl">{friend.username}</Text>
      </Flex>
      {friendState(friend.id, friendsState) === 'friends' && (
        <HStack space="4">
          <Button isLoading={isLoading} onPress={() => handleRemoveFriend('friends')}>
            <Feather name="user-minus" size={24} color="white" />
          </Button>
          <Button isLoading={isLoading} onPress={handleLoadLists}>
            Lists
          </Button>
        </HStack>
      )}
      {friendState(friend.id, friendsState) === 'pendingMe' && (
        <HStack space="4">
          <Button isLoading={isLoading} onPress={() => handleRemoveFriend('pendingMe')}>
            <Feather name="user-x" size={24} color="white" />
          </Button>
          <Button isLoading={isLoading} onPress={handleAcceptFriend}>
            <Feather name="user-check" size={24} color="white" />
          </Button>
        </HStack>
      )}
      {friendState(friend.id, friendsState) === 'pendingThem' && (
        <Button isLoading={isLoading} onPress={() => handleRemoveFriend('pendingThem')}>
          <Feather name="user-minus" size={24} color="white" />
        </Button>
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
