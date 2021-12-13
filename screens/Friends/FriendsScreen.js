import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  SlideFade,
  Icon,
  Input,
  Text,
  Flex,
  Pressable,
  Button,
  ScrollView,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';

import { Fab } from '../../components';
import DisplayFriendRow from './DisplayFriendRow';
import AddFriendModal from './AddFriendModal';
import { GET_FRIENDS } from '../../utils/schemas';

import { reloadFriends } from '../../redux/actions/friends';

const FriendsScreen = ({
  navigation,
  friendsState,
  userState,
  reloadFriends,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const search = useField('text', '');

  const handleSearchToggle = () => {
    setShowSearch((e) => !e);
  };

  const handleSettingsToggle = () => {};

  return (
    <VStack space="4" p="4" flex="15" safeArea>
      <ScrollView>
        <HStack flex="1" justifyContent="space-between">
          <Flex flex="5">
            <Text fontSize="3xl">Friends</Text>
          </Flex>

          <HStack
            alignContent="center"
            justifyContent="space-between"
            flex="1"
            p="2"
          >
            <Pressable onPress={handleSearchToggle} m="auto">
              <Icon as={<Feather name="search" />} size="sm" />
            </Pressable>
            <Pressable onPress={handleSettingsToggle} m="auto">
              <Icon as={<Feather name="more-vertical" />} size="sm" />
            </Pressable>
          </HStack>
        </HStack>

        <SlideFade in={showSearch}>
          <Box h={showSearch ? '8' : '0'} px={showSearch ? '4' : '0'}>
            {showSearch && <Input {...search} placeholder="search" />}
          </Box>
        </SlideFade>

        <VStack flex="15">
          {/*user.friends.map((friend) => (
        <FriendRow
          key={friend.id}
          username={friend.username}
          profile_pic_url={friend.profile_pic_url}
          navigation={navigation}
        />
      ))*/}
          {friendsState.pendingMe.length > 0 && (
            <VStack flex="5">
              <Text fontSize="xl">Recieved Requests</Text>
              {friendsState.pendingMe.map((friend) => (
                <DisplayFriendRow
                  key={friend.id}
                  friend={friend}
                  navigation={navigation}
                />
              ))}
            </VStack>
          )}
          {friendsState.pendingThem.length > 0 && (
            <VStack flex="5">
              <Text fontSize="xl">Sent Requests</Text>
              {friendsState.pendingThem.map((friend) => (
                <DisplayFriendRow
                  key={friend.id}
                  friend={friend}
                  navigation={navigation}
                />
              ))}
            </VStack>
          )}

          <VStack flex="5">
            <Text fontSize="xl">You're Friends</Text>
            {friendsState.list.map((friend) => (
              <DisplayFriendRow
                key={friend.id}
                friend={friend}
                navigation={navigation}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
      <AddFriendModal isOpen={isAdding} onClose={() => setIsAdding(false)} />
      <Fab iconName="user-plus" onPress={() => setIsAdding(true)} />
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({
  reloadFriends: (friends) => dispatch(reloadFriends(friends)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);
