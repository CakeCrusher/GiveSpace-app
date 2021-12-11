import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import { Feather } from '@expo/vector-icons';
import { Icon } from 'native-base';

import { fetchGraphQL } from './utils/helperFunctions'
import { signinUser } from './redux/actions/user';
import { signinFriends } from './redux/actions/friends';
import { Home, Login, Friends, MyLists, Account } from './screens';
import { SIGN_IN_USER_BY_ID } from './utils/schemas';

const Tab = createBottomTabNavigator();

const View = ({ signinDispatch, userState }) => {
  useEffect(() => {
    const retrieveUserId = async () => {
      // await AsyncStorage.setItem('user_id', '7c55600d-e5f1-48f3-83d6-3c16ec918693');
      const userId = await AsyncStorage.getItem('user_id');
      if (!userState.id && userId) {
        const registerRes = await fetchGraphQL(SIGN_IN_USER_BY_ID, {
          "user_id": userId,
        })
        signinDispatch(registerRes.data.user[0])
      }
    };
    retrieveUserId();
  }, []);

  if (userState.id) {
    return (
      <NavigationContainer>
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
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Feather name="user" size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return <Login />;
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  signinDispatch: (userRes) => {
    dispatch(signinUser(userRes))
    dispatch(signinFriends(userRes))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
