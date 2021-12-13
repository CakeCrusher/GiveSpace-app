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

import { ListPreview, LoadingScreen, PopoverIcon } from "../../components";
import { BirthdaySvg, LocationSvg } from '../../resources';

import { fetchGraphQL, useField } from "../../utils/helperFunctions";
import { SIGN_IN_USER_BY_ID } from "../../utils/schemas";
import { logout } from "../../redux/actions/user";

const AccountWrapper = ({
  route,
  navigation,
  userState,
  friendsState,
  logout,
  deleteAccount,
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
    return (
      <Account
        navigation={navigation}
        isUser={isUser}
        logout={logout}
        deleteAccount={deleteAccount}
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
    <HStack flex="1" justifyContent="flex-end">
      <Box>
        <Pressable p="2">
          <Icon as={<Feather name="plus" />} size="sm" />
        </Pressable>
      </Box>
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
  deleteAccount,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const password = useField("password", "");

  const handleLogout = () => {
    logout();
  };

  const handleStartDelete = () => {
    setShowDelete(true);
  };

  const handleConfirmDelte = () => {
    deleteAccount();
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
                uri: user.profile_pic_url || "https://via.placeholder.com/50/66071A/FFFFFF?text=GS",
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
          {/*TODO: Change these*/}
          <HStack space="2">
            <BirthdaySvg />
            <Text>birthday</Text>
          </HStack>
          <HStack space="2">
            <LocationSvg />
            <Text>address</Text>
          </HStack>
        </HStack>

        <VStack flex="5" space="2">
          <Text fontSize="2xl">
            {isUser ? "My" : user.username + "'s"} Lists
          </Text>
          {lists ? (
            <>
              <ScrollView>
                <Box maxH="80">
                  {lists.map((e) => (
                    <ListPreview key={e.id} listData={e} mb="2" />
                  ))}
                </Box>
              </ScrollView>
              <Box h="2" />
              <Button
                variant="outline"
                onPress={() => navigation.navigate("My Lists")}
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
            {friends.map((f) => (
              <Box
                key={f.id}
                flexBasis="25%"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  size="md"
                  bg="#FAF" 
                  source={{
                    uri: f.profile_pic_url || "https://via.placeholder.com/50/66071A/FFFFFF?text=GS",
                  }}
                />
              </Box>
            ))}
          </HStack>
        </VStack>
      </ScrollView>
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)}>
        <Modal.Content>
          <Modal.Header>
            Are you sure you want to delete your account?
          </Modal.Header>
          <Modal.Body>
            <VStack space="4">
              <Center>
                <Text>Please enter your password:</Text>
                <Input />
              </Center>
              <HStack space="4">
                <Button flex="1" colorScheme="info">
                  No
                </Button>
                <Button flex="1" colorScheme="danger">
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
  deleteAccount: () => console.log("Implement account deletion"),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountWrapper);
