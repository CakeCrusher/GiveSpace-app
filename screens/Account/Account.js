import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Heading,
  Button,
  VStack,
  ScrollView,
  Box,
  HStack,
  Flex,
  View,
  Avatar,
  Icon,
  Pressable,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { ListPreview } from '../../components';

import { fetchGraphQL } from '../../utils/helperFunctions';
import { SIGN_IN_USER_BY_ID } from '../../utils/schemas';
import { logout } from '../../redux/actions/user';

const Account = ({ route, navigation, userState, friendsState, logout }) => {
  const [data, setData] = useState({
    user: null,
    friends: null,
    lists: null,
  });
  const isUser = userId === userState.id;

  const { userId } = route.params;
  console.log(userId);

  useEffect(() => {
    if (isUser) {
      setData({
        user: userState,
        friends: friendsState.list,
        lists: userState.lists,
      });
    } else {
      // Fetch
      fetchGraphQL(SIGN_IN_USER_BY_ID, { user_id: userId }).then((res) => {
        console.log(res);
        const user = res.data.user[0];
        setData({
          user: user,
          friends: user.friend_rels.map((e) => e.userByUserSecondId),
          lists: user.lists,
        });
      });
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <VStack safeArea p="4">
      <ScrollView>
        <HStack mb="2" alignItems="center" justifyContent="space-between">
          {/* TODO: Update these pressables */}
          <Flex flex="1">
            <Pressable p="2" onPress={handleBack}>
              <Icon as={<Feather name="chevron-left" />} size="lg" />
            </Pressable>
          </Flex>
          <HStack flex="1" justifyContent="flex-end">
            <Pressable p="2">
              <Icon as={<Feather name="plus" />} size="sm" />
            </Pressable>
            <Pressable p="2" onPress={handleLogout}>
              <Icon as={<Feather name="more-vertical" />} size="sm" />
            </Pressable>
          </HStack>
        </HStack>

        <HStack alignItems="center" space="4">
          <Box flex="2">
            <Avatar bg="#FAA" size="xl" source={{ uri: '' }}>
              EX
            </Avatar>
          </Box>
          <VStack flex="5" ml="auto">
            <Text fontSize="3xl">{data.user && data.user.username}</Text>
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

        <VStack flex="5" space="2">
          <Text fontSize="2xl">My Lists</Text>
          {data.user &&
            (data.user.lists ? (
              <>
                <ScrollView>
                  <View maxH="80">
                    {data.lists.map((e) => (
                      <ListPreview key={e.id} listData={e} mb="2" />
                    ))}
                  </View>
                </ScrollView>
                <View h="2" />
                <Button
                  variant="outline"
                  onPress={() => navigation.navigate('My Lists')}
                >
                  All Lists
                </Button>
              </>
            ) : (
              <Text fontSize="2xl">
                {isUser
                  ? "You don't have any lists"
                  : `${data.user.username} doesn't have any lists`}
              </Text>
            ))}
        </VStack>

        <VStack>
          <Text fontSize="3xl">Friends</Text>
          {/* Add Friends */}
          <HStack flexWrap="wrap">
            {data.friends &&
              data.friends.map((e) => (
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
      </ScrollView>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
