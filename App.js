import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import theme from './utils/theme';
import View from './View';
import WebView from './screens/WebView/WebView';

import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={View}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="WebView"
                component={WebView}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </ApolloProvider>
  );
}
