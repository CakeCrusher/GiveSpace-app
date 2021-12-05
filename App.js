import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { store } from './redux/store';
import { Provider, useSelector } from 'react-redux';

import { Home, Login, Friends } from './screens';

const Stack = createNativeStackNavigator();

const newColorTheme = {
  brand: {
    900: '#db2777',
    800: '#f9a8d4',
    700: '#fdf2f8',
  },
};
const theme = extendTheme({ colors: newColorTheme });

const View = () => {
  const selectedData = useSelector((store) => store.user);
  console.log(selectedData);
  useEffect(() => {}, [selectedData]);
  if (selectedData.user) {
    return (
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
    );
  }

  return <Login />;
};

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <View />
      </NativeBaseProvider>
    </Provider>
  );
}
