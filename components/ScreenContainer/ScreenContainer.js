import React from 'react';
import Constants from 'expo-constants';
import { VStack, View } from 'native-base';
import Flare from '../Flare/Flare';

const ScreenContainer = (props) => {
  return (
    <View flex="1">
      <View h={Constants.statusBarHeight} bg="#FFFFFF" zIndex="99" />
      <VStack
        px="8"
        flex="1"
        justifyContent="space-between"
        {...props}
        safeArea
      >
        <Flare />
        {props.children}
      </VStack>
    </View>
  );
};

export default ScreenContainer;
