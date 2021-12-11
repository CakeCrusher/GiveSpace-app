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
  Flex,
  HStack,
  VStack,
  ScrollView,
} from 'native-base';

import { populateListUser } from '../../redux/actions/user';
import { populateListFriends } from '../../redux/actions/friends';
import ItemCard from '../../components/Item/ItemCard';
import ItemInput from '../../components/Item/ItemInput';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { GET_LIST } from '../../utils/schemas';
import SelectItemModal from './SelectItemModal';
import { LoadingScreen } from '../../components';

const dummyItem = {
  img_url: '',
  name: 'dummyItem',
};

const List = ({
  route,
  navigation,
  userState,
  friendsState,
  populateListFriends,
  populateListUser,
}) => {
  // TODO: change all instances "user" to "userState"
  const user = userState;
  const { listData } = route.params;

  const [isUser, setIsUser] = useState(user.id === listData.user_id);
  const [selectItem, setSelectItem] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ROUTES TO LIST IN STATE vvvv-list-vvvv
  const list = isUser
    ? userState.lists.find((list) => list.id === listData.id)
    : friendsState.list
        .find((user) => user.lists.find((list) => list.id === listData.id))
        .lists.find((list) => list.id === listData.id);
  console.log(list);

  console.log('CURRENT LIST: ', list);

  useEffect(() => {
    const addListToState = async () => {
      const listRes = await fetchGraphQL(GET_LIST, {
        list_id: listData.id,
      });
      console.log('addListToState!', listRes);

      if (listRes.errors || !listRes.data.list[0]) {
        console.log('ERROR!', listRes.errors);
        setIsLoading(false);
        return;
      } else {
        if (userState.lists.find((list) => list.id === listData.id)) {
          console.log('isUser!');
          populateListUser(listRes.data.list[0]);
        } else {
          console.log('isFriend!');
          setIsUser(false);
          populateListFriends(listRes.data.list[0]);
        }
        setIsLoading(false);
        return;
      }
    };
    addListToState();
  }, []);

  const handleCardPress = (item) => {
    console.log(item);
    setSelectItem(item);
  };

  const handleClearSelect = () => {
    setSelectItem(null);
  };

  const handleSearchToggle = () => {
    setShowSearch((e) => !e);
  };

  const handleSettingsToggle = () => {};

  return (
    <VStack flex="1" maxW="100%" p="4" space="2" safeArea>
      <HStack flex="1" alignItems="center" space="4">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={<Feather name="chevron-left" />} size="xl" />
        </Pressable>
        <Text fontSize="3xl">{listData.title}</Text>
      </HStack>
      <VStack>
        <HStack
          alignContent="center"
          justifyContent="space-between"
          flex="1"
          p="2"
        >
          <Flex flex="2">
            <Text>Share</Text>
          </Flex>

          <HStack flex="3">
            <Input />
            <Icon as={<Feather name="search" />} size="xs" m="auto" />
            <Pressable onPress={handleSettingsToggle} m="auto">
              <Icon as={<Feather name="more-vertical" />} size="xs" />
            </Pressable>
          </HStack>
        </HStack>
        {isUser && list && <ItemInput listId={list.id} />}
      </VStack>

      <VStack flex="15" overflow="scroll">
        <HStack flexWrap="wrap">
          {!isLoading &&
            list.items.map((item, index) => (
              <Flex onPress={handleCardPress} key={index} flex="1" m="1">
                <ItemCard
                  item={item}
                  handlePress={() => handleCardPress(item)}
                />
              </Flex>
            ))}
        </HStack>
      </VStack>

      {selectItem && (
        <SelectItemModal
          navigation={navigation}
          isOpen={selectItem !== null}
          onClose={handleClearSelect}
          item={selectItem}
        />
      )}
      <LoadingScreen isLoading={isLoading} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
