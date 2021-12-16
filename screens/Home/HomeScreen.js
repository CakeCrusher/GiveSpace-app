import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, Button, HStack, VStack, Box, ScrollView } from 'native-base';

import { ListPreview, ActivityCard, InnerTitle } from '../../components';

import Flare from '../../components/Flare';

const HomeScreen = ({ userState, friendsState, navigation }) => {
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
    <VStack space="2" px="4" flex="1" justifyContent="space-between" safeArea>
      <Flare />
      <ScrollView stickyHeaderIndices={[0, 3]}>
        <HStack justifyContent="space-between" bg="#f1f1f1">
          <Text fontSize="md">Hello, {userState.username}</Text>
          <Text fontSize="md">{timeNow}</Text>
        </HStack>

        <InnerTitle>Recent</InnerTitle>
        <VStack flex="5" space="2">
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

        <InnerTitle bg="#f1f1f1" w="100%">
          Activity
        </InnerTitle>
        <VStack flex="7" space="2">
          <VStack flex="1" pt="2" space="4">
            {friendsWithLists.length > 0 &&
              friendsWithLists.map((friend, index) => (
                <Box w="full" key={friend.id}>
                  <ActivityCard
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
      </ScrollView>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
