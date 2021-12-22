import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  SlideFade,
  Icon,
  Input,
  Text,
  Button,
  ScrollView,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';

import { Fab, ScreenContainer, InnerTitle } from '../../components';
import DisplayFriendRow from './DisplayFriendRow';
import AddFriendModal from './AddFriendModal';
import { GET_FRIEND_RELS } from '../../utils/schemas';

import { reloadFriends } from '../../redux/actions/friends';

const FriendsScreen = ({
  navigation,
  friendsState,
  userState,
  reloadFriends,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const search = useField('text', '');

  const handleRefresh = () => {
    setIsLoading(true);
    fetchGraphQL(GET_FRIEND_RELS, { user_id: userState.id })
      .then((res) => {
        console.log(res);
        reloadFriends(res.data.friend_rel);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleSettingsToggle = () => {};

  return (
    <ScreenContainer>
      <ScrollView>
        <HStack
          flex="1"
          mb={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex="5">
            <InnerTitle>Friends</InnerTitle>
          </Box>

          <HStack justifyContent="flex-end" flex="1">
            <Button onPress={handleRefresh} h="10" w="10" isLoading={isLoading}>
              <Icon
                as={<Feather name="refresh-cw" />}
                size="sm"
                color="white"
              />
            </Button>
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
          {friendsState.pendingMe && friendsState.pendingMe.length > 0 && (
            <VStack flex="5" mb={4}>
              <InnerTitle fontSize="2xl" mb={2}>
                Recieved Requests
              </InnerTitle>
              {friendsState.pendingMe.map((friend) => (
                <DisplayFriendRow
                  key={friend.id}
                  friend={friend}
                  navigation={navigation}
                  isPending={true}
                />
              ))}
            </VStack>
          )}
          {friendsState.pendingThem && friendsState.pendingThem.length > 0 && (
            <VStack flex="5" mb={4}>
              <InnerTitle fontSize="2xl" mb={2}>
                Sent Requests
              </InnerTitle>
              {friendsState.pendingThem.map((friend) => (
                <DisplayFriendRow
                  key={friend.id}
                  friend={friend}
                  navigation={navigation}
                  isPending={true}
                />
              ))}
            </VStack>
          )}

          <VStack flex="5" mb={4}>
            <InnerTitle fontSize="2xl" mb={2}>
              Your Friends
            </InnerTitle>
            {friendsState.list.sort().map((friend) => (
              <DisplayFriendRow
                key={friend.id}
                friend={friend}
                navigation={navigation}
                isPending={false}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
      <AddFriendModal isOpen={isAdding} onClose={() => setIsAdding(false)} />
      <Fab iconName="user-plus" onPress={() => setIsAdding(true)} />
    </ScreenContainer>
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
