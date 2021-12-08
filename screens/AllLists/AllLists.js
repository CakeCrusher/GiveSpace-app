import React, { useState, useEffect } from 'react';
import { Text, Heading, Button, Avatar, HStack, VStack } from 'native-base';
import { connect } from 'react-redux';

import { ListPreview } from '../../components';

const sampleLists = {
  userId: 1,
  username: 'krabs',
  lists: [
    {
      name: 'Christmas Wishlist',
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
      name: 'Graduation Gifts',
      items: [
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
    {
      name: 'Christmas Wishlist',
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
      name: 'Graduation Gifts',
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
    {
      name: 'Christmas Wishlist',
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
      name: 'Graduation Gifts',
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

const AllLists = ({ user }) => {
  return (
    <VStack space="4" p="4" flex="1" bg="#dfdfdf" safeArea>
      <HStack flex="1" alignItems="center">
        <Avatar bg="#FAA" source={{ uri: '' }}>
          EX
        </Avatar>
        <Heading ml="4">
          {sampleLists.userId === user.id ? 'Your ' : `${user.username}'s `}List
        </Heading>
      </HStack>
      <VStack flex="15" space="4" overflow="scroll">
        {sampleLists.lists.map((list, index) => (
          <ListPreview listData={list} />
        ))}
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, {})(AllLists);
