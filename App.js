import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider, extendTheme } from 'native-base';

import { store } from './redux/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { signin } from './redux/actions/user';

import { Home, Login, Friends, MyLists, Account } from './screens';

const Tab = createBottomTabNavigator();

const newColorTheme = {
  brand: {
    900: '#db2777',
    800: '#f9a8d4',
    700: '#fdf2f8',
  },
};
const theme = extendTheme({ colors: newColorTheme });

const View = () => {
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    // Async works, just need to figure out how exactly we want to handle that

    // Should replace this with some kind of AsyncStorage thing
    if (!user) {
      dispatch(
        signin({
          username: 'Krabs',
          password: 'secret',
        }),
      );
    }
    //const fetchToken = async () => {
    //  try {
    //    //const token = await AsyncStorage.getItem('AuthToken');
    //    console.log(token);
    //  } catch (err) {
    //    console.warn(err);
    //  }
    //};
    //fetchToken();
  }, []);

  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Friends" component={Friends} />
          <Tab.Screen
            name="My Lists"
            component={MyLists}
            options={{ headerShown: false }}
            initialParams={{ userId: user.id }}
          />
        </Tab.Navigator>
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
