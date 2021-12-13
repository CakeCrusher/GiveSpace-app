import React from 'react';
import { Button, Icon, View } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Flare1, Flare2 } from '../resources';

const Flare = () => {
  // procude a random number between 0 and 1
  const random = Math.random();
  // if random number is less than 0.5, then flare is on

  if (random < 0.9) {
    return (
      <View
        colorScheme="primary"
        position="absolute"
        borderRadius="32"
        // h="100"
        // w="200"
        top="-25"
        zIndex="-10"
        left="-25"
        zIndex="99"
      >
        <Flare1/>
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
        <Flare2/>
      </View>
    );
  }

};

export default Flare;
