import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import { Text, Button, HStack, VStack } from 'native-base';

import { ListPreview } from '../../components';

import { setUser, logout } from '../../redux/actions/user';
import MockApi from '../../utils/MockApi';

const HomeScreen = ({ user, logout, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [recentList, setRecentList] = useState(null);
  const [friendsList, setFriendsList] = useState(null);

  useEffect(() => {
    const getLists = async () => {
      try {
        const recent = await MockApi.getList({ listId: 0 });
        const friends = await MockApi.getUserLists({ userId: 1 });
        setRecentList(recent);
        setFriendsList(friends);
      } catch (err) {
        console.warn(err);
      }
    };
    getLists();
  }, []);

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
            <ListPreview listData={recentList} />
            <Button
              variant="outline"
              bg="#fff"
              color="#000"
              onPress={() => navigation.navigate('AllLists')}
            >
              All Lists
            </Button>
          </>
        )}
        {/*TODO: Need to decide how to "pass selected list" through navigation */}
      </VStack>

      <VStack flex="7" space="2" overflow="scroll">
        <Text fontSize="2xl">Friends</Text>
        <HStack space="2" flexWrap="wrap">
          {friendsList &&
            friendsList.map((list, index) => {
              if ((index + 1) % 2 === 0) {
                return (
                  <ListPreview
                    key={index}
                    listData={list}
                    w="45%"
                    mt="2"
                    ml="auto"
                  />
                );
              } else {
                return (
                  <ListPreview key={index} listData={list} w="45%" mt="2" />
                );
              }
            })}
        </HStack>
      </VStack>

      <Button flex="1" onPress={logout}>
        Logout
      </Button>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
