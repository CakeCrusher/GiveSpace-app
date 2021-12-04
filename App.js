import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import { Home, Friends } from './screens';

const Stack = createNativeStackNavigator();

const newColorTheme = {
  brand: {
    900: '#db2777',
    800: '#f9a8d4',
    700: '#fdf2f8',
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Friends"
              component={Friends}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
