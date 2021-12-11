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
  Popover,
  Pressable,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { ListPreview, LoadingScreen } from '../../components';

import { fetchGraphQL } from '../../utils/helperFunctions';
import { SIGN_IN_USER_BY_ID } from '../../utils/schemas';
import { logout } from '../../redux/actions/user';

const AccountWrapper = ({
  route,
  navigation,
  userState,
  friendsState,
  logout,
}) => {
  /** DATA_STATE = {
   *   user:
   *   friends:
   *   lists:
   * }
   */
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = route.params;
  const isUser = userId === userState.id;

  useEffect(() => {
    if (isUser) {
      setData({
        user: userState,
        friends: friendsState.list,
        lists: userState.lists,
      });
      setIsLoading(false);
    } else {
      // Fetch
      fetchGraphQL(SIGN_IN_USER_BY_ID, { user_id: userId })
        .then((res) => {
          const user = res.data.user[0];
          setData({
            user: user,
            friends: user.friend_rels.map((e) => e.userByUserSecondId),
            lists: user.lists,
          });
        })
        .catch((err) => setHasError(err))
        .finally(() => setIsLoading(false));
    }
  }, [userId]);

  if (hasError) {
    return (
      <VStack safeArea>
        <Center mt="4">
          <Text fontSize="xl">Uh oh. We ran into a problem.</Text>
        </Center>
      </VStack>
    );
  }

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (data) {
    return <Account navigation={navigation} isUser={isUser} {...data} />;
  }

  return (
    <VStack safeArea>
      <Center mt="4">
        <Text fontSize="xl">Uh oh. It seems we couldn't find this user.</Text>
      </Center>
    </VStack>
  );
};

const UserOptions = () => {
  return (
    <HStack flex="1" justifyContent="flex-end">
      <Box>
        <Pressable p="2">
          <Icon as={<Feather name="plus" />} size="sm" />
        </Pressable>
      </Box>
      <Box p="2">
        <Popover
          placement={'left top'}
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <Icon as={<Feather name="more-vertical" />} size="sm" />
              </Pressable>
            );
          }}
        >
          <Popover.Content>
            <Popover.Body>
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  User Options
                </Text>
              </Box>
              <VStack>
                <Pressable>
                  <Box p="2">
                    <Text>Test</Text>
                  </Box>
                </Pressable>
                <Pressable>
                  <Box p="2">
                    <Text>Test</Text>
                  </Box>
                </Pressable>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover>
      </Box>
    </HStack>
  );
};

const Account = ({ navigation, isUser, user, friends, lists }) => {
  const handleLogout = () => {
    logout();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <VStack flex="1" p="4" safeArea>
      <ScrollView>
        <HStack mb="2" alignItems="center" justifyContent="space-between">
          {/* TODO: Update these pressables */}
          <Flex flex="1">
            <Pressable p="2" onPress={handleBack}>
              <Icon as={<Feather name="chevron-left" />} size="lg" />
            </Pressable>
          </Flex>
          {isUser && <UserOptions />}
        </HStack>

        <HStack alignItems="center" space="4">
          <Box flex="2">
            <Avatar bg="#FAA" size="xl" source={{ uri: '' }}>
              EX
            </Avatar>
          </Box>
          <VStack flex="5" ml="auto">
            <Text fontSize="3xl">{user && user.username}</Text>
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
            <Text>{user.birthday}</Text>
          </HStack>
          <HStack space="2">
            <Text>_</Text>
            <Text>{user.address}</Text>
          </HStack>
        </HStack>

        <VStack flex="5" space="2">
          <Text fontSize="2xl">
            {isUser ? 'My' : user.username + "'s"} Lists
          </Text>
          {lists ? (
            <>
              <ScrollView>
                <View maxH="80">
                  {lists.map((e) => (
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
                : `${user.username} doesn't have any lists`}
            </Text>
          )}
        </VStack>

        <VStack>
          <Text fontSize="3xl">Friends</Text>
          {/* Add Friends */}
          <HStack flexWrap="wrap">
            {friends.map((e) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountWrapper);
