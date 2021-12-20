import React from 'react';
import Constants from 'expo-constants';
import { View } from 'native-base';
import { Flare1, Flare2 } from '../../resources';

const Flare = () => {
  if (true) {
    return (
      <View
        opacity={0.8}
        colorScheme="primary"
        position="absolute"
        borderRadius="32"
        // h="100"
        // w="200"
        top={-1 * Constants.statusBarHeight}
        zIndex="98"
        left="-15"
      >
        <Flare1 />
      </View>
    );
  } else {
    return (
      <View
        colorScheme="primary"
        position="absolute"
        borderRadius="32"
        // h="100"
        // w="200"
        top="0"
        left="0"
        zIndex="99"
      >
        <Flare2 />
      </View>
    );
  }
};

export default Flare;
