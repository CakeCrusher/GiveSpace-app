import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import { Text, Button, VStack } from 'native-base';

import { setFriends } from '../../redux/actions/friends';

// vvvvv useful function for connecting to backend vvvvv
import { fetchGraphQL } from '../../utils/helperFunctions';
// vvvvv Contains the query you send to the backend vvvvv
import { SIGN_IN_USER } from '../../utils/schemas';

const sample_lists = {
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
      items: [
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
        { name: 'Lorem ipsum' },
      ],
    },
  ],
};

const Home = ({ user, setFriends }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      // Pull data from device's Contacts list
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        /**
         * TODO: Send to pulled contacts to backend:
         *   - https://trello.com/c/se6nKfKh
         */
        console.log('Contact data: ', data.slice(0, 2));

        // saving contacts to redux
        setFriends(data);
      } else {
        console.log('Permission not granted');
      }
    };
    requestPermission();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    const { data } = await fetchGraphQL(SIGN_IN_USER, {
      password: 'secret',
      username: 'Krabs',
    });
    if (data.user.length) {
      setUser(data.user[0]);
    } else {
      console.log('No user found');
    }
    setLoading(false);
  };

  return (
    <VStack>
      <Text fontSize="3xl">Hello, {user.username}</Text>
      <Text fontSize="3xl">User</Text>
      <Button onPress={handleSignIn}>Auto sign in</Button>
      {user ? (
        <>
          <Text fontSize="xl">Username: {user.username}</Text>
          <Text fontSize="xl">Password: {user.password}</Text>
        </>
      ) : loading ? (
        <Text fontSize="xl">Loading...</Text>
      ) : null}
      <Button onPress={() => props.navigation.navigate('Friends')}>
        Go to friends screen
      </Button>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});
const mapDispatchToProps = (dispatch) => ({
  setFriends: (friends) => dispatch(setFriends(friends)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
