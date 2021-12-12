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
  Center,
  HStack,
  VStack,
  ScrollView,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { ListPreview, LoadingScreen, Fab, PopoverIcon } from '../../components';

import { addList, removeLists } from '../../redux/actions/user';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { CREATE_LIST, DELETE_LIST } from '../../utils/schemas';

const AllListsWrapper = ({
  route,
  navigation,
  userState,
  friendsState,
  addList,
  removeLists,
}) => {
  const { userId, tabName } = route.params;
  const isUser = userId === userState.id;
  console.log(isUser);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUser) {
      setUserData(userState);
    } else {
      // TODO: Make a Fetch
      const friend = friendsState.list.find((e) => e.id === userId);
      setUserData(friend);
    }
    setIsLoading(false);
  }, [userState, friendsState]);

  const handleLoadList = (listData) => {
    navigation.navigate(tabName, {
      screen: 'List',
      params: { listData, userId },
    });
  };

  const handleCreateList = () => {
    setIsLoading(true);
    let listData;
    fetchGraphQL(CREATE_LIST, { user_id: userState.id })
      .then((res) => {
        if (res.errors) {
          throw new Error(res.errors);
        }

        console.log('NEW ID:', res.data.insert_list.returning[0].id);
        listData = res.data.insert_list.returning[0];

        addList(listData);
        console.log(listData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        navigation.navigate(tabName, {
          screen: 'List',
          params: { listData, userId: userState.id },
        });
      });
  };

  const handleConfirmDelete = (listIds, cb) => {
    setIsLoading(true);
    Promise.all(
      listIds.map((list_id) =>
        fetchGraphQL(DELETE_LIST, {
          list_id,
        }),
      ),
    )
      .then((res) => {
        if (res[0].errors) {
          throw new Error(res[0].errors);
        }
        const confirmedIds = res
          .filter((e) => e.data && e.data.delete_list.returning[0].id)
          .map((e) => e.data.delete_list.returning[0].id);

        removeLists(confirmedIds);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        cb();
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }
  if (userData) {
    return (
      <AllLists
        userData={userData}
        isUser={isUser}
        handleCreateList={handleCreateList}
        handleConfirmDelete={handleConfirmDelete}
        handleLoadList={handleLoadList}
      />
    );
  }

  return (
    <VStack safeArea>
      <Center mt="4">
        <Text fontSize="xl">
          Uh oh. It seems we couldn't find the lists for this User.
        </Text>
      </Center>
    </VStack>
  );
};

const AllLists = ({
  userData,
  isUser,
  handleCreateList,
  handleConfirmDelete,
  handleLoadList,
}) => {
  console.log(userData.lists);
  const [enableDelete, setEnableDelete] = useState(false);
  const [selectDelete, setSelectDelete] = useState(new Set());
  const [deleteModal, setDeleteModal] = useState(false);

  const handleSelectDelete = (listId) => {
    console.log(listId);
    setSelectDelete((prev) => {
      if (prev.has(listId)) {
        prev.delete(listId);
      } else {
        prev.add(listId);
        console.log(prev);
      }
      return prev;
    });
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

  return (
    <VStack space="4" p="4" flex="1" safeArea>
      <HStack flex="1" alignItems="center">
        <Avatar
          bg="#FAA"
          source={{
            uri: 'https://via.placeholder.com/50/66071A/FFFFFF?text=GS',
          }}
        >
          EX
        </Avatar>
        <Heading ml="4">
          {isUser ? 'Your ' : `${userData.username}'s `}
          Lists
        </Heading>
        {isUser && (
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
          {userData.lists.length > 0 ? (
            userData.lists.map((list, i) => {
              console.log(list);
              return (
                <Box key={i} mb="4">
                  {enableDelete ? (
                    <ListPreview
                      listData={list}
                      check={{
                        top: '4',
                        right: '6',
                      }}
                      onPress={() => handleSelectDelete(list.id)}
                    />
                  ) : (
                    <ListPreview
                      listData={list}
                      onPress={() => handleLoadList(list)}
                    />
                  )}
                </Box>
              );
            })
          ) : (
            <Text>{userData.username} doesn't have any lists.</Text>
          )}
        </ScrollView>
      </VStack>
      {isUser &&
        (enableDelete ? (
          <Fab onPress={openDeleteModal} iconName="trash" />
        ) : (
          <Fab onPress={handleCreateList} iconName="plus" />
        ))}

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
                  onPress={() =>
                    handleConfirmDelete([...selectDelete], handleCancelDelete)
                  }
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
  addList: (listData) => dispatch(addList(listData)),
  removeLists: (listIds) => dispatch(removeLists(listIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllListsWrapper);
