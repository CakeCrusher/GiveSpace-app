import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import {
  Avatar,
  Text,
  Button,
  HStack,
  VStack,
  Box,
  ScrollView,
} from 'native-base';

import { ListPreview, InnerTitle } from '../../components';

import { setUser, logout } from '../../redux/actions/user';
import MockApi from '../../utils/MockApi';
import Flare from '../../components/Flare';


const HomeScreen = ({ userState, friendsState, logout, navigation }) => {
  const handleLoadList = (listData) => {
    navigation.navigate('Home', {
      screen: 'List',
      params: {
        listData,
      },
    });
  };

  const friendsWithLists = friendsState.list.filter(
    (friend) => friend.lists.length > 0,
  );
  const splitFriends = [];
  for (let i = 0; i < friendsWithLists.length; i++) {
    if (i % 2 === 0) {
      splitFriends.push([friendsWithLists[i]]);
    } else {
      splitFriends[splitFriends.length - 1].push(friendsWithLists[i]);
    }
  }
  console.log(splitFriends);

  return (
    <VStack space="2" p="4" flex="1" justifyContent="space-between" safeArea>
      <Flare/>
      <HStack justifyContent="space-between">
        <Text fontSize="md">Hello, {userState.username}</Text>
        <Text fontSize="md">Nov, 28</Text>
      </HStack>

      <VStack flex="5" space="2">
        <InnerTitle>Recent</InnerTitle>
        {userState.lists[0] && (
          <>
            <ListPreview
              onPress={() => handleLoadList(userState.lists[0])}
              username={userState.username}
              listData={userState.lists[0]}
              flex="1"
            />
            <Button
              mt="2"
              variant="outline"
              onPress={() => navigation.navigate('My Lists')}
            >
              All Lists
            </Button>
          </>
        )}
      </VStack>

      <VStack flex="7" space="2" overflow="scroll">
        <InnerTitle>Friends Activity</InnerTitle>
        <VStack flex="1" space="2" flexWrap="wrap">
          {friendsWithLists.length > 0 &&
            friendsWithLists.map((friend, index) => (
              <Box h="50" w="full" key={friend.id}>
                <ListPreview
                  key={index}
                  username={friend.username}
                  listData={friend.lists[0]}
                  avatar={
                    friend.profile_pic_url || 'https://via.placeholder.com/50/66071A/FFFFFF?text=GS'
                  }
                  onPress={() => handleLoadList(friend.lists[0])}
                  flex="1"
                />
              </Box>
            ))}
        </VStack>
      </VStack>
      <VStack>
        <Button onPress={() => logout()}>logout</Button>
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
