import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const newColorTheme = {
  brand: {
    900: '#db2777',
    800: '#f9a8d4',
    700: '#fdf2f8',
  },
};

const theme = extendTheme({ colors: newColorTheme });

const MockProviders = ({ children }) => (
  <Provider store={store}>
    <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
  </Provider>
);

export default MockProviders;
