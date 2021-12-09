import React from 'react';

import { NativeBaseProvider, extendTheme } from 'native-base';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import theme from './utils/theme';
import View from './View';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <View />
      </NativeBaseProvider>
    </Provider>
  );
}
