import React, { useState, useEffect } from 'react';
import {
  Text,
  Heading,
  Button,
  Avatar,
  HStack,
  VStack,
  Fab,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { ListPreview } from '../../components';

const AllLists = ({ route, navigation, userState }) => {
  const { user } = userState;
  const { userId, tabName } = route.params;
  const [lists, setLists] = useState(null);

  useEffect(() => {
    console.log(userId, user.id);
    if (userId === user.id) {
      console.log(user.lists);
      setLists(user.lists);
    } else {
      // TODO: Make a Fetch
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
          EX
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
      {userId === user.id && (
        <Button
          position="absolute"
          borderRadius="32"
          h="16"
          w="16"
          bottom="4"
          right="4"
          zIndex="99"
        >
          <Icon as={<Feather name="plus" />} size="sm" color="white" />
        </Button>
      )}
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, {})(AllLists);
