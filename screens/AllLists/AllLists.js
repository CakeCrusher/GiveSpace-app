import React, { useState, useEffect } from 'react';
import {
  Text,
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
} from 'native-base';
import { connect } from 'react-redux';

import {
  ListPreview,
  LoadingScreen,
  Fab,
  InnerTitle,
  ScreenContainer,
  PopoverIcon,
} from '../../components';

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
      params: { listData, userData },
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
          params: { listData, userData: userState },
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
        userState={userState}
        navigation={navigation}
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
  userState,
  navigation,
}) => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const togglePopover = () =>
    setTimeout(() => setPopoverIsOpen((prev) => !prev), 100);

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
    togglePopover();
    setEnableDelete(true);
  };

  const handleCancelDelete = () => {
    togglePopover();
    setDeleteModal(false);
    setEnableDelete(false);
    setSelectDelete(new Set());
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleLoadAccount = () => {
    console.log('handleLoadAccount');
    // navigation.navigate("FriendAccount", {
    //   userId: userData.id,
    // });
    if (isUser) {
      navigation.navigate('Account');
    } else {
      navigation.navigate('Friends', {
        screen: 'FriendAccount',
        params: { userId: userData.id },
      });
    }
  };

  return (
    <ScreenContainer>
      <HStack flex="1" alignItems="center">
        <Pressable onPress={handleLoadAccount}>
          <Avatar
            key={isUser ? userState.profile_pic_url : userData.profile_pic_url}
            bg="#FAA"
            source={{
              uri: isUser
                ? userState.profile_pic_url
                : userData.profile_pic_url,
            }}
          >
            EX
          </Avatar>
        </Pressable>
        <InnerTitle ml="4">
          {isUser ? 'Your ' : `${userData.username}'s `}
          Lists
        </InnerTitle>
        {isUser && (
          <Flex ml="auto">
            <PopoverIcon
              isOpen={popoverIsOpen}
              toggleOpen={togglePopover}
              iconName="more-vertical"
              menuTitle="List Options"
            >
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

      <VStack flex="9">
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
                        onPress: () => handleSelectDelete(list.id),
                        top: '4',
                        right: '6',
                      }}
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
          ) : isUser ? (
            <Center bg="#e4e4e4" borderRadius="8" py="16" px="8">
              <Text color="#707070">You don't have any lists yet.</Text>
              <Text color="#707070">Create a new one below.</Text>
            </Center>
          ) : (
            <Center bg="#e4e4e4" borderRadius="8" py="16" px="8">
              <Text color="#707070">
                {userData.username} doesn't have any lists yet.
              </Text>
              <Text color="#707070">Check back later!</Text>
            </Center>
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
                  onPress={() =>
                    handleConfirmDelete([...selectDelete], handleCancelDelete)
                  }
                  flex="1"
                  variant="outline"
                >
                  Yes
                </Button>
                <Button onPress={handleCancelDelete} flex="1">
                  No
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScreenContainer>
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
