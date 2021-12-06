import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import { Text, Button, HStack, VStack } from 'native-base';

import { ListPreview } from '../../components';

import { setUser } from '../../redux/actions/user';
// vvvvv useful function for connecting to backend vvvvv
import { fetchGraphQL } from '../../utils/helperFunctions';
// vvvvv Contains the query you send to the backend vvvvv
import { SIGN_IN_USER } from '../../utils/schemas';

// Replace this with real get request
const sampleLists = {
  recent: {
    name: 'Christmas Wishlist',
    items: [
      { name: 'Lorem ipsum' },
      { name: 'Lorem ipsum' },
      { name: 'Lorem ipsum' },
      { name: 'Lorem ipsum' },
      { name: 'Lorem ipsum' },
      { name: 'Lorem ipsum' },
    ],
  },
  friend_activity: [
    {
      name: 'Christmas Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      name: 'Christmas Wishlist',
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
    {
      name: 'Christmas Wishlist',
      items: [{ name: 'Lorem ipsum' }, { name: 'Lorem ipsum' }],
    },
  ],
};

const Home = ({ user, logout, navigation }) => {
  const [loading, setLoading] = useState(false);
  console.warn('HOME2');

  useEffect(() => {
    const requestPermission = async () => {
      // Pull data from device's Contacts list
      const { status } = await Contacts.requestPermissionsAsync();
      //if (status === 'granted') {
      //  const { data } = await Contacts.getContactsAsync({
      //    fields: [
      //      Contacts.Fields.FirstName,
      //      Contacts.Fields.LastName,
      //      Contacts.Fields.PhoneNumbers,
      //    ],
      //  });

      //  /**
      //   * TODO: Send to pulled contacts to backend:
      //   *   - https://trello.com/c/se6nKfKh
      //   */
      //  console.log('Contact data: ', data.slice(0, 2));

      //  // saving contacts to redux
      //  setFriends(data);
      //} else {
      //  console.log('Permission not granted');
      //}
    };
    requestPermission();
  }, []);

  return (
    <VStack
      space="2"
      p="4"
      flex="1"
      bg="#dfdfdf"
      justifyContent="space-between"
      safeArea
    >
      <HStack justifyContent="space-between">
        <Text fontSize="md">Hello, {user.username}</Text>
        <Text fontSize="md">Nov, 28</Text>
      </HStack>

      <VStack flex="5" space="2">
        <Text fontSize="2xl">Recent</Text>
        <ListPreview listData={sampleLists.recent} />
        {/*TODO: Need to decide how to "pass selected list" through navigation */}
        <Button
          variant="outline"
          bg="#fff"
          color="#000"
          onPress={() => navigation.navigate('Lists')}
        >
          All Lists
        </Button>
      </VStack>

      <VStack flex="7" space="2">
        <Text fontSize="2xl">Friends</Text>
        <HStack space="2" flexWrap="wrap">
          {sampleLists.friend_activity.map((list, index) => {
            if ((index + 1) % 2 === 0) {
              return (
                <ListPreview
                  listData={list}
                  styleProps={{ maxW: '45%', mt: '2', ml: 'auto' }}
                />
              );
            } else {
              return (
                <ListPreview
                  listData={list}
                  styleProps={{ maxW: '45%', mt: '2' }}
                />
              );
            }
          })}
        </HStack>
      </VStack>

      <Button flex="1" onPress={logout}>
        Logout
      </Button>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(setUser(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
