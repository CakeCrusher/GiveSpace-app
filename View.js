import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import { signinById } from './redux/actions/user';
import { Home, Login, Friends, MyLists, Account } from './screens';

const Tab = createBottomTabNavigator();

const View = ({ signinById, userState }) => {
  useEffect(() => {
    const retrieveUserId = async () => {
      if (!userState.user) {
        const userId = await AsyncStorage.getItem('user_id');
        if (userId) {
          console.log('Logged in with: ', userId);
          signinById({ userId });
        } else {
          console.log('Not logged in');
        }
      }
    };
    retrieveUserId();
  }, []);

  if (userState.user) {
    console.log(userState);
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Friends"
            component={Friends}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="My Lists"
            component={MyLists}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
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
  signinById: (user_id) => dispatch(signinById(user_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
