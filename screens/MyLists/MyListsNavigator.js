import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllLists from '../AllLists/AllLists';
import List from '../List/List';

const Stack = createNativeStackNavigator();

const MyListsNavigator = ({ navigation, userState }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyListsScreen"
        component={AllLists}
        initialParams={{ tabName: 'My Lists', userId: userState.id }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, null)(MyListsNavigator);
