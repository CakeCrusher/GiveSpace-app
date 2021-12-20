import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { store } from './redux/store';
import { Provider } from 'react-redux';
//import theme from './utils/theme';
import View from './View';
import WebView from './screens/WebView/WebView';

import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';

import { extendTheme } from 'native-base';
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_200ExtraLight_Italic,
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
  SourceSansPro_900Black,
  SourceSansPro_900Black_Italic,
} from '@expo-google-fonts/source-sans-pro';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_200ExtraLight_Italic,
    SourceSansPro_300Light,
    SourceSansPro_300Light_Italic,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
    SourceSansPro_600SemiBold,
    SourceSansPro_600SemiBold_Italic,
    SourceSansPro_700Bold,
    SourceSansPro_700Bold_Italic,
    SourceSansPro_900Black,
    SourceSansPro_900Black_Italic,
  });

  if (!fontsLoaded) {
    console.log(fontsLoaded);
    return <></>;
  }
  console.log(fontsLoaded);

  const theme = extendTheme({
    colors: {
      primary: {
        50: '#e75472',
        100: '#e54364',
        200: '#e23054',
        300: '#df1b43',
        400: '#dc0430',
        500: '#c9042c',
        600: '#b40427',
        700: '#a40423',
        800: '#950420',
        900: '#87041d',
      },
      secondary: {
        50: '#f2aabb',
        100: '#e592a2',
        200: '#e28799',
        300: '#df7b8f',
        400: '#dc6e84',
        500: '#d95f78',
        600: '#c5566d',
        700: '#b34e63',
        800: '#a3475a',
        900: '#944152',
      },
    },
    fontConfig: {},
    sizes: {
      22: 88,
      42: 168,
      44: 176,
      50: 202,
      52: 214,
      18: 72,
    },
    fontConfig: {
      SansSource: {
        200: {
          normal: 'SourceSansPro_200ExtraLight',
          italic: 'SourceSansPro_200ExtraLight_Italic',
        },
        300: {
          normal: 'SourceSansPro_300Light',
          italic: 'SourceSansPro_300Light_Italic',
        },
        400: {
          normal: 'SourceSansPro_400Regular',
          italic: 'SourceSansPro_400Regular_Italic',
        },
        600: {
          normal: 'SourceSansPro_600SemiBold',
          italic: 'SourceSansPro_600SemiBold_Italic',
        },
        700: {
          normal: 'SourceSansPro_700Bold',
          italic: 'SourceSansPro_700Bold_Italic',
        },
        900: {
          normal: 'SourceSansPro_900Black',
          italic: 'SourceSansPro_900Black_Italic',
        },
      },
    },
    fonts: {
      heading: 'SansSource',
      body: 'SansSource',
      mono: 'SansSource',
    },
    components: {
      Button: {
        baseStyle: {
          _stack: { m: -1 },
          rounded: 'full',
        },
        variants: {
          outline: {
            borderWidth: '3',
          },
        },
        defaultProps: {
          colorScheme: 'secondary',
        },
      },
      Input: {
        baseStyle: {
          _focus: { borderColor: '#0F0' },
          bg: '#FFFFFF',
          color: '#3a3a3a',
          flex: 1,
          maxH: 16,
        },
      },
      Text: {
        baseStyle: {
          color: '#3a3a3a',
        },
      },
    },
  });
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
