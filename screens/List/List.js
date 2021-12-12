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
  Center,
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

const ListWrapper = ({
  route,
  navigation,
  userState,
  friendsState,
  populateListFriends,
  populateListUser,
}) => {
  const { listData } = route.params;
  const isUser = userState.id === listData.user_id;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [displayList, setDisplayList] = useState(null);

  useEffect(() => {
    const addListToState = async () => {
      try {
        console.log('FETCHING');
        const listRes = await fetchGraphQL(GET_LIST, {
          list_id: listData.id,
        });
        console.log('addListToState!', listRes);

        if (listRes.errors || !listRes.data.list[0]) {
          throw new Error(listRes.errors);
        } else {
          if (isUser) {
            console.log('isUser!');
            setDisplayList(listRes.data.list[0]);
            populateListUser(listRes.data.list[0]);
          } else {
            console.log('isFriend!');
            setDisplayList(listRes.data.list[0]);
            populateListFriends(listRes.data.list[0]);
          }
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setIsLoading(false);
      }
    };

    const checkState = () => {
      console.log('CHECKING CACHE');
      let list;
      let needsUpdate = true;

      if (isUser) {
        list = userState.lists.find((list) => list.id === listData.id);
      } else {
        const friend = friendsState.list.find(
          (user) => user.id === listData.user_id,
        );
        if (friend) {
          list = friend.lists.find((list) => list.id === listData.id);
        }
      }

      if (list) {
        console.log('check for update');
        needsUpdate =
          list.items.find((e) => Object.keys(e).length === 2) !== undefined;
      }

      if (needsUpdate) {
        console.log(list);
        console.log('needs update');
        addListToState();
      } else {
        console.log('no update');
        setDisplayList(list);
        setIsLoading(false);
      }
    };

    checkState();
  }, [listData]);

  if (hasError) {
    return (
      <VStack safeArea>
        <Center mt="4">
          <Text fontSize="xl">Uh oh. Something went wrong.</Text>
        </Center>
      </VStack>
    );
  }

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (displayList) {
    return <List navigation={navigation} isUser={isUser} list={displayList} />;
  }

  return (
    <VStack safeArea>
      <Center mt="4">
        <Text fontSize="xl">Uh oh. It seems we couldn't find the list</Text>
      </Center>
    </VStack>
  );
};

const List = ({ navigation, list, isUser }) => {
  const [selectItem, setSelectItem] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleCardPress = (item) => {
    console.log(item);
    setSelectItem(item);
  };

  const handleClearSelect = () => {
    setSelectItem(null);
  };

  const handleSettingsToggle = () => {};

  return (
    <VStack flex="1" maxW="100%" p="4" space="2" safeArea>
      <HStack flex="1" alignItems="center" space="4">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={<Feather name="chevron-left" />} size="xl" />
        </Pressable>
        <Text fontSize="3xl">{list.title}</Text>
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
        {isUser && <ItemInput listId={list.id} />}
      </VStack>

      <VStack flex="15" overflow="scroll">
        <HStack flexWrap="wrap" justifyContent="space-between">
          {list.items.map((item, index) => (
            <Flex onPress={handleCardPress} key={index} w="48%">
              <ItemCard item={item} handlePress={() => handleCardPress(item)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListWrapper);
