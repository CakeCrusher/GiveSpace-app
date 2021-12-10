import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import { Text, Button, HStack, VStack, ScrollView } from 'native-base';

import { ListPreview } from '../../components';

import { setUser, logout } from '../../redux/actions/user';
import MockApi from '../../utils/MockApi';

const HomeScreen = ({ logout, navigation, userState }) => {
  const { user } = userState;
  const [loading, setLoading] = useState(false);
  const [recentList, setRecentList] = useState(null);
  const [friendsList, setFriendsList] = useState(null);

  useEffect(() => {
    const getLists = async () => {
      try {
        //TODO: Not 100% sure this is last
        const last = user.lists[user.lists.length - 1];
        //TODO: Not 100% sure how we're handling this
        const friends = await MockApi.getUserLists({ userId: 1 });
        setRecentList(last);
        setFriendsList(friends);
      } catch (err) {
        console.warn(err);
      }
    };
    getLists();
  }, []);

  const handleLoadList = (listData) => {
    navigation.navigate('Home', {
      screen: 'List',
      params: {
        listData,
      },
    });
  };

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
        <Text fontSize="md">Hello, {user.username}</Text>
        <Text fontSize="md">Nov, 28</Text>
      </HStack>

      <VStack flex="5" space="2">
        <Text fontSize="2xl">Recent</Text>
        {recentList && (
          <>
            <ListPreview mb="2" listData={recentList} />
            <Button
              variant="outline"
              onPress={() => navigation.navigate('My Lists')}
            >
              All Lists
            </Button>
          </>
        )}
      </VStack>

      {/*TODO: Need to decide how to "pass selected list" through navigation */}
      <VStack flex="7" space="2">
        <ScrollView>
          <Text fontSize="2xl">Friends</Text>
          <HStack space="2" flexWrap="wrap">
            {/* TODO: Redo this */}
            {friendsList &&
              friendsList.map((list, index) => {
                if ((index + 1) % 2 === 0) {
                  return (
                    <ListPreview
                      key={index}
                      listData={list}
                      onPress={() => handleLoadList(list)}
                      w="45%"
                      mt="2"
                      ml="auto"
                    />
                  );
                } else {
                  return (
                    <ListPreview
                      key={index}
                      listData={list}
                      onPress={() => handleLoadList(list)}
                      w="45%"
                      mt="2"
                    />
                  );
                }
              })}
          </HStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
