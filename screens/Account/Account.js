import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Svg, Path } from 'react-native-svg';

import {
  Text,
  Heading,
  Button,
  Input,
  Pressable,
  ScrollView,
  VStack,
  HStack,
  Box,
  Flex,
  Center,
  Avatar,
  Icon,
  Popover,
  Modal,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { ListPreview, LoadingScreen, PopoverIcon } from '../../components';
import { BirthdaySvg, LocationSvg } from '../../resources';

import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import {
  DELETE_USER,
  SIGN_IN_USER_BY_ID,
  UPDATE_USER_ADDRESS,
} from '../../utils/schemas';
import { editAddress, logout } from '../../redux/actions/user';
import Flare from '../../components/Flare';

const AccountWrapper = ({
  route,
  navigation,
  userState,
  friendsState,
  logout,
  editAddress,
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
  }, [userState, friendsState]);

  if (hasError) {
    console.log(hasError);
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
    return (
      <Account
        navigation={navigation}
        isUser={isUser}
        logout={logout}
        editAddress={editAddress}
        {...data}
      />
    );
  }

  return (
    <VStack safeArea>
      <Center mt="4">
        <Text fontSize="xl">Uh oh. It seems we couldn't find this user.</Text>
      </Center>
    </VStack>
  );
};

const UserOptions = ({ handleLogout, handleStartDelete }) => {
  return (
    <HStack flex="1" mt={8} justifyContent="flex-end">
      <Box p="2">
        <PopoverIcon iconName="more-vertical" menuTitle="User Options">
          <Pressable onPress={handleLogout}>
            <Box p="2">
              <Text>Logout</Text>
            </Box>
          </Pressable>
          <Pressable onPress={handleStartDelete}>
            <Box p="2" pt="4">
              <Text color="red.500">Delete Account</Text>
            </Box>
          </Pressable>
        </PopoverIcon>
      </Box>
    </HStack>
  );
};

const Account = ({
  navigation,
  isUser,
  user,
  friends,
  lists,
  logout,
  editAddress,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const address = useField('text', user.address);

  const handleLoadList = (listData, userData) => {
    navigation.navigate('Home', {
      screen: 'List',
      params: {
        listData,
        userData,
      },
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleStartDelete = () => {
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    logout();
    fetchGraphQL(DELETE_USER, {
      user_id: user.id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddressSet = () => {
    fetchGraphQL(UPDATE_USER_ADDRESS, {
      user_id: user.id,
      address: address.value,
    })
      .then((res) => {
        console.log(res);
        const resData = res.data.update_user.returning[0];
        editAddress(resData.address);
      })
      .catch((err) => console.log(err));
  };

  const handleNavigation = () => {
    if (isUser) {
      navigation.navigate('My Lists');
    } else {
      navigation.navigate('Friends', {
        screen: 'FriendsLists',
        params: { userId: user.id },
      });
    }
  };

  return (
    <VStack flex="1" p="4" safeArea>
      <Flare />
      <ScrollView>
        <HStack mb="2" alignItems="center" justifyContent="space-between">
          {/* TODO: Update these pressables */}
          <Flex flex="1">
            <Pressable p="2" onPress={handleBack}>
              <Icon as={<Feather name="chevron-left" />} size="lg" />
            </Pressable>
          </Flex>
          {isUser && (
            <UserOptions
              handleLogout={handleLogout}
              handleStartDelete={handleStartDelete}
            />
          )}
        </HStack>

        <HStack alignItems="center" space="4">
          <Box flex="2">
            <Avatar
              bg="#FAA"
              size="xl"
              source={{
                uri:
                  user.profile_pic_url ||
                  'https://via.placeholder.com/50/66071A/FFFFFF?text=GS',
              }}
            >
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
          <HStack space="1" alignItems="center">
            <LocationSvg />
            {isUser ? (
              <Flex h="9">
                <Input
                  backgroundColor="#ffffff00"
                  borderColor="#ffffff00"
                  placeholder="delivery address"
                  fontSize="sm"
                  onEndEditing={handleAddressSet}
                  h="10"
                  {...address}
                />
              </Flex>
            ) : (
              <Text fontSize="sm">{user.address || '(no address)'}</Text>
            )}
          </HStack>
        </HStack>

        <VStack flex="5" space="2">
          <Text fontSize="2xl">
            {isUser ? 'My' : user.username + "'s"} Lists
          </Text>
          {lists ? (
            <>
              <ScrollView>
                <Box maxH="80">
                  {lists.map((list) => (
                    <ListPreview
                      key={list.id}
                      listData={list}
                      mb="2"
                      onPress={() => handleLoadList(list, user)}
                    />
                  ))}
                </Box>
              </ScrollView>
              <Box h="2" />
              <Button variant="outline" onPress={handleNavigation}>
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
      </ScrollView>
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)}>
        <Modal.Content>
          <Modal.Header>
            Are you sure you want to delete your account?
          </Modal.Header>
          <Modal.Body>
            <VStack space="4">
              <HStack space="4">
                <Button flex="1" colorScheme="info">
                  No
                </Button>
                <Button
                  onPress={handleConfirmDelete}
                  flex="1"
                  colorScheme="danger"
                >
                  Yes
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  editAddress: (address) => dispatch(editAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountWrapper);
