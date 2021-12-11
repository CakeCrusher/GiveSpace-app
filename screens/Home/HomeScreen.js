import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import { Text, Button, HStack, VStack, ScrollView } from 'native-base';

import { ListPreview } from '../../components';

import { setUser, logout } from '../../redux/actions/user';
import MockApi from '../../utils/MockApi';

const HomeScreen = ({ userState, friendsState, logout, navigation }) => {

  const handleLoadList = (listData) => {
    navigation.navigate('Home', {
      screen: 'List',
      params: {
        listData,
      },
    });
  };

  const friendsWithLists = friendsState.list.filter((friend) => friend.lists.length > 0)
  return (
    <VStack
      space="2"
      p="4"
      flex="1"
      bg="#dfdfdf"
      justifyContent="space-between"
      safeArea
    >
      <HStack justifyContent="space-between">
        <Text fontSize="md">Hello, {userState.username}</Text>
        <Text fontSize="md">Nov, 28</Text>
      </HStack>

      <VStack flex="5" space="2">
        <Text fontSize="2xl">Recent</Text>
        {userState.lists[0] && (
          <>
            <ListPreview
              onPress={() => handleLoadList(userState.lists[0])}
              mb="2"
              username={userState.username}
              listData={userState.lists[0]}
            />
            <Button
              variant="outline"
              onPress={() => navigation.navigate('My Lists')}
            >
              All Lists
            </Button>
          </>
        )}
      </VStack>

      <VStack flex="7" space="2" overflow="scroll">
        <Text fontSize="2xl">Friends</Text>
        <HStack space="2" flexWrap="wrap">
          {friendsWithLists.length > 0 &&
            friendsWithLists.map((friend, index) => {
              if ((index + 1) % 2 === 0) {
                return (
                  <ListPreview
                    key={index}
                    username={friend.username}
                    listData={friend.lists[0]}
                    onPress={() => handleLoadList(friend.lists[0])}
                    w="45%"
                    mt="2"
                    ml="auto"
                  />
                );
              } else {
                return (
                  <ListPreview
                    key={index}
                    username={friend.username}
                    listData={friend.lists[0]}
                    onPress={() => handleLoadList(friend.lists[0])}
                    w="45%"
                    mt="2"
                  />
                );
              }
            })}
        </HStack>
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
