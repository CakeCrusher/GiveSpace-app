import React, { useState, useEffect } from 'react';
import { Text, Heading, Button, Avatar, HStack, VStack } from 'native-base';
import { connect } from 'react-redux';

import { ListPreview } from '../../components';

const sampleLists = {
  userId: 0,
  username: 'krabs',
  lists: [
    {
      title: 'Christmas Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      title: 'Graduation Gifts',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      title: 'Party Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      title: 'Christmas Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      title: 'Graduation Gifts',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      title: 'Party Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      title: 'Christmas Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      title: 'Graduation Gifts',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      name: 'Party Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
  ],
};

const AllLists = ({ route, navigation, user }) => {
  const { userId, tabName } = route.params;
  const [lists, setLists] = useState(null);

  useEffect(() => {
    if (userId === user.id) {
      // TODO:
      setLists(sampleLists.lists);
    } else {
      // TODO:
      setLists([]);
    }
  }, []);

  const handleLoadList = (listData) => {
    navigation.navigate(tabName, {
      screen: 'List',
      params: { listData },
    });
  };

  return (
    <VStack space="4" p="4" flex="1" bg="#dfdfdf" safeArea>
      <HStack flex="1" alignItems="center">
        <Avatar bg="#FAA" source={{ uri: '' }}>
          EX: {userId}
        </Avatar>
        <Heading ml="4">
          {userId === user.id ? 'Your ' : `${user.username}'s `}
          Lists
        </Heading>
      </HStack>
      <VStack flex="15" space="4" overflow="scroll">
        {lists &&
          lists.map((list, index) => (
            <ListPreview listData={list} onPress={() => handleLoadList(list)} />
          ))}
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(AllLists);
