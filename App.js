import React from 'react';

import { NativeBaseProvider, extendTheme } from 'native-base';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import View from './View';


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
        <View />
      </NativeBaseProvider>
    </Provider>
  );
}
