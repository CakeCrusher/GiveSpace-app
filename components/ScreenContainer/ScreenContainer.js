import React from 'react';
import { VStack } from 'native-base';
import Flare from '../Flare/Flare';

const ScreenContainer = (props) => {
  return (
    <VStack px="4" flex="1" justifyContent="space-between" {...props} safeArea>
      <Flare />
      <VStack mt="6" />
      {props.children}
    </VStack>
  );
};

export default ScreenContainer;
