import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  Text,
  Heading,
  Avatar,
  Icon,
  Button,
  Pressable,
  Input,
  Modal,
  Box,
  Flex,
  HStack,
  VStack,
  Center,
  ScrollView,
} from 'native-base';

import {
  editListTitle,
  populateListUser,
  removeItems,
} from '../../redux/actions/user';
import { populateListFriends } from '../../redux/actions/friends';
import ItemCard from '../../components/Item/ItemCard';
import ItemInput from '../../components/Item/ItemInput';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import {
  GET_LIST,
  DELETE_ITEM,
  UPDATE_LIST_TITLE,
  SUBSCRIBE_LIST,
  MARK_ITEM_FOR_PURCHASE,
} from '../../utils/schemas';
import SelectItemModal from './SelectItemModal';
import { LoadingScreen, PopoverIcon, Fab } from '../../components';
import Flare from '../../components/Flare';

import { useSubscription } from '@apollo/client';

const ListWrapper = ({
  route,
  navigation,
  userState,
  friendsState,
  populateListFriends,
  populateListUser,
  removeItems,
  editListTitle,
}) => {
  const { listData, userData } = route.params;
  const isUser = userState.id === listData.user_id;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [displayList, setDisplayList] = useState(null);
  const { data, loading, error } = useSubscription(SUBSCRIBE_LIST, {
    variables: { list_id: listData.id },
  });

  if (error) {
    throw new Error(error);
  }

  //useEffect(() => {
  //  const addListToState = async () => {
  //    try {
  //      console.log('FETCHING');
  //      const listRes = await fetchGraphQL(GET_LIST, {
  //        list_id: listData.id,
  //      });
  //      console.log('addListToState!', listRes);

  //      if (listRes.errors || !listRes.data.list[0]) {
  //        throw new Error(listRes.errors);
  //      } else {
  //        if (isUser) {
  //          console.log('isUser!');
  //          setDisplayList(listRes.data.list[0]);
  //          populateListUser(listRes.data.list[0]);
  //        } else {
  //          console.log('isFriend!');
  //          setDisplayList(listRes.data.list[0]);
  //          populateListFriends(listRes.data.list[0]);
  //        }
  //      }
  //    } catch (err) {
  //      console.warn(err);
  //    } finally {
  //      setIsLoading(false);
  //    }
  //  };

  //  const checkState = () => {
  //    console.log('CHECKING CACHE');
  //    let list;
  //    let needsUpdate = true;

  //    if (isUser) {
  //      list = userState.lists.find((list) => list.id === listData.id);
  //    } else {
  //      const friend = friendsState.list.find(
  //        (user) => user.id === listData.user_id,
  //      );
  //      if (friend) {
  //        list = friend.lists.find((list) => list.id === listData.id);
  //      }
  //    }

  //    if (list) {
  //      console.log('check for update');
  //      needsUpdate =
  //        list.items.find((e) => Object.keys(e).length === 2) !== undefined;
  //    }

  //    if (needsUpdate) {
  //      console.log(list);
  //      console.log('needs update');
  //      addListToState();
  //    } else {
  //      console.log('no update');
  //      setDisplayList(list);
  //      setIsLoading(false);
  //    }
  //  };

  //  checkState();
  //}, [userState, friendsState, listData]);

  const handleConfirmDelete = (itemIds, cb) => {
    console.log(itemIds);
    setIsLoading(true);
    Promise.all(
      itemIds.map((item_id) =>
        fetchGraphQL(DELETE_ITEM, {
          item_id,
        }),
      ),
    )
      .then((res) => {
        for (let result of res) {
          if (result.errors) {
            throw new Error(result.errors);
          }
        }

        const confirmedIds = res
          .filter((e) => e.data && e.data.delete_item.returning[0].id)
          .map((e) => e.data.delete_item.returning[0].id);
        removeItems({
          deletedIds: confirmedIds,
          listId: displayList.id,
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        cb();
      });
  };

  if (hasError) {
    return (
      <VStack safeArea>
        <Center mt="4">
          <Text fontSize="xl">Uh oh. Something went wrong.</Text>
        </Center>
      </VStack>
    );
  }

  if (loading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (data) {
    return (
      <List
        navigation={navigation}
        isUser={isUser}
        userData={userData}
        list={data.list[0]}
        handleConfirmDelete={handleConfirmDelete}
        editListTitle={editListTitle}
      />
    );
  }

  return (
    <VStack safeArea>
      <Center mt="4">
        <Text fontSize="xl">Uh oh. It seems we couldn't find the list</Text>
      </Center>
    </VStack>
  );
};

const List = ({
  navigation,
  list,
  isUser,
  handleConfirmDelete,
  userData,
  editListTitle,
}) => {
  const [selectItem, setSelectItem] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const [enableDelete, setEnableDelete] = useState(false);
  const [selectDelete, setSelectDelete] = useState(new Set());
  const [deleteModal, setDeleteModal] = useState(false);
  const title = useField('text', list.title);

  const handleSelectDelete = (itemId) => {
    console.log(itemId);
    setSelectDelete((prev) => {
      if (prev.has(itemId)) {
        prev.delete(itemId);
      } else {
        prev.add(itemId);
        console.log(prev);
      }
      return prev;
    });
  };

  /** OTHER USER functions **/
  const handlePurchaseItem = (itemId, cb) => {
    fetchGraphQL(MARK_ITEM_FOR_PURCHASE, {
      item_id: itemId,
      list_id: list.id,
    })
      .then((res) => {
        console.log(res);
        if (res.errors) {
          console.warn(res.errors);
        }
        cb();
      })
      .catch((err) => console.log(err));
  };

  /** LIST OWNER functions **/
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

  const handleCardPress = (item) => {
    setSelectItem(item.id);
  };

  const handleClearSelect = () => {
    setSelectItem(null);
  };

  const handleTitleSet = () => {
    fetchGraphQL(UPDATE_LIST_TITLE, {
      list_id: list.id,
      title: title.value,
    })
      .then((res) => {
        if (res.errors) {
          console.warn(res.errors);
        }
        const resData = res.data.update_list.returning[0];
        editListTitle(resData.id, resData.title);
      })
      .catch((err) => console.log(err));
  };

  const handleSettingsToggle = () => {};

  return (
    <VStack flex="1" maxW="100%" p="4" space="2" safeArea>
      <Flare />
      {/* Nav, ListTitle, Username*/}
      <HStack mt={8} flex="1" alignItems="center" mx="-2">
        <Box flex="1">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={<Feather name="chevron-left" />} size="xl" />
          </Pressable>
        </Box>
        <Box flex="1">
          <Avatar
            source={{
              uri:
                userData.profile_pic_url ||
                'https://via.placeholder.com/50/66071A/FFFFFF?text=GS',
            }}
          />
        </Box>
        <VStack flex="5" justifyContent="center">
          <Text fontSize="xs">{isUser ? 'You' : userData.username}</Text>
          {isUser ? (
            <Flex h="12">
              <Input
                backgroundColor="#ffffff00"
                borderColor="#ffffff00"
                placeholder="list title"
                fontSize="2xl"
                onEndEditing={handleTitleSet}
                h="50"
                {...title}
              />
            </Flex>
          ) : (
            <Text fontSize="2xl">{list.title}</Text>
          )}
        </VStack>
      </HStack>

      {/* Share, Search, Options*/}
      <VStack flex="1">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          p="2"
        >
          {/* <HStack flex="2" space="2">
            <Icon as={<Feather name="share-2" />} size="sm" />
            <Text>Share</Text>
          </HStack> */}

          <HStack flex="3">
            <HStack ml="auto" space="4">
              <Pressable onPress={() => {}}>
                <Icon as={<Feather name="search" />} size="sm" />
              </Pressable>
              {isUser && (
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
                        <Text color="red.500">Delete Items</Text>
                      </Box>
                    </Pressable>
                  )}
                </PopoverIcon>
              )}
            </HStack>
          </HStack>
        </HStack>
      </VStack>

      {/* Add Item, Item Modal, Display Items*/}
      {isUser && (
        <VStack flex="1">
          <ItemInput listId={list.id} />
        </VStack>
      )}

      <VStack flex="8">
        <ScrollView>
          <HStack flexWrap="wrap" justifyContent="space-between">
            {list.items.map((item) => (
              <Flex onPress={handleCardPress} key={item.id} w="48%">
                {enableDelete ? (
                  <ItemCard
                    item={item}
                    check={{
                      isChecked: selectDelete.has(item.id),
                      onPress: () => handleSelectDelete(item.id),
                    }}
                  />
                ) : (
                  <ItemCard
                    item={item}
                    handlePress={() => handleCardPress(item)}
                  />
                )}
              </Flex>
            ))}
          </HStack>
        </ScrollView>
      </VStack>

      {selectItem && (
        <SelectItemModal
          navigation={navigation}
          isOpen={selectItem !== null}
          onClose={handleClearSelect}
          item={list.items.find((e) => e.id === selectItem)}
          isUser={isUser}
          handlePurchaseItem={handlePurchaseItem}
        />
      )}
      {enableDelete && <Fab onPress={openDeleteModal} iconName="trash" />}
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal}>
        <Modal.Content>
          <Modal.Header>
            Are you sure you want to delete these items?
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
  populateListFriends: (list) => dispatch(populateListFriends(list)),
  populateListUser: (list) => dispatch(populateListUser(list)),
  removeItems: (data) => dispatch(removeItems(data)),
  editListTitle: (id, title) => dispatch(editListTitle(id, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListWrapper);
