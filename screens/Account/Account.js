import React from 'react';
import { connect } from 'react-redux';
import { Text, Heading, VStack, Box, HStack, Avatar } from 'native-base';

import { ListPreview } from '../../components';

const Account = ({ navigation, userState }) => {
  const { user } = userState;

  return (
    <VStack safeArea p="4" overflowY="scroll">
      <HStack alignItems="center" space="4">
        <Avatar flex="2" bg="#FAA" size="xl" source={{ uri: '' }}>
          EX
        </Avatar>
        <VStack flex="5" ml="auto">
          <Text fontSize="3xl">{user.username}</Text>
          {/*
          TODO: Description to be added
          <Text noOfLines={2}>
            ttestetstes tstsetsetse testetests estestestets etstestets
            etsettestest ests etse testsetseteste sette
          </Text>
          */}
        </VStack>
      </HStack>

      <HStack space="4" mt="4">
        {/*TODO: Change these*/}
        <HStack space="2">
          <Text>_</Text>
          <Text>Birthday</Text>
        </HStack>
        <HStack space="2">
          <Text>_</Text>
          <Text>State, City</Text>
        </HStack>
      </HStack>

      <VStack maxH="30%">
        <Text fontSize="3xl">Lists</Text>
        {/* TODO: Add ListPreviews*/}
        {user.lists.map((e) => {})}
      </VStack>

      <VStack>
        <Text fontSize="3xl">Friends</Text>
        {/* Add Friends */}
        <HStack flexWrap="wrap">
          {user.friends.map((e) => (
            <Box
              key={e.id}
              flexBasis="25%"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar size="md" bg="#FAF" />
            </Box>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, null)(Account);
