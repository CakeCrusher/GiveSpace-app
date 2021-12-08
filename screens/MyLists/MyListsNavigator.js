import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllLists, List } from '../';

const Stack = createNativeStackNavigator();

const MyListsNavigator = ({ navigation, user }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyListsScreen"
        component={AllLists}
        initialParams={{ tabName: 'My Lists', userId: user.id }}
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
  user: state.user,
});

export default connect(mapStateToProps, null)(MyListsNavigator);
