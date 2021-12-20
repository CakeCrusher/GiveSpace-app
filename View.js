import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';

import { fetchGraphQL } from './utils/helperFunctions';
import { setStateUsername, signinUser } from './redux/actions/user';
import { signinFriends, reloadFriends } from './redux/actions/friends';
import { Home, Login, Friends, MyLists, Account } from './screens';
import { GET_FRIEND_RELS, SIGN_IN_USER_BY_USERNAME } from './utils/schemas';
import Welcome from './screens/Login/Welcome';
import { TabIcon } from './components';

const Tab = createBottomTabNavigator();

const View = ({
  signinDispatch,
  userState,
  reloadFriends,
  setStateUsername,
}) => {
  useEffect(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    );
    const retrieveUserId = async () => {
      // await AsyncStorage.setItem('username', 'Sebas');
      // await AsyncStorage.removeItem('username')
      const _username = await AsyncStorage.getItem('username');
      if (_username) {
        setStateUsername(_username);
      } else {
        setStateUsername(false);
      }
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
    //console.log(
    //  '!fetchRes',
    //  fetchRes.data.friend_rel.filter((f) => f.type === 'pending_first'),
    //);
    const friends = fetchRes.data.friend_rel;
    reloadFriends(friends);
  };
  if (userState.id) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName="home" title="Home" />
            ),
          }}
        />
        <Tab.Screen
          name="My Lists"
          component={MyLists}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName="list" title="My Lists" />
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
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName="users" title="Friends" />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          initialParams={{ userId: userState.id }}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName="user" title="Account" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  if (userState.username) {
    return <Welcome username={userState.username} />;
  }
  return <Login />;
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  reloadFriends: (friends) => dispatch(reloadFriends(friends)),
  setStateUsername: (username) => dispatch(setStateUsername(username)),
  signinDispatch: (userRes) => {
    dispatch(signinUser(userRes));
    dispatch(signinFriends(userRes));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
