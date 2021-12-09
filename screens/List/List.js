import React, { useEffect } from 'react';
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

import { ItemCard } from '../../components';

const dummyItem = {
  img_url: '',
  name: 'dummyItem',
};

const List = ({ route, navigation, userState }) => {
  const { user } = userState;
  const { listData, userId } = route.params;

  useEffect(() => {
    if (userId === user.id) {
      console.log('same user');
    } else {
      console.log('different user');
    }
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

  return (
    <VStack flex="1" maxW="100%" p="4" safeArea>
      <HStack flex="1">
        <Pressable onPress={() => navigation.goBack()}>
          <Text>{'<<'}</Text>
        </Pressable>
        <Text>{listData.title}</Text>
      </HStack>

      <VStack>
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
        {userId === user.id && <Text>Inputs</Text>}
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
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
