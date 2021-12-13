import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import { Feather } from '@expo/vector-icons';
import { Icon } from 'native-base';

import { fetchGraphQL } from './utils/helperFunctions';
import { signinUser } from './redux/actions/user';
import { signinFriends, reloadFriends } from './redux/actions/friends';
import { Home, Login, Friends, MyLists, Account } from './screens';
import { GET_FRIEND_RELS, SIGN_IN_USER_BY_USERNAME } from './utils/schemas';
import * as ScreenOrientation from 'expo-screen-orientation';
import Welcome from './screens/Login/Welcome';

const Tab = createBottomTabNavigator();

const View = ({ signinDispatch, userState, reloadFriends }) => {
  const [username, setUsername] = useState(null);
  useEffect( async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    const retrieveUserId = async () => {
      await AsyncStorage.setItem('username', 'Sebas');
      // await AsyncStorage.removeItem('username')
      const _username = await AsyncStorage.getItem('username');
      setUsername(_username);
      if (!userState.id && _username) {
        const registerRes = await fetchGraphQL(SIGN_IN_USER_BY_USERNAME, {
          username: _username,
        });
        signinDispatch(registerRes.data.user[0]);
      }
      return;
    };
    await retrieveUserId();
  }, []);

  const getFriends = async () => {
    const fetchRes = await fetchGraphQL(GET_FRIEND_RELS, {
      user_id: userState.id,
    });
    console.log('!fetchRes', fetchRes);
    const friends = fetchRes.data.friend_rel;
    reloadFriends(friends);
  };
  return <Welcome username={username} />
  if (userState.id) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name="home" size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={Friends}
          listeners={{
            tabPress: (e) => getFriends(),
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name="users" size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="My Lists"
          component={MyLists}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name="list" size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          initialParams={{ userId: userState.id }}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name="user" size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return <Login />;
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  reloadFriends: (friends) => dispatch(reloadFriends(friends)),
  signinDispatch: (userRes) => {
    dispatch(signinUser(userRes));
    dispatch(signinFriends(userRes));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
