import React from 'react';
import { Heading, Center, VStack } from 'native-base';
import { Flare } from '../../components';

const Welcome = ({ username }) => {
  return (
    <Center flex="1" safeArea>
      <Flare />
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
