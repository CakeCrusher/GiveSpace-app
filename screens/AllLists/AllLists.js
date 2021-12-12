import React, { useState, useEffect } from 'react';
import {
  Text,
  Heading,
  Button,
  Avatar,
  Box,
  HStack,
  VStack,
  ScrollView,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { ListPreview, LoadingScreen, Fab } from '../../components';

import { addList } from '../../redux/actions/user';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { CREATE_LIST } from '../../utils/schemas';

const AllLists = ({ route, navigation, userState, friendsState, addList }) => {
  const { userId, tabName } = route.params;

  const [userData, setUserData] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    if (userId === userState.id) {
      setUserData(userState);
    } else {
      // TODO: Make a Fetch
      const friend = friendsState.list.find((e) => e.id === userId);
      console.log(friend);
      setUserData(friend);
    }
  }, [userState.lists]);

  const handleLoadList = (listData) => {
    navigation.navigate(tabName, {
      screen: 'List',
      params: { listData, userId },
    });
  };

  const handleCreateList = () => {
    setLoadingCreate(true);
    fetchGraphQL(CREATE_LIST, { user_id: userState.id })
      .then((res) => {
        console.log(res);
        const listData = res.data.insert_list.returning[0];

        setLoadingCreate(false);
        navigation.navigate(tabName, {
          screen: 'List',
          params: { listData, userId: userState.id },
        });
        addList(listData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <VStack space="4" p="4" flex="1" safeArea>
      <HStack flex="1" alignItems="center">
        <Avatar bg="#FAA" source={{ uri: '' }}>
          EX
        </Avatar>
        <Heading ml="4">
          {userData &&
            (userId === userState.id ? 'Your ' : `${userData.username}'s `)}
          Lists
        </Heading>
      </HStack>
      <VStack flex="15">
        <ScrollView>
          {userData &&
            (userData.lists.length > 0 ? (
              userData.lists.map((list) => (
                <Box key={list.id} mb="4">
                  <ListPreview
                    listData={list}
                    onPress={() => handleLoadList(list)}
                  />
                </Box>
              ))
            ) : (
              <Text>{userData.username} doesn't have any lists.</Text>
            ))}
        </ScrollView>
      </VStack>
      {userId === userState.id && (
        <>
          <Fab onPress={handleCreateList} iconName="plus" />
          <LoadingScreen isLoading={loadingCreate} />
        </>
      )}
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  addList: (lsitData) => dispatch(addList(listData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
