import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  SlideFade,
  Icon,
  Input,
  Text,
  Flex,
  Pressable,
  Button,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useField } from '../../utils/helperFunctions';

import FriendRow from './FriendRow';

const FriendsScreen = ({ navigation, userState }) => {
  const [showSearch, setShowSearch] = useState(false);
  const search = useField('text', '');

  const handleSearchToggle = () => {
    setShowSearch((e) => !e);
  };

  const handleSettingsToggle = () => {};

  return (
    <VStack space="4" p="4" flex="1" safeArea>
      <HStack flex="1" justifyContent="space-between">
        <Flex flex="5">
          <Text fontSize="3xl">Friends</Text>
        </Flex>
        <HStack
          alignContent="center"
          justifyContent="space-between"
          flex="1 0 auto"
        >
          <Pressable onPress={handleSearchToggle} m="auto">
            <Icon as={<Feather name="search" />} size="sm" />
          </Pressable>
          <Pressable onPress={handleSettingsToggle} m="auto">
            <Icon as={<Feather name="more-vertical" />} size="sm" />
          </Pressable>
        </HStack>
      </HStack>

      <SlideFade in={showSearch}>
        <Box h={showSearch ? '8' : '0'} px={showSearch ? '4' : '0'}>
          {showSearch && <Input {...search} placeholder="search" />}
        </Box>
      </SlideFade>

      <VStack flex="15">
        {userState.user.friends.map((friend) => (
          <FriendRow
            key={friend.id}
            username={friend.username}
            navigation={navigation}
          />
        ))}
        {/*user.friends.map((friend) => (
        <FriendRow
          key={friend.id}
          username={friend.username}
          profile_pic_url={friend.profile_pic_url}
          navigation={navigation}
        />
      ))*/}
      </VStack>
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
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);
