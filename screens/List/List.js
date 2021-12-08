import React, { useState, useEffect } from 'react';
import {
  Text,
  Heading,
  Button,
  Avatar,
  Pressable,
  HStack,
  VStack,
} from 'native-base';

import { ItemCard } from '../../components';

const List = ({ route, navigation }) => {
  const { listData } = route.params;
  //TODO: Still need to figure this out, but navigation is pretty good
  //TODO: Are we lazy fetching items?
  console.log(route);

  return (
    <VStack safeArea>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>{'<<'}</Text>
      </Pressable>
      <Text>{listData.title}</Text>
    </VStack>
  );
};

export default List;
