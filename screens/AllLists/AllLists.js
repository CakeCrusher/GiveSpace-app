import React, { useState, useEffect } from 'react';
import {
  Text,
  Heading,
  Button,
  Pressable,
  Avatar,
  Modal,
  Box,
  Flex,
  HStack,
  VStack,
  ScrollView,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { ListPreview, LoadingScreen, Fab, PopoverIcon } from '../../components';

import { addList } from '../../redux/actions/user';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { CREATE_LIST, DELETE_LIST } from '../../utils/schemas';

const AllLists = ({
  route,
  navigation,
  userState,
  friendsState,
  addList,
  removeLists,
}) => {
  const { userId, tabName } = route.params;

  const [userData, setUserData] = useState(null);
  const [enableDelete, setEnableDelete] = useState(false);
  const [selectDelete, setSelectDelete] = useState(new Set());
  const [deleteModal, setDeleteModal] = useState(false);
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

  const handleSelectDelete = (listId) => {
    setSelectDelete((prev) => {
      if (prev.has(listId)) {
        prev.delete(listId);
      } else {
        prev.add(listId);
      }
      return prev;
    });
    console.log(selectDelete);
  };

  const handleEnableDelete = () => {
    setEnableDelete(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setEnableDelete(false);
    setSelectDelete(new Set());
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    Promise.all(
      [...selectDelete].map((list_id) =>
        fetchGraphQL(DELETE_LIST, {
          list_id,
        }),
      ),
    )
      .then((values) => {
        removeLists([...selectDelete]);
      })
      .catch((err) => console.log(err))
      .finally(() => handleCancelDelete());
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
        {userData && userId === userState.id && (
          <Flex ml="auto">
            <PopoverIcon iconName="more-vertical" menuTitle="List Options">
              {enableDelete ? (
                <Pressable onPress={handleCancelDelete}>
                  <Box p="2">
                    <Text color="blue.500">Cancel Delete</Text>
                  </Box>
                </Pressable>
              ) : (
                <Pressable onPress={handleEnableDelete}>
                  <Box p="2">
                    <Text color="red.500">Delete</Text>
                  </Box>
                </Pressable>
              )}
            </PopoverIcon>
          </Flex>
        )}
      </HStack>
      <VStack flex="15">
        <ScrollView>
          {userData &&
            (userData.lists.length > 0 ? (
              userData.lists.map((list) => (
                <Box key={list.id} mb="4">
                  {enableDelete ? (
                    <ListPreview
                      listData={list}
                      onCheck={() => handleSelectDelete(list.id)}
                    />
                  ) : (
                    <ListPreview
                      listData={list}
                      onPress={() => handleLoadList(list)}
                    />
                  )}
                </Box>
              ))
            ) : (
              <Text>{userData.username} doesn't have any lists.</Text>
            ))}
        </ScrollView>
      </VStack>
      {userId === userState.id &&
        (enableDelete ? (
          <Fab onPress={openDeleteModal} iconName="trash" />
        ) : (
          <Fab onPress={handleCreateList} iconName="plus" />
        ))}
      <LoadingScreen isLoading={loadingCreate} />
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <Modal.Content>
          <Modal.Header>
            Are you sure you want to delete these lists?
          </Modal.Header>
          <Modal.Body>
            <VStack space="4">
              <HStack space="4">
                <Button
                  onPress={handleCancelDelete}
                  flex="1"
                  colorScheme="info"
                >
                  No
                </Button>
                <Button
                  onPress={handleConfirmDelete}
                  flex="1"
                  colorScheme="danger"
                >
                  Yes
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  addList: (lsitData) => dispatch(addList(listData)),
  removeLists: (listIds) => dispatch(removeLists(listIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
