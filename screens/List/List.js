import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  Text,
  Heading,
  Button,
  Avatar,
  Icon,
  Pressable,
  Flex,
  HStack,
  VStack,
} from 'native-base';

import { populateListUser } from '../../redux/actions/user';
import { populateListFriends } from '../../redux/actions/friends';
import { ItemCard } from '../../components';
import { fetchGraphQL } from '../../utils/helperFunctions';
import { GET_LIST } from '../../utils/schemas';

const dummyItem = {
  img_url: '',
  name: 'dummyItem',
};

const List = ({ route, navigation, userState, friendsState, populateListFriends, populateListUser }) => {
  const user = userState;
  const { listData } = route.params;
  const [isUser, setIsUser] = useState(true);

  // ROUTES TO LIST IN STATE vvvv-list-vvvv
  const list = isUser ?
    userState.lists.find(list => list.id === listData.id)
    :
    friendsState.list.find(
      user => user.lists.find(
        list => list.id === listData.id
      )
    ).lists.find(list => list.id === listData.id)

  console.log('CURRENT LIST: ', list);

  useEffect(() => {
    const addListToState = async () => {
      const listRes = await fetchGraphQL(GET_LIST, {
        "list_id": listData.id
      })
      console.log('addListToState!', listRes);
      
      if (listRes.errors || !listRes.data.list[0]) {
        console.log('ERROR!',listRes.errors)
        return
      } else {
        if (userState.lists.find((list) => list.id === listData.id)) {
          console.log('isUser!');
          populateListUser(listRes.data.list[0])
        } else {
          console.log('isFriend!');
          setIsUser(false)
          populateListFriends(listRes.data.list[0])
        }
        return
      }
    }
    addListToState();
  }, []);
  //TODO: Still need to figure this out, but navigation is pretty good


  //TODO: Are we lazy fetching items?
  console.log(listData);

  const handleCardPress = () => {
    console.log('card press');
  };

  const handleSearchToggle = () => {
    setShowSearch((e) => !e);
  };

  const handleSettingsToggle = () => {};

  // SOME STYLING ERROR HERE
  return (
    <VStack flex="1" maxW="100%" p="4" safeArea>
      <HStack flex="1">
        <Pressable onPress={() => navigation.goBack()}>
          <Text>{'<<'}</Text>
        </Pressable>
        <Text>{listData.title}</Text>
      </HStack>
      
      {/* <VStack>
        <HStack
          alignContent="center"
          justifyContent="space-between"
          flex="1 0 auto"
          p="2"
        >
          <Flex flex="5">
            <Text>Share</Text>
          </Flex>

          <HStack flex="1">
            <Pressable onPress={handleSearchToggle} m="auto">
              <Icon as={<Feather name="search" />} size="xs" />
            </Pressable>
            <Pressable onPress={handleSettingsToggle} m="auto">
              <Icon as={<Feather name="more-vertical" />} size="xs" />
            </Pressable>
          </HStack>
        </HStack>
        {isUser && <Text>Inputs</Text>}
      </VStack>

      <VStack flex="15" overflow="scroll">
        <HStack flexWrap="wrap">
          {listData.items.map((item, index) => (
            <Flex onPress={handleCardPress} key={index} flex="1 0 40%" m="1">
              <ItemCard item={item} handlePress={handleCardPress} />
            </Flex>
          ))}
          {listData.items.length % 2 !== 0 && (
            <Flex onPress={handleCardPress} flex="1 0 40%" m="1" />
          )}
        </HStack>
      </VStack> */}
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
