import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'native-base';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';

import { setFriends } from '../../redux/actions/friends';

import { Layout } from '../../components';

// vvvvv useful function for connecting to backend vvvvv
import { fetchGraphQL } from '../../utils/helperFunctions';
// vvvvv Contains the query you send to the backend vvvvv
import { SIGN_IN_USER } from '../../utils/schemas';

import { SECRET } from 'react-native-dotenv';

const Home = (props) => {
  const [user, setUser] = useState(null);
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
        props.setFriends(data);
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
    <Layout>
      <View style={styles.container}>
        <Text fontSize="5xl">Home</Text>
        <Text fontSize="3xl">Test .env: {SECRET}</Text>
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
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 1,
  },
});

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  setFriends: (friends) => dispatch(setFriends(friends)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
