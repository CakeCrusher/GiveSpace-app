import React, { useState } from 'react';
import {
  Text,
  Button,
  Input,
  Pressable,
  ScrollView,
  VStack,
  HStack,
  Box,
  Flex,
  Avatar,
  Icon,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, Clipboard } from 'react-native';

import {
  ScreenContainer,
  Flare,
  GalleryButton,
  ListPreview,
  PopoverIcon,
} from '../../components';
import { DELETE_USER, UPDATE_USER_ADDRESS } from '../../utils/schemas';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';
import { LocationSvg } from '../../resources';
import DeleteAccountModal from './DeleteAccountModal';

const UserOptions = ({ handleLogout, handleStartDelete }) => {
  return (
    <HStack flex="1" justifyContent="flex-end" alignItems="center">
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

const AccountDisplay = ({
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

  const copyToClipboard = () => {
    if (!isUser && address.value) {
      Clipboard.setString(address.value);
    }
  };

  return (
    <ScreenContainer>
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
          {console.log('!user.profile_pic_url', user.profile_pic_url)}
          <Box flex="2">
            {isUser ? (
              <GalleryButton />
            ) : (
              <Avatar
                bg="#FAA"
                size="xl"
                key={user.profile_pic_url}
                source={{
                  uri: user.profile_pic_url,
                }}
              >
                EX
              </Avatar>
            )}
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

        <TouchableOpacity onPress={copyToClipboard}>
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
                <Text fontSize="sm">
                  {user.address || '(no delivery address)'}
                </Text>
              )}
              {user.address && !isUser ? (
                <Icon opacity={0.7} as={<Feather name="copy" />} size="xs" />
              ) : null}
            </HStack>
          </HStack>
        </TouchableOpacity>

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
              <Button
                _text={{ fontSize: 'xl' }}
                variant="outline"
                onPress={handleNavigation}
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
      </ScrollView>
      <DeleteAccountModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        handleConfirmDelete={handleConfirmDelete}
      />
    </ScreenContainer>
  );
};

export default AccountDisplay;
