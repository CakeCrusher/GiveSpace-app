import React from 'react';
import { Center, Icon, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';

const TabIcon = ({ focused, iconName, title }) => {
  if (focused) {
    return (
      <Center flex="1" borderTopWidth="2" borderColor="primary.500">
        <Icon as={<Feather name={iconName} />} color="primary.500" size="6" />
        <Text fontSize="2xs" color="primary.500">
          {title}
        </Text>
      </Center>
    );
  } else {
    return (
      <Center flex="1">
        <Icon as={<Feather name={iconName} />} size="6" />
        <Text fontSize="2xs">{title}</Text>
      </Center>
    );
  }
};

export default TabIcon;
