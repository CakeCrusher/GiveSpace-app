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
  const handleLoadList = (listData, userData) => {
    navigation.navigate('Home', {
      screen: 'List',
      params: {
        listData,
        userData,
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
  //console.log(splitFriends);
  let timeNow = new Date().toLocaleDateString();
  // transform time to readable format
  return (
    <VStack space="2"  p="4" flex="1" justifyContent="space-between" safeArea>
      <Flare />
      <HStack mt={8} justifyContent="space-between">
        <Text fontSize="md">Hello, {userState.username}</Text>
        <Text fontSize="md">{timeNow}</Text>
      </HStack>

      <VStack flex="5" space="2">
        <InnerTitle>Recent</InnerTitle>
        {userState.lists[0] && (
          <>
            <ListPreview
              onPress={() => handleLoadList(userState.lists[0], userState)}
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
                    friend.profile_pic_url ||
                    'https://via.placeholder.com/50/66071A/FFFFFF?text=GS'
                  }
                  onPress={() => handleLoadList(friend.lists[0], friend)}
                  flex="1"
                />
              </Box>
            ))}
        </VStack>
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
