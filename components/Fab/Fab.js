import React from 'react';
import { Button, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';

const Fab = ({ onPress, iconName }) => {
  return (
    <Button
      onPress={onPress}
      colorScheme="primary"
      position="absolute"
      borderRadius="32"
      h="16"
      w="16"
      bottom="4"
      right="4"
      zIndex="99"
    >
      <Icon as={<Feather name={iconName} />} size="sm" color="white" />
    </Button>
  );
};

export default Fab;
