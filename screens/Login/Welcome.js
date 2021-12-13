import React, { useState, useCallback } from 'react';
import {
  Text,
  Heading,
  Button,
  Link,
  Input,
  Center,
  Flex,
  HStack,
  VStack,
} from 'native-base';
import Flare from '../../components/Flare';

const Welcome = ({ username }) => {

  return (
    <Center flex="1" safeArea>
      <Flare/>
      <VStack>
        <Heading mb={4} size="3xl" color="#c9042c" textAlign="center">
          Welcome 
        </Heading>
        <Heading mb={4} size="3xl" textAlign="center">
            {username} 
          </Heading>
      </VStack>
    </Center>
  );
};

export default Welcome;