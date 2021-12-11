import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FriendsScreen from './FriendsScreen';
import AllLists from '../AllLists/AllLists';
import List from '../List/List';
import Account from '../Account/Account';

const Stack = createNativeStackNavigator();

const FriendsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FriendsLists"
        component={AllLists}
        initialParams={{ tabName: 'Friends' }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FriendAccount"
        component={Account}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FriendsNavigator;
